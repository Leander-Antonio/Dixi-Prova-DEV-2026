package com.dixi.dixibackend.dto;

import java.util.List;

public class HistoricoPontoSimplesResponse {
    public String data;
    public List<String> marcacoes;

    public HistoricoPontoSimplesResponse(String data, List<String> marcacoes) {
        this.data = data;
        this.marcacoes = marcacoes;
    }
}
