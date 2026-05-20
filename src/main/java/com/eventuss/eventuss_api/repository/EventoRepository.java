package com.eventuss.eventuss_api.repository;

import com.eventuss.eventuss_api.model.Evento;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EventoRepository extends JpaRepository<Evento, Integer> {
    boolean existsByNombreAndFecha(String nombre, String fecha);
    boolean existsByNombreAndFechaAndIdEventoNot(String nombre, String fecha, Integer idEvento);
}