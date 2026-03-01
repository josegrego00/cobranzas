package com.cobranzasapi.saas.repo;

import com.cobranzasapi.saas.models.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UsuarioRepositorio extends JpaRepository<Usuario, Long> {
    // aqui no hay q agregar nada aun porq ya por el @TenandId 
    // Hibernate hace un envoltura y toda peticion a la base de datos le coloca el where id=?
    // esto permite la multitenant por ende es mas seguro
}