package com.dixi.dixibackend.service;

import com.dixi.dixibackend.dto.*;
import com.dixi.dixibackend.model.Desconsideracao;
import com.dixi.dixibackend.model.Ponto;
import com.dixi.dixibackend.repository.DesconsideracaoRepository;
import com.dixi.dixibackend.repository.PontoRepository;
import org.springframework.stereotype.Service;
import java.time.temporal.ChronoUnit;
import java.time.*;
import java.time.format.DateTimeFormatter;
import java.util.*;
import java.util.stream.Collectors;
import org.springframework.transaction.annotation.Transactional;

@Service
public class PontoService {

    private final PontoRepository repository;
    private final DesconsideracaoRepository desconsideracaoRepository;

    public PontoService(PontoRepository repository, DesconsideracaoRepository desconsideracaoRepository) {
        this.repository = repository;
        this.desconsideracaoRepository = desconsideracaoRepository;
    }

    // Registra um novo ponto
    public Ponto registrarPonto(CriarPontoRequest request) {
        Ponto ponto = new Ponto();

        LocalDateTime momento = LocalDateTime.parse(request.momento);
        ponto.setMomento(momento);
        ponto.setFotoBase(request.fotoBase);
        ponto.setLatitude(request.latitude);
        ponto.setLongitude(request.longitude);

        LocalDateTime inicioMinuto = momento.truncatedTo(ChronoUnit.MINUTES);
        LocalDateTime fimMinuto = inicioMinuto.plusMinutes(1).minusNanos(1);

        boolean jaExisteValidaNoMesmoMinuto =
                repository.existsByDesconsideradaIsFalseAndMomentoBetween(inicioMinuto, fimMinuto);

        Ponto salvo = repository.save(ponto);

        if (jaExisteValidaNoMesmoMinuto) {
            Desconsideracao d = new Desconsideracao();
            d.setPonto(salvo);
            d.setMotivo("MARCACAO_DUPLICADA");
            desconsideracaoRepository.save(d);

            salvo.setDesconsiderada(true);
            salvo = repository.save(salvo);
        }

        return salvo;
    }

    // HISTÓRICO CALCULADO
    public List<HistoricoPontoResponse> buscarHistorico(LocalDate inicio, LocalDate fim) {
        LocalDateTime dataInicio = inicio.atStartOfDay();
        LocalDateTime dataFim = fim.atTime(LocalTime.MAX);

        List<Ponto> pontos = repository
                .findByDesconsideradaIsFalseAndMomentoBetweenOrderByMomentoAsc(dataInicio, dataFim);

        Map<LocalDate, List<Ponto>> agrupadoPorDia =
                pontos.stream().collect(Collectors.groupingBy(
                        p -> p.getMomento().toLocalDate(),
                        LinkedHashMap::new,
                        Collectors.toList()
                ));

        DateTimeFormatter formatoHora = DateTimeFormatter.ofPattern("HH:mm");
        List<HistoricoPontoResponse> resposta = new ArrayList<>();

        for (var entrada : agrupadoPorDia.entrySet()) {
            List<Ponto> lista = entrada.getValue();

            List<String> marcacoes = lista.stream()
                    .map(p -> p.getMomento().toLocalTime().format(formatoHora))
                    .toList();

            long minutos = 0;
            for (int i = 0; i + 1 < lista.size(); i += 2) {
                minutos += Duration.between(
                        lista.get(i).getMomento(),
                        lista.get(i + 1).getMomento()
                ).toMinutes();
            }

            resposta.add(new HistoricoPontoResponse(
                    entrada.getKey().toString(),
                    marcacoes,
                    formatarMinutos(minutos)
            ));
        }

        return resposta;
    }

