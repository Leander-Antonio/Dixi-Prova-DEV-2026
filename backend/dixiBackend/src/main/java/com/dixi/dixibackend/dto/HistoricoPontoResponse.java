package com.dixi.dixibackend.dto;

import java.util.List;

public class HistoricoPontoResponse {

    public String data;
    public List<String> marcacoes;
    public String horasTrabalhadas;
    public String intervalo;

    public HistoricoPontoResponse(
            String data,
            List<String> marcacoes,
            String horasTrabalhadas,
            String intervalo
    ) {
        this.data = data;
        this.marcacoes = marcacoes;
        this.horasTrabalhadas = horasTrabalhadas;
        this.intervalo = intervalo;
    }
}
