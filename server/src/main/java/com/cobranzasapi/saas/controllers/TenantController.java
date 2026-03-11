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
public class TenantController {

    private final TenantService tenantService;

    @PostMapping("/crear-tenant")
    public ResponseEntity<TenantDTO> crearTenant(@RequestBody @Valid TenantDTO request) {
        TenantDTO creado = tenantService.crearTenant(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(creado);
    }

    @GetMapping("/tenant/usuarios")
    public ResponseEntity<List<UsuarioDTOResponse>> obtenerUsuariosPorEmpresa() {
        List<UsuarioDTOResponse> usuarios = tenantService.obtenerUsuariosPorEmpresa();
        return ResponseEntity.ok(usuarios);
    }

    @GetMapping("/listar-tenants")
    public ResponseEntity<List<TenantDTO>> obtenerTenants() {
        List<TenantDTO> tenants = tenantService.obtenerTenants();
        return ResponseEntity.ok(tenants);
    }

    @PutMapping("/cambiar-estado-tenant/{id}/estado")
    public ResponseEntity<TenantDTO> cambiarEstadoTenant(
            @PathVariable Long id,
            @RequestParam Boolean activo) {
        TenantDTO tenant = tenantService.cambiarEstadoTenant(id, activo);
        return ResponseEntity.ok(tenant);
    }

}