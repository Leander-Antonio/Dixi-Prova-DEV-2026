package com.dixi.dixibackend.service;

import com.dixi.dixibackend.dto.CriarPontoRequest;
import com.dixi.dixibackend.dto.HistoricoPontoResponse;
import com.dixi.dixibackend.dto.HistoricoPontoSimplesResponse;
import com.dixi.dixibackend.dto.MarcacaoResponse;
import com.dixi.dixibackend.model.Ponto;
import com.dixi.dixibackend.repository.PontoRepository;
import org.springframework.stereotype.Service;

import java.time.*;
import java.time.format.DateTimeFormatter;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class PontoService {

    private final PontoRepository repository;

    public PontoService(PontoRepository repository) {
        this.repository = repository;
    }

    // Registra um novo ponto
    public Ponto registrarPonto(CriarPontoRequest request) {
        Ponto ponto = new Ponto();

        ponto.setMomento(LocalDateTime.parse(request.momento));
        ponto.setFotoBase(request.fotoBase);

        // salva localização
        ponto.setLatitude(request.latitude);
        ponto.setLongitude(request.longitude);

        return repository.save(ponto);
    }

    // HISTÓRICO CALCULADO
    public List<HistoricoPontoResponse> buscarHistorico(LocalDate inicio, LocalDate fim) {
        LocalDateTime dataInicio = inicio.atStartOfDay();
        LocalDateTime dataFim = fim.atTime(LocalTime.MAX);

        List<Ponto> pontos = repository
                .findByMomentoBetweenOrderByMomentoAsc(dataInicio, dataFim);

        Map<LocalDate, List<Ponto>> agrupadoPorDia =
                pontos.stream().collect(
                        Collectors.groupingBy(
                                p -> p.getMomento().toLocalDate(),
                                LinkedHashMap::new,
                                Collectors.toList()
                        )
                );

        DateTimeFormatter formatoHora = DateTimeFormatter.ofPattern("HH:mm");
        List<HistoricoPontoResponse> resposta = new ArrayList<>();

        for (var entrada : agrupadoPorDia.entrySet()) {
            List<Ponto> lista = entrada.getValue();

            // horários
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
                .findByMomentoBetweenOrderByMomentoAsc(dataInicio, dataFim);

        Map<LocalDate, List<Ponto>> agrupadoPorDia =
                pontos.stream().collect(
                        Collectors.groupingBy(
                                p -> p.getMomento().toLocalDate(),
                                LinkedHashMap::new,
                                Collectors.toList()
                        )
                );

        DateTimeFormatter formatoHora = DateTimeFormatter.ofPattern("HH:mm");
        List<HistoricoPontoSimplesResponse> resposta = new ArrayList<>();

        for (var entrada : agrupadoPorDia.entrySet()) {
            List<Ponto> lista = entrada.getValue();

            List<MarcacaoResponse> marcacoes = lista.stream()
                    .map(p -> new MarcacaoResponse(
                            p.getMomento().toLocalTime().format(formatoHora),
                            p.getLatitude(),
                            p.getLongitude(),
                            p.getFotoBase() // se ficar pesado, troca por null
                    ))
                    .toList();

            resposta.add(new HistoricoPontoSimplesResponse(
                    entrada.getKey().toString(),
                    marcacoes
            ));
        }

        return resposta;
    }

    private String formatarMinutos(long minutos) {
        return (minutos / 60) + "h " + (minutos % 60) + "m";
    }
}
