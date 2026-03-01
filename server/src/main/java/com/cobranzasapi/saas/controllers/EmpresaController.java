package com.cobranzasapi.saas.controllers;

import com.cobranzasapi.saas.DTO.TenantDTORequest;
import com.cobranzasapi.saas.models.Tenant;
import com.cobranzasapi.saas.services.TenantService;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/superadmin")
@RequiredArgsConstructor
public class EmpresaController {

    private final TenantService empresaService;

    @PostMapping("/crear-tenant")
    public ResponseEntity<Tenant> crearTenant(@RequestBody TenantDTORequest request) {
        Tenant creado = empresaService.crearTenant(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(creado);
    }

}