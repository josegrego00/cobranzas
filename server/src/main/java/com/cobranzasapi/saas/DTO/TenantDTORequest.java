/*
"El DTO existe porque el formulario manda campos como telefono, plan, crearUsuarioAdmin 
que no son columnas de la base de datos. Si recibo directo el Tenant, esos datos no tienen donde guardarse."
 */

package com.cobranzasapi.saas.DTO;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class TenantDTORequest {

    @NotBlank
    private String nombreEmpresa;
    @NotBlank
    private String subdominio;
    @Email
    private String email;
    private String telefono;
    @NotBlank
    private String planServicio;
    
    private boolean crearUsuarioAdmin;
    private boolean crearDatosIniciales;
}