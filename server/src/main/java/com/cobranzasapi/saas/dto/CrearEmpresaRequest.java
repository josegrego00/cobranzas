/*
"El DTO existe porque el formulario manda campos como telefono, plan, crearUsuarioAdmin 
que no son columnas de la base de datos. Si recibo directo el Tenant, esos datos no tienen donde guardarse."
 */

package com.cobranzasapi.saas.dto;

import lombok.Data;

@Data
public class CrearEmpresaRequest {
    private String nombreEmpresa;
    private String subdominio;
    private String emailContacto;
    private String telefono;
    private String plan;
    private boolean crearUsuarioAdmin;
    private boolean crearDatosIniciales;
}