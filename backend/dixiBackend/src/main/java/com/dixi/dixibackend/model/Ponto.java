package com.dixi.dixibackend.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "ponto")
public class Ponto {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Lob
    @Column(name = "foto_base", columnDefinition = "LONGTEXT")
    private String fotoBase;

    @Column(name = "momento", nullable = false)
    private LocalDateTime momento;

    @Column(name = "latitude")
    private Double latitude;

    @Column(name = "longitude")
    private Double longitude;

    // getters/setters
    public Long getId() { return id; }

    public String getFotoBase() { return fotoBase; }
    public void setFotoBase(String fotoBase) { this.fotoBase = fotoBase; }

    public LocalDateTime getMomento() { return momento; }
    public void setMomento(LocalDateTime momento) { this.momento = momento; }

    public Double getLatitude() { return latitude; }
    public void setLatitude(Double latitude) { this.latitude = latitude; }

    public Double getLongitude() { return longitude; }
    public void setLongitude(Double longitude) { this.longitude = longitude; }
}
