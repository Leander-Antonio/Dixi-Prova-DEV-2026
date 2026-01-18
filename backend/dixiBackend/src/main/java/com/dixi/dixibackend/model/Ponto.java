package com.dixi.dixibackend.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
public class Ponto {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private LocalDateTime momento;

    @Lob
    @Column(columnDefinition = "LONGTEXT")
    private String fotoBase;

    public Long getId() { return id; }
    public LocalDateTime getMomento() { return momento; }
    public String getFotoBase() { return fotoBase; }

    public void setId(Long id) { this.id = id; }
    public void setMomento(LocalDateTime momento) { this.momento = momento; }
    public void setFotoBase(String fotoBase) { this.fotoBase = fotoBase; }
}
