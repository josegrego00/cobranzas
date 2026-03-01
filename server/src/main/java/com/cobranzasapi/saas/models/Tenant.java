package com.cobranzasapi.saas.models;

import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToMany;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
public class Tenant {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nombreTenant;

    @Column(unique = true)
    private String subdominio;

    private Boolean activo;

    @Column(unique = true)
    private String email;

    private String telefono;

    private String planServicio;

    @OneToMany(mappedBy = "tenant")
    private List<Usuario> listaUsuarios = new ArrayList<>();

}
