package com.cobranzasapi.saas.models;

import org.hibernate.annotations.TenantId;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
public class Usuario {

    // ⚠️⚠️⚠️ PENDIENTE DE REVISAR POR JOSE ⚠️⚠️⚠️
    //
    // ERROR EN CONSOLA AL ARRANCAR LA APP:
    // -----------------------------------------------------------------------
    // WARN: Error executing DDL via JDBC:
    // "alter table usuario add constraint FKa10giac3ef9545ra7eyhmn4q1
    //  foreign key (tenant_id) references tenant (id)"
    //
    // java.sql.SQLException:
    // Referencing column 'tenant_id' and referenced column 'id'
    // in foreign key constraint 'FKa10giac3ef9545ra7eyhmn4q1' are incompatible.
    // -----------------------------------------------------------------------
    //
    // CAUSA:
    //   - tenant.id        es BIGINT  (Long en Java)
    //   - usuario.tenant_id es VARCHAR (String en Java)  ← INCOMPATIBLES
    //   - @TenantId es para multi-tenancy avanzado de Hibernate, requiere
    //     configuración extra que no tenemos. Está en conflicto con @ManyToOne.
    //
    // FIX: Eliminar @TenantId y el campo String tenantId.
    // Dejar solo el @ManyToOne así:
    //
    //   @ManyToOne(fetch = FetchType.LAZY)
    //   @JoinColumn(name = "tenant_id", nullable = false)
    //   private Tenant tenant;
    //
    // IMPACTO ACTUAL: La app arranca igual porque el error es solo un WARN.
    // IMPACTO FUTURO: Cualquier intento de guardar un Usuario va a fallar en MySQL.
    // -----------------------------------------------------------------------

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
/*
    @TenantId
    @Column(name = "tenant_id", nullable = false, updatable = false)
    private String tenantId;
*/
    @ManyToOne
    @JoinColumn(name = "tenant_id", nullable = false)
    private Tenant tenant;  
}