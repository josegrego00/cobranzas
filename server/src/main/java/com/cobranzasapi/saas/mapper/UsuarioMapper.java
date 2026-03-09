package com.cobranzasapi.saas.mapper;

import com.cobranzasapi.saas.DTO.UsuarioDTORequest;
import com.cobranzasapi.saas.DTO.UsuarioDTOResponse;
import com.cobranzasapi.saas.models.Usuario;
import com.cobranzasapi.saas.models.Tenant;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

@Mapper(componentModel = "spring")
public interface UsuarioMapper {

    UsuarioMapper INSTANCE = Mappers.getMapper(UsuarioMapper.class);

    // Convertir Request + tenantId → Entidad (para crear)
    @Mapping(target = "id", ignore = true)
    @Mapping(target = "tenant", expression = "java(tenantIdToEntity(tenantId))")
    Usuario toEntity(UsuarioDTORequest request, Long tenantId);

    // Convertir Entidad → Response
    @Mapping(source = "tenant.id", target = "tenantId")
    @Mapping(source = "tenant.nombreTenant", target = "tenantNombre")
    @Mapping(source = "tenant.subdominio", target = "tenantSubdominio")
    UsuarioDTOResponse toResponse(Usuario usuario);

    // ⚠️ ESTE MÉTODO ES EL QUE FALTABA ⚠️
    default Tenant tenantIdToEntity(Long tenantId) {
        if (tenantId == null)
            return null;
        Tenant tenant = new Tenant();
        tenant.setId(tenantId);
        return tenant;
    }
}