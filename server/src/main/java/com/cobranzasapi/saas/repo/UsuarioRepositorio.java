package com.cobranzasapi.saas.repo;

import com.cobranzasapi.saas.models.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UsuarioRepositorio extends JpaRepository<Usuario, Long> {
}