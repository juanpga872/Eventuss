package com.eventuss.eventuss_api.repository;

import com.eventuss.eventuss_api.model.Categoria;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CategoriaRepository extends JpaRepository<Categoria, Integer> {
}