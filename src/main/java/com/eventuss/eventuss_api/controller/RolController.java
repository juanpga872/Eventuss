package com.eventuss.eventuss_api.controller;

import com.eventuss.eventuss_api.model.Rol;
import com.eventuss.eventuss_api.service.RolService;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/roles")
public class RolController {

    private final RolService rolService;

    public RolController(RolService rolService) {
        this.rolService = rolService;
    }

    @GetMapping
    public List<Rol> listarRoles() {
        return rolService.obtenerRoles();
    }

    @GetMapping("/{id}")
    public Optional<Rol> obtenerRol(@PathVariable Integer id){
        return rolService.obtenerRolPorId(id);
    }

    @PostMapping
    public Rol crearRol(@RequestBody Rol rol) {
        return rolService.guardarRol(rol);
    }

    @PutMapping("/{id}")
    public Rol actualizarRol(@PathVariable Integer id, @RequestBody Rol rol){
        rol.setIdRol(id);
        return rolService.guardarRol(rol);
    }

    @DeleteMapping("/{id}")
    public void eliminarRol(@PathVariable Integer id){
        rolService.eliminarRol(id);
    }
}