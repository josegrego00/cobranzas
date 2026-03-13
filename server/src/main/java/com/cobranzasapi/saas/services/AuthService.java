package com.cobranzasapi.saas.services;

import com.cobranzasapi.saas.DTO.LoginRequest;
import com.cobranzasapi.saas.DTO.LoginResponse;
import com.cobranzasapi.saas.models.Usuario;
import com.cobranzasapi.saas.repo.UsuarioRepositorio;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UsuarioRepositorio usuarioRepositorio;
    private final PasswordEncoder passwordEncoder;

    public LoginResponse login(LoginRequest request) {

        // 1. Buscar usuario por email
        Usuario usuario = usuarioRepositorio.findByEmail(request.getEmail())
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.UNAUTHORIZED, "Credenciales inválidas"));

        // 2. Verificar que pertenece al subdominio correcto
        String subdominioTenant = usuario.getTenant().getSubdominio();
        if (!subdominioTenant.equals(request.getSubdominio())) {
            throw new ResponseStatusException(
                    HttpStatus.UNAUTHORIZED, "Credenciales inválidas");
        }

        // 3. Verificar contraseña
        if (!passwordEncoder.matches(request.getPassword(), usuario.getPassword())) {
            throw new ResponseStatusException(
                    HttpStatus.UNAUTHORIZED, "Credenciales inválidas");
        }

        return new LoginResponse(
                "token-provisional",
                usuario.getRol(),
                subdominioTenant,
                usuario.getEmail()
        );
    }
}