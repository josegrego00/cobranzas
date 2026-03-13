/**
 * @typedef {Object} TenantDTO
 * @property {string} nombreTenant
 * @property {string} subdominio
 * @property {string} email
 * @property {string} telefono
 * @property {string} planServicio
 */

/**
 * @typedef {Object} TenantForm
 * @property {string} nombreEmpresa
 * @property {string} subdominio
 * @property {string} email
 * @property {string} telefono
 * @property {string} planServicio
 * @property {boolean} crearUsuarioAdmin
 * @property {boolean} crearDatosIniciales
 */

/**
 * @typedef {Object} LoginDTO
 * @property {string} email
 * @property {string} password
 * @property {string} subdominio
 */

/**
 * @typedef {Object} LoginForm
 * @property {string} email
 * @property {string} password
 * @property {string} subdominio
 */

/**
 * @typedef {Object} LoginResponseDTO
 * @property {string} token
 * @property {string} rol
 * @property {string} subdominio
 * @property {string} email
 */