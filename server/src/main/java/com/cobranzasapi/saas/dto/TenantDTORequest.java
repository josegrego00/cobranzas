/*
"El DTO existe porque el formulario manda campos como telefono, plan, crearUsuarioAdmin 
que no son columnas de la base de datos. Si recibo directo el Tenant, esos datos no tienen donde guardarse."
 */

package com.cobranzasapi.saas.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class TenantDTORequest {

    
    private String nombreEmpresa;
    private String subdominio;
    private String email;
    private String telefono;
    private String planServicio;
    private boolean crearUsuarioAdmin;
    private boolean crearDatosIniciales;
}