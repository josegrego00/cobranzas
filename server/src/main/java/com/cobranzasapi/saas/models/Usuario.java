package com.cobranzasapi.saas.models;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/*
 * NOTA JOSE:
 *
 * Este modelo lo usarás cuando implementes el login.
 * Cada usuario pertenece a un Tenant (empresa).
 *
 * El tenantId lo genera EmpresaService cuando el superadmin
 * crea una empresa nueva desde el formulario.
 * O sea: primero se crea el Tenant, luego se crea el Usuario con ese id.
 *
 * ⚠️ OJO: hay un bug en tenantId —
 * Si usas @ManyToOne el tipo debe ser Tenant (no Long):
 *
 *    @ManyToOne
 *    @JoinColumn(name = "tenant_id")
 *    private Tenant tenant;   ← correcto
 *
 * O si prefieres guardar solo el id, quita @ManyToOne:
 *
 *    @Column(nullable = false)
 *    private Long tenantId;   ← también correcto
 *
 * Como está ahora mezclado, JPA no va a compilar bien.
 *
 * ──────────────────────────────────────────────
 * ¿POR QUÉ LO CAMBIAMOS?
 * ──────────────────────────────────────────────
 * Escogimos la opción de guardar solo el id (Long tenantId)
 * porque el servidor no arrancaba con este error:
 *
 *   "Property tenantId is a @ManyToOne association
 *    and may not use @Column"
 *
 * JPA no permite mezclar @Column + @ManyToOne en el mismo campo.
 * Como por ahora solo necesitamos guardar el id del tenant
 * y no navegar la relación completa, quitamos @ManyToOne y @JoinColumn.
 * Cuando implementes el login puedes cambiarlo a Tenant si lo necesitas.
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
public class Usuario {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String nombre;

    @Column(nullable = false)
    private String email;

    @Column(nullable = false)
    private String password;

    @Column(nullable = false)
    private String rol;

    @Column(nullable = false, name = "tenant_id")
    private Long tenantId;

}