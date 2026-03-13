/**
 * @typedef {Object} TenantDTO          ← contrato del backend al crear
 * @property {string} nombreTenant
 * @property {string} subdominio
 * @property {string} email
 * @property {string} telefono
 * @property {string} planServicio
 */

/**
 * @typedef {Object} TenantForm         ← estado interno RegisterPage
 * @property {string} nombreEmpresa
 * @property {string} subdominio
 * @property {string} email
 * @property {string} telefono
 * @property {string} planServicio
 * @property {boolean} crearUsuarioAdmin
 * @property {boolean} crearDatosIniciales
 */

/**
 * @typedef {Object} LoginDTO           ← contrato del backend al login
 * @property {string} email
 * @property {string} password
 */

/**
 * @typedef {Object} LoginForm          ← estado interno LoginPage
 * @property {string} email
 * @property {string} password
 */

/**
 * @typedef {Object} LoginResponseDTO   ← lo que devuelve el backend
 * @property {string} token
 * @property {string} rol
 * @property {string} subdominio
 */