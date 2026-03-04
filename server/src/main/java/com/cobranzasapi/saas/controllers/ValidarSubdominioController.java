package com.cobranzasapi.saas.controllers;

import com.cobranzasapi.saas.repo.TenantRepositorio;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/subdominios")
public class ValidarSubdominioController {

    @Autowired
    private TenantRepositorio tenantRepositorio;

    // Endpoint para validar si un subdominio ya existe
    // Ejemplo: GET http://localhost:8080/api/subdominios/validar?valor=miempresa
    @GetMapping("/validar")
    public ResponseEntity<Boolean> validarSubdominio(@RequestParam String valor) {
        boolean exists = tenantRepositorio.existsBySubdominio(valor);
        return ResponseEntity.ok(exists);
    }
}
