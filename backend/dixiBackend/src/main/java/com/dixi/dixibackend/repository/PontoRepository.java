package com.dixi.dixibackend.repository;

import com.dixi.dixibackend.model.Ponto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.time.LocalDateTime;
import java.util.List;

public interface PontoRepository extends JpaRepository<Ponto, Long> {

    // JÁ EXISTENTE (histórico normal)
    List<Ponto> findByMomentoBetweenOrderByMomentoAsc(
            LocalDateTime inicio,
            LocalDateTime fim
    );

    // 1: verificar mesmo horário
    boolean existsByMomento(LocalDateTime momento);

    // mostrar desconsiderados
    List<Ponto> findByDesconsideradaIsTrueAndMomentoBetweenOrderByMomentoAsc(
            LocalDateTime inicio,
            LocalDateTime fim
    );
    // histórico SEM mostrar desconsideradas
    List<Ponto> findByDesconsideradaIsFalseAndMomentoBetweenOrderByMomentoAsc(
            LocalDateTime inicio,
            LocalDateTime fim
    );
    @Query("""
  select p from Ponto p
  left join fetch p.desconsideracao d
  where p.desconsiderada = true
    and p.momento between :inicio and :fim
  order by p.momento asc
""")
    List<Ponto> findDesconsideradasComMotivo(
            @Param("inicio") LocalDateTime inicio,
            @Param("fim") LocalDateTime fim
    );

}
