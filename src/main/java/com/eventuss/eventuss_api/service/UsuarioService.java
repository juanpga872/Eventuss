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

    // 🔥 CREAR USUARIO (con validación de email)
    public Usuario guardarUsuario(Usuario usuario){

        boolean existe = usuarioRepository.existsByEmail(usuario.getEmail());

        if (existe) {
            throw new RuntimeException("El correo ya está registrado");
        }

        return usuarioRepository.save(usuario);
    }

    // 📋 LISTAR TODOS
    public List<Usuario> obtenerUsuarios(){
        return usuarioRepository.findAll();
    }

    // 🔍 BUSCAR POR ID
    public Optional<Usuario> obtenerUsuarioPorId(Integer id){
        return usuarioRepository.findById(id);
    }

    // ❌ ELIMINAR
    public void eliminarUsuario(Integer id){
        usuarioRepository.deleteById(id);
    }
}