package com.eventuss.eventuss_api.service;

import com.eventuss.eventuss_api.model.Rol;
import com.eventuss.eventuss_api.repository.RolRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class RolService {

    @Autowired
    private RolRepository rolRepository;

    public Rol guardarRol(Rol rol){
        return rolRepository.save(rol);
    }

    public List<Rol> obtenerRoles(){
        return rolRepository.findAll();
    }

    public Optional<Rol> obtenerRolPorId(Integer id){
        return rolRepository.findById(id);
    }

    public void eliminarRol(Integer id){
        rolRepository.deleteById(id);
    }
}