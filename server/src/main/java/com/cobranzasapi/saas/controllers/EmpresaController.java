package com.cobranzasapi.saas.controllers;

import com.cobranzasapi.saas.dto.TenantDTORequest;
import com.cobranzasapi.saas.models.Tenant;
import com.cobranzasapi.saas.services.TenantService;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/superadmin/empresas")
@RequiredArgsConstructor
public class EmpresaController {

    private final TenantService empresaService;

    @PostMapping
    public ResponseEntity<Tenant> crearEmpresa(@RequestBody TenantDTORequest request) {
        Tenant creado = empresaService.crearEmpresa(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(creado);
    }
}