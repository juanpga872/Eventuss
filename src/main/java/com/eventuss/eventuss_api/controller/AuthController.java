package com.eventuss.eventuss_api.controller;

import com.eventuss.eventuss_api.model.Usuario;
import com.eventuss.eventuss_api.model.Rol;
import com.eventuss.eventuss_api.repository.UsuarioRepository;
import com.eventuss.eventuss_api.repository.RolRepository;
import com.eventuss.eventuss_api.security.JwtUtil;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/auth")
public class AuthController {

    private final UsuarioRepository usuarioRepository;
    private final RolRepository rolRepository;
    private final JwtUtil jwtUtil;
    private final PasswordEncoder passwordEncoder;

    public AuthController(UsuarioRepository usuarioRepository,
                          RolRepository rolRepository,
                          JwtUtil jwtUtil,
                          PasswordEncoder passwordEncoder) {
        this.usuarioRepository = usuarioRepository;
        this.rolRepository = rolRepository;
        this.jwtUtil = jwtUtil;
        this.passwordEncoder = passwordEncoder;
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> body) {
        String email = body.get("email");
        String password = body.get("password");

        System.out.println("Intentando login con: " + email);

        Optional<Usuario> usuarioOpt = usuarioRepository.findByEmail(email);
        if (usuarioOpt.isEmpty()) {
            System.out.println("Usuario no encontrado");
            return ResponseEntity.status(401).body("Credenciales inválidas");
        }

        Usuario usuario = usuarioOpt.get();
        System.out.println("Usuario encontrado: " + usuario.getNombre());
        System.out.println("Password en BD: " + usuario.getPassword());
        System.out.println("Password ingresado: " + password);
        System.out.println("Matches: " + passwordEncoder.matches(password, usuario.getPassword()));

        if (!passwordEncoder.matches(password, usuario.getPassword())) {
            System.out.println("Contraseña incorrecta");
            return ResponseEntity.status(401).body("Credenciales inválidas");
        }

        String role = usuario.getRol().getNombre().toUpperCase();
        System.out.println("Rol: " + role);
        String token = jwtUtil.generateToken(email, role);

        return ResponseEntity.ok(Map.of(
                "token", token,
                "role", role,
                "nombre", usuario.getNombre(),
                "id", usuario.getIdUsuario()
        ));
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody Map<String, String> body) {
        String email = body.get("email");

        if (usuarioRepository.findByEmail(email).isPresent()) {
            return ResponseEntity.status(400).body("El email ya está registrado");
        }

        Rol rolUser = rolRepository.findByNombre("USER")
                .orElseThrow(() -> new RuntimeException("Rol USER no encontrado"));

        Usuario nuevo = new Usuario();
        nuevo.setNombre(body.get("nombre"));
        nuevo.setEmail(email);
        nuevo.setPassword(passwordEncoder.encode(body.get("password")));
        nuevo.setRol(rolUser);

        usuarioRepository.save(nuevo);
        return ResponseEntity.ok("Usuario registrado correctamente");
    }
}