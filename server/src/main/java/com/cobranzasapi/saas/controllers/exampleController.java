package com.cobranzasapi.saas.controllers;
/* 
ES SOLO EJEMPLO, SE  PUEDE BORRAR SI NO SE NECESITA


import com.cobranzasapi.saas.models.User;
import com.cobranzasapi.saas.services.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth") // Prefijo de la ruta (Como en routes/index.js)
@CrossOrigin(origins = "http://localhost:5173") // Permite que React se conecte
public class AuthController {

    @Autowired
    private AuthService authService;

    // POST http://localhost:8080/api/auth/register
    @PostMapping("/register")
    public ResponseEntity<?> registerHandler(@RequestBody User user) {
        try {
            User newUser = authService.registerUser(user);
            return new ResponseEntity<>(newUser, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>("Error al registrar: " + e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }
}
     */