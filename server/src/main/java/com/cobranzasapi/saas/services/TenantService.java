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

import com.cobranzasapi.saas.dto.TenantDTORequest;
import com.cobranzasapi.saas.models.Tenant;
import com.cobranzasapi.saas.models.Usuario;
import com.cobranzasapi.saas.repo.TenantRepositorio;
import com.cobranzasapi.saas.repo.UsuarioRepositorio;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

@Service
@RequiredArgsConstructor
public class TenantService {

    private final TenantRepositorio tenantRepositorio;
    private final UsuarioRepositorio usuarioRepositorio;

    @Transactional
    public Tenant crearEmpresa(TenantDTORequest req) {

        // 1. Validar que el subdominio no exista ya
        if (tenantRepositorio.findBySubdominio(req.getSubdominio()).isPresent()) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "El subdominio ya está en uso");
        }

        // 2. Crear el Tenant
        Tenant tenant = Tenant.builder()
                .nombreTenant(req.getNombreEmpresa())
                .subdominio(req.getSubdominio().toLowerCase())
                .activo(true)
                .build();

        tenant = tenantRepositorio.save(tenant);

        // 3. Si marcó "Crear usuario administrador", crear uno por defecto
        if (req.isCrearUsuarioAdmin()) {
            Usuario admin = Usuario.builder()
                    .nombre("Admin " + req.getNombreEmpresa())
                    .email(req.getEmail())
                    .password("changeme123") // idealmente encriptar con BCrypt
                    .rol("ADMIN")
                    .tenant(tenant)
                    .build();

            usuarioRepositorio.save(admin);
        }

        // 4. Si marcó "Crear datos iniciales" puedes agregar lógica extra aquí
        if (req.isCrearDatosIniciales()) {
            // ej: crear clientes de prueba, configuraciones base, etc.
        }

        return tenant;
    }
}