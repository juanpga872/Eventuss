package com.eventuss.eventuss_api.repository;

import com.eventuss.eventuss_api.model.Inscripcion;
import org.springframework.data.jpa.repository.JpaRepository;

public interface InscripcionRepository extends JpaRepository<Inscripcion, Integer> {

    boolean existsByUsuario_IdUsuarioAndEvento_IdEvento(Integer idUsuario, Integer idEvento);

}