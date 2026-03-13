/**
 * Registro — TenantForm → TenantDTO
 * @param {import('../types/tenant.types').TenantForm} form
 * @returns {import('../types/tenant.types').TenantDTO}
 */
export const toTenantPayload = (form) => ({
  nombreTenant: form.nombreEmpresa,
  subdominio:   form.subdominio,
  email:        form.email,
  telefono:     form.telefono,
  planServicio: form.planServicio,
});

/**
 * Login — LoginForm → LoginDTO
 * @param {import('../types/tenant.types').LoginForm} form
 * @returns {import('../types/tenant.types').LoginDTO}
 */
export const toLoginPayload = (form) => ({
  email:      form.email,
  password:   form.password,
  subdominio: form.subdominio,
});