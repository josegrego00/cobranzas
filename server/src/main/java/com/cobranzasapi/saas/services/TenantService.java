package com.cobranzasapi.saas.services;

/*
 * FLUJO COMPLETO:
 *
 * 1. El superadmin llena el formulario y hace POST /superadmin/empresas
 *
 * 2. Este servicio guarda el Tenant en la BD con su subdominio
 *    ejemplo: nombreTenant="Acme", subdominio="acme", activo=true
 *
 * 3. Cuando un usuario entre a acme.localhost/...
 *    → TenantFilter (de mi amigo) detecta el subdominio "acme"
 *    → TenantResolverService (de mi amigo) busca "acme" en la BD
 *    → Encuentra el Tenant que YO cree aqui
 *    → TenantContext guarda el tenantId para toda la peticion
 *
 * SIN este servicio, el filtro Jose siempre devolveria
 * 404 "Tenant no encontrado" porque no habria nada en la BD.
 *
 * CONCLUSION: Yo creo la empresa, mi amigo la usa automaticamente.
 */

import com.cobranzasapi.saas.DTO.TenantDTORequest;
import com.cobranzasapi.saas.models.Tenant;
import com.cobranzasapi.saas.models.Usuario;
import com.cobranzasapi.saas.repo.TenantRepositorio;
import com.cobranzasapi.saas.repo.UsuarioRepositorio;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

@Service
@RequiredArgsConstructor
public class TenantService {

    private final TenantRepositorio tenantRepositorio;
    private final UsuarioRepositorio usuarioRepositorio;
    private final PasswordEncoder passwordEncoder;

    @Transactional
    public Tenant crearTenant(TenantDTORequest request) {

        // 1. Validar subdominio único
        validarSubdominioUnico(request.getSubdominio());

        // 2. Crear y guardar tenant
        Tenant tenant = construirTenant(request);
        tenant = tenantRepositorio.save(tenant);

        // 3. Crear usuario administrador por defecto
        crearUsuarioAdminPorDefecto(request, tenant);

        return tenant;
    }

    private void validarSubdominioUnico(String subdominio) {
        if (tenantRepositorio.findBySubdominio(subdominio).isPresent()) {
            throw new ResponseStatusException(HttpStatus.CONFLICT,
                    "El subdominio ya está en uso");
        }
    }

    private Tenant construirTenant(TenantDTORequest request) {
        return Tenant.builder()
                .nombreTenant(request.getNombreEmpresa())
                .subdominio(request.getSubdominio().toLowerCase())
                .email(request.getEmail())
                .planServicio(request.getPlanServicio())
                .activo(true)
                .build();
    }

    private void crearUsuarioAdminPorDefecto(TenantDTORequest request, Tenant tenant) {
        Usuario admin = Usuario.builder()
                .nombre("Administrador")
                .email(request.getEmail())
                .password(passwordEncoder.encode("admin123"))
                .rol("ADMIN_TENANT")
                .tenant(tenant)
                .build();

        usuarioRepositorio.save(admin);
    }
}