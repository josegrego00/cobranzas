package com.cobranzasapi.saas.mapper;

import com.cobranzasapi.saas.DTO.TenantDTO;
import com.cobranzasapi.saas.models.Tenant;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

@Mapper(componentModel = "spring")
public interface TenantMapper {

    TenantMapper INSTANCE = Mappers.getMapper(TenantMapper.class);

    // Convertir Entidad → DTO
    TenantDTO toDTO(Tenant tenant);

    // Convertir DTO → Entidad
    @Mapping(target = "listaUsuarios", ignore = true) // Ignoramos la lista de usuarios
    Tenant toEntity(TenantDTO tenantDTO);
}