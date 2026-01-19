package com.dixi.dixibackend.dto;

import java.util.List;

public class HistoricoPontoSimplesResponse {
    public String data;
    public List<MarcacaoResponse> marcacoes;

    public HistoricoPontoSimplesResponse(String data, List<MarcacaoResponse> marcacoes) {
        this.data = data;
        this.marcacoes = marcacoes;
    }
}
