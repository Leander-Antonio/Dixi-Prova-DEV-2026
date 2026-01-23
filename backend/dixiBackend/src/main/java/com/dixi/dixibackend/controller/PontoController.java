package com.dixi.dixibackend.controller;

import com.dixi.dixibackend.dto.CriarPontoRequest;
import com.dixi.dixibackend.dto.HistoricoMarcacoesResponse;
import com.dixi.dixibackend.model.Ponto;
import com.dixi.dixibackend.service.PontoService;
import org.springframework.web.bind.annotation.*;
import com.dixi.dixibackend.dto.HistoricoDesconsideradasResponse;
import java.util.Map;

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
    public List<HistoricoMarcacoesResponse> historicoSimples(
            @RequestParam String inicio,
            @RequestParam String fim
    ) {
        return service.buscarHistoricoSimples(
                LocalDate.parse(inicio),
                LocalDate.parse(fim)
        );
    }

    // DESCONSIDERADAS PELO MINUTO
    @GetMapping("/desconsideradas")
    public List<HistoricoDesconsideradasResponse> desconsideradas(
            @RequestParam String inicio,
            @RequestParam String fim
    ) {
        return service.buscarDesconsideradas(
                LocalDate.parse(inicio),
                LocalDate.parse(fim)
        );
    }
    // DESCONSIDERAR MARCAÇÃO (ADMIN)
    @PostMapping("/{id}/desconsiderar")
    public void desconsiderar(
            @PathVariable Long id,
            @RequestBody(required = false) Map<String, String> body
    ) {
        String motivo = body != null ? body.get("motivo") : null; // "ADMIN"
        service.desconsiderar(id, motivo);
    }

    // RECONSIDERAR MARCAÇÃO
    @PostMapping("/{id}/reconsiderar")
    public void reconsiderar(@PathVariable Long id) {
        service.reconsiderar(id);
    }


}
