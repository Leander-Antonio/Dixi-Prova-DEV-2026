package com.dixi.dixibackend.service;

import com.dixi.dixibackend.dto.*;
import com.dixi.dixibackend.model.Desconsideracao;
import com.dixi.dixibackend.model.Ponto;
import com.dixi.dixibackend.repository.DesconsideracaoRepository;
import com.dixi.dixibackend.repository.PontoRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.*;
import java.time.format.DateTimeFormatter;
import java.time.temporal.ChronoUnit;
import java.util.*;
import java.util.stream.Collectors;

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

        // salva primeiro para ter ID
        Ponto salvo = repository.save(ponto);

        LocalDateTime inicioMinuto = momento.truncatedTo(ChronoUnit.MINUTES);
        LocalDateTime fimMinuto = inicioMinuto.plusMinutes(1).minusNanos(1);

        // verifica se já existe OUTRA marcação válida no mesmo minuto
        boolean jaExisteOutraValidaNoMesmoMinuto =
                repository.existsByDesconsideradaIsFalseAndMomentoBetweenAndIdNot(
                        inicioMinuto, fimMinuto, salvo.getId()
                );

        if (jaExisteOutraValidaNoMesmoMinuto) {
            Desconsideracao d = new Desconsideracao();
            d.setPonto(salvo);
            d.setMotivo("MARCACAO_DUPLICADA");
            desconsideracaoRepository.save(d);

            salvo.setDesconsiderada(true);
            salvo = repository.save(salvo);
        }

        return salvo;
    }

    // HISTÓRICO SIMPLES (somente válidas)
    public List<HistoricoMarcacoesResponse> buscarHistoricoSimples(LocalDate inicio, LocalDate fim) {
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

        List<HistoricoMarcacoesResponse> resposta = new ArrayList<>();

        for (var entrada : agrupadoPorDia.entrySet()) {
            List<MarcacaoResponse> marcacoes = entrada.getValue().stream()
                    .map(p -> new MarcacaoResponse(
                            p.getId(),
                            p.getMomento(),
                            p.getLatitude(),
                            p.getLongitude(),
                            p.getFotoBase()
                    ))
                    .toList();

            resposta.add(new HistoricoMarcacoesResponse(
                    entrada.getKey().toString(),
                    marcacoes
            ));
        }

        return resposta;
    }

    // DESCONSIDERADAS (busca motivo no repository)
    public List<HistoricoDesconsideradasResponse> buscarDesconsideradas(LocalDate inicio, LocalDate fim) {
        LocalDateTime dataInicio = inicio.atStartOfDay();
        LocalDateTime dataFim = fim.atTime(LocalTime.MAX);

        // aqui troca o método removido
        List<Ponto> pontos = repository.findDesconsideradasComMotivo(dataInicio, dataFim);

        Map<LocalDate, List<Ponto>> agrupadoPorDia =
                pontos.stream().collect(Collectors.groupingBy(
                        p -> p.getMomento().toLocalDate(),
                        LinkedHashMap::new,
                        Collectors.toList()
                ));

        DateTimeFormatter formatoDataHora = DateTimeFormatter.ISO_LOCAL_DATE_TIME;
        List<HistoricoDesconsideradasResponse> resposta = new ArrayList<>();

        for (var entrada : agrupadoPorDia.entrySet()) {
            List<MarcacaoDesconsideradaResponse> marcacoes = entrada.getValue().stream()
                    .map(p -> {
                        String mot = (p.getDesconsideracao() != null)
                                ? p.getDesconsideracao().getMotivo()
                                : null;

                        return new MarcacaoDesconsideradaResponse(
                                p.getId(),
                                p.getMomento().format(formatoDataHora),
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

        // quebra vínculo para orphanRemoval funcionar bem
        Desconsideracao d = p.getDesconsideracao();
        if (d != null) {
            d.setPonto(null);
        }
        p.setDesconsideracao(null);

        p.setDesconsiderada(false);
        repository.save(p);
    }
}
