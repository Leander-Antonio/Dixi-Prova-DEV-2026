package com.dixi.dixibackend.service;

import com.dixi.dixibackend.dto.CriarPontoRequest;
import com.dixi.dixibackend.dto.HistoricoPontoResponse;
import com.dixi.dixibackend.model.Ponto;
import com.dixi.dixibackend.repository.PontoRepository;
import org.springframework.stereotype.Service;
import com.dixi.dixibackend.dto.HistoricoPontoSimplesResponse;

import java.time.*;
import java.time.format.DateTimeFormatter;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class PontoService {

    // acesso ao banco
    private final PontoRepository repository;

    public PontoService(PontoRepository repository) {
        this.repository = repository;
    }

    // Registra um novo ponto no banco
    public Ponto registrarPonto(CriarPontoRequest request) {
        Ponto ponto = new Ponto();

        // Converte a data/hora para LocalDateTime
        ponto.setMomento(LocalDateTime.parse(request.momento));

        // Salva a foto
        ponto.setFotoBase(request.fotoBase);

        // Persiste o ponto no banco
        return repository.save(ponto);
    }

    // histórico com cálculo de horas trabalhadas
    public List<HistoricoPontoResponse> buscarHistorico(
            LocalDate inicio,
            LocalDate fim
    ) {
        // intervalo completo do dia
        LocalDateTime dataInicio = inicio.atStartOfDay();
        LocalDateTime dataFim = fim.atTime(LocalTime.MAX);

        // Busca todos os pontos do período ordenados por horário
        List<Ponto> pontos = repository
                .findByMomentoBetweenOrderByMomentoAsc(dataInicio, dataFim);

        // Agrupa os pontos por dia
        Map<LocalDate, List<Ponto>> agrupadoPorDia =
                pontos.stream().collect(
                        Collectors.groupingBy(
                                p -> p.getMomento().toLocalDate(),
                                LinkedHashMap::new,
                                Collectors.toList()
                        )
                );

        // Formato (HH:mm)
        DateTimeFormatter formatoHora =
                DateTimeFormatter.ofPattern("HH:mm");

        List<HistoricoPontoResponse> resposta = new ArrayList<>();

        // Percorre cada dia do histórico
        for (var entrada : agrupadoPorDia.entrySet()) {
            List<Ponto> lista = entrada.getValue();

            // Lista horários das marcações
            List<String> marcacoes = lista.stream()
                    .map(p -> p.getMomento()
                            .toLocalTime()
                            .format(formatoHora))
                    .toList();

            long minutos = 0;

            // Calcula as horas trabalhadas
            for (int i = 0; i + 1 < lista.size(); i += 2) {
                minutos += Duration.between(
                        lista.get(i).getMomento(),
                        lista.get(i + 1).getMomento()
                ).toMinutes();
            }

            // Monta o retorno do dia
            resposta.add(new HistoricoPontoResponse(
                    entrada.getKey().toString(),
                    marcacoes,
                    formatarMinutos(minutos)
            ));
        }

        return resposta;
    }

    // histórico sem calcular as horas trabalhadas
    public List<HistoricoPontoSimplesResponse> buscarHistoricoSimples(
            LocalDate inicio,
            LocalDate fim
    ) {
        // Define o intervalo completo do período
        LocalDateTime dataInicio = inicio.atStartOfDay();
        LocalDateTime dataFim = fim.atTime(LocalTime.MAX);

        // Busca os pontos ordenados por horário
        List<Ponto> pontos = repository
                .findByMomentoBetweenOrderByMomentoAsc(dataInicio, dataFim);

        // Agrupa os pontos por dia
        Map<LocalDate, List<Ponto>> agrupadoPorDia =
                pontos.stream().collect(
                        Collectors.groupingBy(
                                p -> p.getMomento().toLocalDate(),
                                LinkedHashMap::new,
                                Collectors.toList()
                        )
                );

        DateTimeFormatter formatoHora =
                DateTimeFormatter.ofPattern("HH:mm");

        List<HistoricoPontoSimplesResponse> resposta = new ArrayList<>();

        // Percorre cada dia e retorna as marcações
        for (var entrada : agrupadoPorDia.entrySet()) {
            List<String> marcacoes = entrada.getValue().stream()
                    .map(p -> p.getMomento()
                            .toLocalTime()
                            .format(formatoHora))
                    .toList();

            resposta.add(
                    new HistoricoPontoSimplesResponse(
                            entrada.getKey().toString(),
                            marcacoes
                    )
            );
        }

        return resposta;
    }

    // Converte os minutos
    private String formatarMinutos(long minutos) {
        return (minutos / 60) + "h " + (minutos % 60) + "m";
    }
}
