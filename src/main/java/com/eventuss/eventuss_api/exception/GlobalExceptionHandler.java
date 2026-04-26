package com.eventuss.eventuss_api.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.dao.DataIntegrityViolationException;

import java.util.HashMap;
import java.util.Map;

@RestControllerAdvice
public class GlobalExceptionHandler {

    // 🔹 ERRORES DE BASE DE DATOS (EVENTOS)
    @ExceptionHandler(DataIntegrityViolationException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public Map<String, String> manejarErrorBD(DataIntegrityViolationException ex) {

        Map<String, String> respuesta = new HashMap<>();
        String mensajeError = ex.getMessage();

        if (mensajeError.contains("unique_evento")) {
            respuesta.put("mensaje", "Ya existe un evento en esa ubicación y fecha");
        } else {
            respuesta.put("mensaje", "Error de datos duplicados");
        }

        return respuesta;
    }

    // 🔹 ERRORES PERSONALIZADOS (USUARIOS)
    @ExceptionHandler(RuntimeException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public Map<String, String> manejarRuntime(RuntimeException ex) {

        Map<String, String> respuesta = new HashMap<>();
        respuesta.put("mensaje", ex.getMessage());

        return respuesta;
    }
}