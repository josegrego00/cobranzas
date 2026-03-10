package com.cobranzasapi.saas.exceptions;

import java.time.LocalDateTime;
import java.util.stream.Collectors;

import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.method.annotation.MethodArgumentTypeMismatchException;
import org.springframework.web.server.ResponseStatusException;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.ConstraintViolationException;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestControllerAdvice
public class ManejadorGlobalException {

    // Captura TODAS las excepciones de forma genérica
    @ExceptionHandler(Exception.class)
    public ResponseEntity<ErrorResponse> handleAllExceptions(Exception ex, HttpServletRequest request) {

        HttpStatus status = HttpStatus.INTERNAL_SERVER_ERROR;
        String errorType = "Internal Server Error";
        String message = "Ha ocurrido un error inesperado";
        if (ex instanceof ResponseStatusException) {
            ResponseStatusException rse = (ResponseStatusException) ex;
            status = HttpStatus.valueOf(rse.getStatusCode().value());
            errorType = "Business Error";
            message = rse.getReason() != null ? rse.getReason() : "Error de negocio";
        }
        // Clasificamos por tipo de excepción
        else if (ex instanceof MethodArgumentNotValidException) {
            status = HttpStatus.BAD_REQUEST;
            errorType = "Validation Error";
            MethodArgumentNotValidException e = (MethodArgumentNotValidException) ex;
            message = e.getBindingResult().getFieldErrors().stream()
                    .map(error -> error.getField() + ": " + error.getDefaultMessage())
                    .collect(Collectors.joining(", "));
        } else if (ex instanceof DataIntegrityViolationException) {
            status = HttpStatus.CONFLICT;
            errorType = "Data Error";
            message = "Ya existe un registro con esos datos";
        } else if (ex instanceof ConstraintViolationException) {
            status = HttpStatus.BAD_REQUEST;
            errorType = "Constraint Violation";
            message = "Error de validación en parámetros";
        } else if (ex instanceof MethodArgumentTypeMismatchException) {
            status = HttpStatus.BAD_REQUEST;
            errorType = "Type Mismatch";
            message = "Tipo de parámetro incorrecto";
        } else if (ex instanceof HttpMessageNotReadableException) {
            status = HttpStatus.BAD_REQUEST;
            errorType = "Bad Request";
            message = "Formato de petición incorrecto";
        }

        // 🔥 IMPORTANTE: Este bloque ahora solo aplica si NO es ResponseStatusException
        else if (message.equals("Ha ocurrido un error inesperado") && ex.getMessage() != null
                && !ex.getMessage().isEmpty()) {
            message = ex.getMessage();
        }
        ErrorResponse error = new ErrorResponse(
                LocalDateTime.now(),
                status.value(),
                errorType,
                message,
                request.getRequestURI());

        log.error("🔴 Error {}: {} - {}", status.value(), errorType, message, ex);

        return ResponseEntity.status(status).body(error);
    }
}
