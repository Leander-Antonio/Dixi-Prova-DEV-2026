package com.dixi.dixibackend.dto;

import java.util.List;

public class HistoricoMarcacoesResponse {

    private String data;
    private List<MarcacaoResponse> marcacoes;

    public HistoricoMarcacoesResponse() {
    }

    public HistoricoMarcacoesResponse(String data, List<MarcacaoResponse> marcacoes) {
        this.data = data;
        this.marcacoes = marcacoes;
    }

    public String getData() {
        return data;
    }

    public void setData(String data) {
        this.data = data;
    }

    public List<MarcacaoResponse> getMarcacoes() {
        return marcacoes;
    }

    public void setMarcacoes(List<MarcacaoResponse> marcacoes) {
        this.marcacoes = marcacoes;
    }
}
