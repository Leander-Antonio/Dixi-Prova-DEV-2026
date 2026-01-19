package com.dixi.dixibackend.dto;

import java.util.List;
import com.dixi.dixibackend.dto.MarcacaoResponse;

public class HistoricoPontoResponse {

    public String data;
    public List<String> marcacoes;
    public String horasTrabalhadas;

    public HistoricoPontoResponse(
            String data,
            List<String> marcacoes,
            String horasTrabalhadas
    ) {
        this.data = data;
        this.marcacoes = marcacoes;
        this.horasTrabalhadas = horasTrabalhadas;
    }
}
