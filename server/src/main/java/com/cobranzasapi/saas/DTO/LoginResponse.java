package com.cobranzasapi.saas.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class LoginResponse {
    private String token;
    private String rol;
    private String subdominio;
    private String email;
}