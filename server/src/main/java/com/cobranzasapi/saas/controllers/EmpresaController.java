package com.cobranzasapi.saas.controllers;

import com.cobranzasapi.saas.DTO.TenantDTO;
import com.cobranzasapi.saas.DTO.UsuarioDTOResponse;
import com.cobranzasapi.saas.services.TenantService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/superadmin")
@RequiredArgsConstructor
public class EmpresaController {

    private final TenantService empresaService;

    @PostMapping("/crear-tenant")
    public ResponseEntity<TenantDTO> crearTenant(@RequestBody @Valid TenantDTO request) {
        TenantDTO creado = empresaService.crearTenant(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(creado);
    }

    @GetMapping("/empresa/usuarios")
    public ResponseEntity<List<UsuarioDTOResponse>> obtenerUsuariosPorEmpresa() {
        List<UsuarioDTOResponse> usuarios = empresaService.obtenerUsuariosPorEmpresa();
        return ResponseEntity.ok(usuarios);
    }

}