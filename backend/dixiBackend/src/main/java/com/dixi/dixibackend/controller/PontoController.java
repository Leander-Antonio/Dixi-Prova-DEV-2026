package com.dixi.dixibackend.controller;

import com.dixi.dixibackend.dto.CriarPontoRequest;
import com.dixi.dixibackend.dto.HistoricoPontoResponse;
import com.dixi.dixibackend.dto.HistoricoPontoSimplesResponse;
import com.dixi.dixibackend.model.Ponto;
import com.dixi.dixibackend.service.PontoService;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/pontos")
@CrossOrigin("*")
public class PontoController {

    private final PontoService service;

    public PontoController(PontoService service) {
        this.service = service;
    }

    @PostMapping
    public Ponto registrar(@RequestBody CriarPontoRequest request) {
        return service.registrarPonto(request);
    }

    // PESQUISAR
    @GetMapping("/historico")
    public List<HistoricoPontoSimplesResponse> historicoSimples(
            @RequestParam String inicio,
            @RequestParam String fim
    ) {
        return service.buscarHistoricoSimples(
                LocalDate.parse(inicio),
                LocalDate.parse(fim)
        );
    }

    // CALCULAR
    @GetMapping("/historico/calcular")
    public List<HistoricoPontoResponse> historicoCalculado(
            @RequestParam String inicio,
            @RequestParam String fim
    ) {
        return service.buscarHistorico(
                LocalDate.parse(inicio),
                LocalDate.parse(fim)
        );
    }
}
