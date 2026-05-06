package com.eventuss.eventuss_api.controller;

import com.eventuss.eventuss_api.model.Categoria;
import com.eventuss.eventuss_api.repository.CategoriaRepository;
import com.eventuss.eventuss_api.service.CategoriaService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:3001"})
@RestController
@RequestMapping("/categorias")
public class CategoriaController {

    private final CategoriaService categoriaService;
    private final CategoriaRepository categoriaRepository;

    public CategoriaController(CategoriaService categoriaService,
                               CategoriaRepository categoriaRepository) {
        this.categoriaService = categoriaService;
        this.categoriaRepository = categoriaRepository;
    }

    @GetMapping
    public List<Categoria> listarCategorias() {
        return categoriaService.obtenerCategorias();
    }

    @GetMapping("/{id}")
    public Optional<Categoria> obtenerCategoria(@PathVariable Integer id) {
        return categoriaService.obtenerCategoriaPorId(id);
    }

    @PostMapping
    public ResponseEntity<?> crearCategoria(@RequestBody Categoria categoria) {
        if (categoria.getNombre() == null || categoria.getNombre().isBlank()) {
            return ResponseEntity.status(400).body("El nombre es obligatorio");
        }
        boolean existe = categoriaRepository.existsByNombreIgnoreCase(categoria.getNombre());
        if (existe) {
            return ResponseEntity.status(409).body("Ya existe una categoría con ese nombre");
        }
        return ResponseEntity.ok(categoriaService.guardarCategoria(categoria));
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> actualizarCategoria(@PathVariable Integer id,
                                                 @RequestBody Categoria categoria) {
        if (categoria.getNombre() == null || categoria.getNombre().isBlank()) {
            return ResponseEntity.status(400).body("El nombre es obligatorio");
        }
        boolean existe = categoriaRepository.existsByNombreIgnoreCaseAndIdCategoriaIsNot(
                categoria.getNombre(), id);
        if (existe) {
            return ResponseEntity.status(409).body("Ya existe una categoría con ese nombre");
        }
        categoria.setIdCategoria(id);
        return ResponseEntity.ok(categoriaService.guardarCategoria(categoria));
    }

    @DeleteMapping("/{id}")
    public void eliminarCategoria(@PathVariable Integer id) {
        categoriaService.eliminarCategoria(id);
    }
}