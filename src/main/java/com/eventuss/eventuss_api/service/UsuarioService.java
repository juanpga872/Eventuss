package com.eventuss.eventuss_api.service;

import com.eventuss.eventuss_api.model.Usuario;
import com.eventuss.eventuss_api.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UsuarioService {

    @Autowired
    private UsuarioRepository usuarioRepository;

    public Usuario guardarUsuario(Usuario usuario){
        return usuarioRepository.save(usuario);
    }

    public List<Usuario> obtenerUsuarios(){
        return usuarioRepository.findAll();
    }

    public Optional<Usuario> obtenerUsuarioPorId(Integer id){
        return usuarioRepository.findById(id);
    }

    public void eliminarUsuario(Integer id){
        usuarioRepository.deleteById(id);
    }
}