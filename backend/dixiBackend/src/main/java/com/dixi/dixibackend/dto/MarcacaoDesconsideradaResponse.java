package com.dixi.dixibackend.dto;

public class MarcacaoDesconsideradaResponse {
    public Long id;
    public String momento;
    public String motivo;
    public Double latitude;
    public Double longitude;
    public String fotoBase;

    public MarcacaoDesconsideradaResponse(Long id, String momento, String motivo,
                                          Double latitude, Double longitude, String fotoBase) {
        this.id = id;
        this.momento = momento;
        this.motivo = motivo;
        this.latitude = latitude;
        this.longitude = longitude;
        this.fotoBase = fotoBase;
    }
}
