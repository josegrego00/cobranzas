package com.cobranzasapi.saas.multitenant;
import org.springframework.stereotype.Service; 
import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

import com.cobranzasapi.saas.models.Tenant;
import com.cobranzasapi.saas.repo.TenantRepositorio;

@Service 
public class TenantResolverService {

    // esta clase se encarga de resolver el tenantId a partir del subdominio
    // aqui va la logica de negocio para validar el subdominio, buscar la empresa y
    // verificar su estado

    private final TenantRepositorio tenantRepositorio;

    public TenantResolverService(TenantRepositorio tenantRepositorio) {
        this.tenantRepositorio = tenantRepositorio;
    }

    public Long resolveTenantId(String subdominio) {

        if (subdominio == null || subdominio.isBlank()) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST, "Subdominio inválido");
        }

        Tenant tenant = tenantRepositorio
                .findBySubdominio(subdominio)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND,
                        "Tenant no encontrado"));

        if (!Boolean.TRUE.equals(tenant.getActivo())) {
            throw new ResponseStatusException(
                    HttpStatus.FORBIDDEN,
                    "Tenant inactivo");
        }

        return tenant.getId();
    }
}
