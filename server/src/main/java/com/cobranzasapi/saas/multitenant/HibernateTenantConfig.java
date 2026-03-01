package com.cobranzasapi.saas.multitenant;

import java.util.Map;

import org.springframework.boot.autoconfigure.orm.jpa.HibernatePropertiesCustomizer;
import org.springframework.stereotype.Component;

@Component
public class HibernateTenantConfig implements HibernatePropertiesCustomizer {
    private final TenantIdentifierResolver tenantIdentifierResolver;

    public HibernateTenantConfig(TenantIdentifierResolver tenantIdentifierResolver) {
        this.tenantIdentifierResolver = tenantIdentifierResolver;
    }

    @Override
    public void customize(Map<String, Object> hibernateProperties) {

        hibernateProperties.put(
                "hibernate.tenant_identifier_resolver", // ← esto se toma de la documentacion de hibernate
                tenantIdentifierResolver);

        hibernateProperties.put(
                "hibernate.multi_tenancy", // ← aunque no está en MultiTenancySettings, Hibernate la reconoce
                "DISCRIMINATOR");
    }

}
