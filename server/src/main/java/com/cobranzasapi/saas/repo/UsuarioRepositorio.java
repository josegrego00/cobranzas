package com.cobranzasapi.saas.repo;

import com.cobranzasapi.saas.models.Usuario;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

public interface UsuarioRepositorio extends JpaRepository<Usuario, Long> {

    // Filtra usuarios por empresa — siempre usar tenantId
    List<Usuario> findByTenantId(Long tenantId);

    // Busca un usuario por email — usado en el login
    Optional<Usuario> findByEmail(String email);
}