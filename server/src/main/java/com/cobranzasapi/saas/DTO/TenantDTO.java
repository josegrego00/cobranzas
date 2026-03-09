package com.cobranzasapi.saas.DTO;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class TenantDTO {

    private Long id;

    @NotBlank(message = "El nombre del tenant es obligatorio")
    private String nombreTenant;

    @NotBlank(message = "El subdominio es obligatorio")
    private String subdominio;

    private Boolean activo;

    @NotBlank(message = "El email es obligatorio")
    @Email(message = "Email inválido")
    private String email;

    private String telefono;

    private String planServicio;
}