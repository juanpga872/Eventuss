package com.eventuss.eventuss_api.service;

import com.eventuss.eventuss_api.model.Categoria;
import com.eventuss.eventuss_api.repository.CategoriaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CategoriaService {

    @Autowired
    private CategoriaRepository categoriaRepository;

    public Categoria guardarCategoria(Categoria categoria){
        return categoriaRepository.save(categoria);
    }

    public List<Categoria> obtenerCategorias(){
        return categoriaRepository.findAll();
    }

    public Optional<Categoria> obtenerCategoriaPorId(Integer id){
        return categoriaRepository.findById(id);
    }

    public void eliminarCategoria(Integer id){
        categoriaRepository.deleteById(id);
    }
}