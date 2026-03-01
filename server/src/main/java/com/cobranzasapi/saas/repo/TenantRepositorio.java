package com.cobranzasapi.saas.repo;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.cobranzasapi.saas.models.Tenant;

public interface TenantRepositorio extends JpaRepository<Tenant, Long> {

    // esta interfaz se encarga de acceder a la base de datos para obtener el tenant
    // a partir del subdominio

    Optional<Tenant> findBySubdominio(String subdominio);

}
