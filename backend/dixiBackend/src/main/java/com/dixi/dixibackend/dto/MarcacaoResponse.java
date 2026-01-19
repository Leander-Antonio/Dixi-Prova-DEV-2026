package com.dixi.dixibackend.dto;

public class MarcacaoResponse {
    public String momento;
    public Double latitude;
    public Double longitude;
    public String fotoBase;

    public MarcacaoResponse(String momento, Double latitude, Double longitude, String fotoBase) {
        this.momento = momento;
        this.latitude = latitude;
        this.longitude = longitude;
        this.fotoBase = fotoBase;
    }
}
