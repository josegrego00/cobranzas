package com.cobranzasapi.saas.services;

import com.cobranzasapi.saas.DTO.TenantDTO;
import com.cobranzasapi.saas.DTO.UsuarioDTOResponse;
import com.cobranzasapi.saas.mapper.TenantMapper;
import com.cobranzasapi.saas.mapper.UsuarioMapper;
import com.cobranzasapi.saas.models.Tenant;
import com.cobranzasapi.saas.models.Usuario;
import com.cobranzasapi.saas.multitenant.TenantContext;
import com.cobranzasapi.saas.repo.TenantRepositorio;
import com.cobranzasapi.saas.repo.UsuarioRepositorio;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

@Slf4j
@Service
@RequiredArgsConstructor
public class TenantService {

    private final TenantRepositorio tenantRepositorio;
    private final UsuarioRepositorio usuarioRepositorio;
    private final PasswordEncoder passwordEncoder;
    private final TenantMapper tenantMapper;
    private final UsuarioMapper usuarioMapper;

    @Transactional
    public TenantDTO crearTenant(TenantDTO request) {

        // 1. Validar subdominio único
        validarSubdominioUnico(request.getSubdominio());

        // 2. Convertir DTO → Entidad y guardar
        Tenant tenant = tenantMapper.toEntity(request);
        tenant.setActivo(true); // Aseguramos que esté activo
        tenant = tenantRepositorio.save(tenant);

        // 3. Crear usuario administrador por defecto
        crearUsuarioAdminPorDefecto(request, tenant);

        // 4. Convertir Entidad → DTO y devolver
        return tenantMapper.toDTO(tenant);
    }

    private void validarSubdominioUnico(String subdominio) {
        if (tenantRepositorio.findBySubdominio(subdominio).isPresent()) {
            throw new ResponseStatusException(HttpStatus.CONFLICT,
                    "El subdominio ya está en uso");
        }
    }

    private void crearUsuarioAdminPorDefecto(TenantDTO request, Tenant tenant) {
        Usuario admin = Usuario.builder()
                .nombre("Administrador")
                .email(request.getEmail())
                .password(passwordEncoder.encode("admin123"))
                .rol("ADMIN_TENANT")
                .tenant(tenant)
                .build();

        usuarioRepositorio.save(admin);
    }

    @Transactional(readOnly = true)
    public List<UsuarioDTOResponse> obtenerUsuariosPorEmpresa() {

        // Obtener tenantId del contexto
        Long tenantId = TenantContext.getTenantId();
        System.out.println("📌 Tenant ID: " + tenantId);

        if (tenantId == null) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST,
                    "No se pudo identificar el tenant");
        }

        // Buscar usuarios y convertir a DTO
        List<Usuario> usuarios = usuarioRepositorio.findByTenantId(tenantId);

        return usuarios.stream()
                .map(usuarioMapper::toResponse)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public TenantDTO obtenerTenantPorId(Long id) {
        Tenant tenant = tenantRepositorio.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND,
                        "Tenant no encontrado"));
        return tenantMapper.toDTO(tenant);
    }

    @Transactional
    public TenantDTO actualizarTenant(Long id, TenantDTO request) {
        Tenant tenant = tenantRepositorio.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND,
                        "Tenant no encontrado"));

        // Actualizar campos permitidos
        if (request.getNombreTenant() != null) {
            tenant.setNombreTenant(request.getNombreTenant());
        }
        if (request.getTelefono() != null) {
            tenant.setTelefono(request.getTelefono());
        }
        if (request.getPlanServicio() != null) {
            tenant.setPlanServicio(request.getPlanServicio());
        }
        // No permitir actualizar email, subdominio por seguridad

        tenant = tenantRepositorio.save(tenant);
        return tenantMapper.toDTO(tenant);
    }

    @Transactional(readOnly = true)
    public List<TenantDTO> obtenerTenants() {
        List<Tenant> listaTenants = tenantRepositorio.findAll();
        return tenantMapper.toDTOList(listaTenants);
    }

    @Transactional
    public TenantDTO cambiarEstadoTenant(Long id, Boolean activo) {
        Tenant tenant = tenantRepositorio.findById(id)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND,
                        "Tenant no encontrado con ID: " + id));

        tenant.setActivo(activo);
        tenant = tenantRepositorio.save(tenant);

        log.info("Tenant {} {}: {}", tenant.getSubdominio(),
                activo ? "activado" : "desactivado", id);

        return tenantMapper.toDTO(tenant);
    }
}