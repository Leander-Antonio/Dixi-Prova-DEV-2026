package com.dixi.dixibackend.dto;

import java.time.LocalDateTime;

public class MarcacaoResponse {
    public Long id;
    public LocalDateTime momento;
    public Double latitude;
    public Double longitude;
    public String fotoBase;

    public MarcacaoResponse(Long id, LocalDateTime momento, Double latitude, Double longitude, String fotoBase) {
        this.id = id;
        this.momento = momento;
        this.latitude = latitude;
        this.longitude = longitude;
        this.fotoBase = fotoBase;
    }
}