    // HISTÓRICO SIMPLES
    public List<HistoricoPontoSimplesResponse> buscarHistoricoSimples(LocalDate inicio, LocalDate fim) {
        LocalDateTime dataInicio = inicio.atStartOfDay();
        LocalDateTime dataFim = fim.atTime(LocalTime.MAX);

        List<Ponto> pontos = repository
                .findByDesconsideradaIsFalseAndMomentoBetweenOrderByMomentoAsc(dataInicio, dataFim);

        Map<LocalDate, List<Ponto>> agrupadoPorDia =
                pontos.stream().collect(Collectors.groupingBy(
                        p -> p.getMomento().toLocalDate(),
                        LinkedHashMap::new,
                        Collectors.toList()
                ));

        DateTimeFormatter formatoDataHora = DateTimeFormatter.ISO_LOCAL_DATE_TIME;
        List<HistoricoPontoSimplesResponse> resposta = new ArrayList<>();

        for (var entrada : agrupadoPorDia.entrySet()) {
            List<Ponto> lista = entrada.getValue();

            List<MarcacaoResponse> marcacoes = lista.stream()
                    .map(p -> new MarcacaoResponse(
                            p.getId(),
                            p.getMomento(),
                            p.getLatitude(),
                            p.getLongitude(),
                            p.getFotoBase()
                    ))
                    .toList();

            resposta.add(new HistoricoPontoSimplesResponse(
                    entrada.getKey().toString(),
                    marcacoes
            ));
        }

        return resposta;
    }


    // DESCONSIDERADAS  busca o motivo na tabela
    public List<HistoricoDesconsideradasResponse> buscarDesconsideradas(LocalDate inicio, LocalDate fim) {
        LocalDateTime dataInicio = inicio.atStartOfDay();
        LocalDateTime dataFim = fim.atTime(LocalTime.MAX);

        List<Ponto> pontos = repository
                .findByDesconsideradaIsTrueAndMomentoBetweenOrderByMomentoAsc(dataInicio, dataFim);

        Map<LocalDate, List<Ponto>> agrupadoPorDia =
                pontos.stream().collect(Collectors.groupingBy(
                        p -> p.getMomento().toLocalDate(),
                        LinkedHashMap::new,
                        Collectors.toList()
                ));

        DateTimeFormatter formatoDataHora = DateTimeFormatter.ISO_LOCAL_DATE_TIME;
        List<HistoricoDesconsideradasResponse> resposta = new ArrayList<>();

        for (var entrada : agrupadoPorDia.entrySet()) {
            List<Ponto> lista = entrada.getValue();

            List<MarcacaoDesconsideradaResponse> marcacoes = lista.stream()
                    .map(p -> {
                        String mot = desconsideracaoRepository.findByPontoId(p.getId())
                                .map(Desconsideracao::getMotivo)
                                .orElse(null);

                        return new MarcacaoDesconsideradaResponse(
                                p.getId(),
                                p.getMomento().format(formatoDataHora), // ISO completo
                                mot,
                                p.getLatitude(),
                                p.getLongitude(),
                                p.getFotoBase()
                        );
                    })
                    .toList();

            resposta.add(new HistoricoDesconsideradasResponse(
                    entrada.getKey().toString(),
                    marcacoes
            ));
        }

        return resposta;
    }


    // DESCONSIDERAR
    public void desconsiderar(Long id, String motivo) {
        Ponto p = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Ponto não encontrado: " + id));

        String motivoFinal = (motivo == null || motivo.isBlank()) ? "ADMIN" : motivo;

        Desconsideracao d = desconsideracaoRepository.findByPontoId(id)
                .orElseGet(Desconsideracao::new);

        d.setPonto(p);
        d.setMotivo(motivoFinal);
        desconsideracaoRepository.save(d);

        p.setDesconsiderada(true);
        repository.save(p);
    }

    // RECONSIDERAR
    @Transactional
    public void reconsiderar(Long id) {
        Ponto p = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Ponto não encontrado: " + id));

        LocalDateTime momento = p.getMomento();
        LocalDateTime inicioMinuto = momento.truncatedTo(ChronoUnit.MINUTES);
        LocalDateTime fimMinuto = inicioMinuto.plusMinutes(1).minusNanos(1);

        boolean existeOutraValidaNoMesmoMinuto =
                repository.existsByDesconsideradaIsFalseAndMomentoBetweenAndIdNot(
                        inicioMinuto, fimMinuto, id
                );

        if (existeOutraValidaNoMesmoMinuto) {
            throw new RuntimeException("Marcação já existente");
        }

        Desconsideracao d = p.getDesconsideracao();
        if (d != null) {
            p.setDesconsideracao(null);
            d.setPonto(null);
            desconsideracaoRepository.delete(d);
        } else {
            desconsideracaoRepository.findByPontoId(id).ifPresent(desconsideracaoRepository::delete);
        }

        p.setDesconsiderada(false);
        repository.save(p);
    }



    private String formatarMinutos(long minutos) {
        return (minutos / 60) + "h " + (minutos % 60) + "m";
    }
}
