package com.cobranzasapi.saas.repo;


import com.cobranzasapi.saas.models.Usuario;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

public interface UsuarioRepositorio extends JpaRepository<Usuario, Long> {

    //Cuidado... 
    //todo los Filtros deben ser por id de empresa o de Tenant

    List<Usuario> findByTenantId(Long tenantId);
    
}