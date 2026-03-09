package com.cobranzasapi.saas.DTO;

import lombok.Data;

@Data
public class UsuarioDTOResponse {

    private Long id;
    private String nombre;
    private String email;
    private String rol;
    
    // Información del tenant (opcional, según necesites)
    private Long tenantId;
    private String tenantNombre;
    private String tenantSubdominio;
    
    
}