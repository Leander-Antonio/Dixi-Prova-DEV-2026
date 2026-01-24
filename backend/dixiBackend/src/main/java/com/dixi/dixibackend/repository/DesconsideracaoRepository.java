package com.dixi.dixibackend.repository;

import com.dixi.dixibackend.model.Desconsideracao;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

public interface DesconsideracaoRepository extends JpaRepository<Desconsideracao, Long> {

    Optional<Desconsideracao> findByPontoId(Long pontoId);

    @Modifying
    @Transactional
    @Query("delete from Desconsideracao d where d.ponto.id = :pontoId")
    void deleteByPontoId(@Param("pontoId") Long pontoId);
}
