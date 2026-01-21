package com.dixi.dixibackend.dto;

import java.util.List;

public class HistoricoDesconsideradasResponse {
    public String data;
    public List<MarcacaoDesconsideradaResponse> marcacoes;

    public HistoricoDesconsideradasResponse(String data, List<MarcacaoDesconsideradaResponse> marcacoes) {
        this.data = data;
        this.marcacoes = marcacoes;
    }
}
