package com.dixi.dixibackend.model;

import jakarta.persistence.*;

@Entity
@Table(name = "desconsideracao")
public class Desconsideracao {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    @JoinColumn(name = "ponto_id", nullable = false, unique = true)
    private Ponto ponto;

    @Column(nullable = false)
    private String motivo; // "DUPLICADA" ou "ADMIN"

    private String observacao;

    public Long getId() { return id; }

    public Ponto getPonto() { return ponto; }
    public void setPonto(Ponto ponto) { this.ponto = ponto; }

    public String getMotivo() { return motivo; }
    public void setMotivo(String motivo) { this.motivo = motivo; }

    public String getObservacao() { return observacao; }
    public void setObservacao(String observacao) { this.observacao = observacao; }
}
