import FormField from "../../02-molecules/FormField/FormField";
import Button from "../../01-atoms/Button/Button";
import styles from "./RegisterForm.module.scss";

const RegisterForm = ({
    values, onChange, onSubmit, loading,
    errors,        // mensajes de Zod por campo — ahora viene como errors.properties desde el hook
    isFormValid,   // true cuando todos los campos pasan y el subdominio está confirmado
    subdominioSugerido, subdominioExiste, subdominioChecking,
    subdominioConfirmado, onElegirSubdominio
}) => {

    // cambiar a false para probar que los errores aparecen sin bloquear el botón
    // cambiar a true para el comportamiento real
    const deshabilitarBoton = false; // TODO: cambiar a true cuando se confirmen que los errores se ven bien

    return (
        <div className={styles.container}>
            <h2>Crear Nueva Empresa</h2>

            <FormField
                label="Nombre de la Empresa"
                type="text"
                placeholder="Acme S.A."
                value={values.nombreEmpresa}
                onChange={(e) => onChange("nombreEmpresa", e.target.value)}
            />
            {/* ANTES fallaba porque treeifyError devuelve { errors:[], properties:{ campo:{errors:[]} } }
                entonces errors?.nombreEmpresa era undefined — el campo no existe en la raíz sino en properties
                ANTES: errors?.nombreEmpresa → undefined, nunca mostraba nada
                ANTES: {errors?.nombreEmpresa && <span>{errors.nombreEmpresa._errors[0]}</span>}
                AHORA: el hook guarda solo errores.properties, entonces los campos llegan directo
                y se usa .errors[0] en vez de ._errors[0] porque treeifyError usa "errors" no "_errors" */}
            {errors?.nombreEmpresa && (
                <span style={{ color: "red", fontSize: "12px" }}>
                    {errors.nombreEmpresa.errors[0]}
                </span>
            )}

            {/* Subdominio — readonly, se genera desde el nombre de la empresa */}
            <div style={{ marginBottom: "16px" }}>
                <label style={{ display: "block", marginBottom: "6px", fontSize: "14px" }}>
                    Subdominio
                </label>
                <input
                    type="text"
                    value={subdominioSugerido}
                    readOnly
                    style={{
                        width: "100%",
                        padding: "10px",
                        opacity: 0.5,
                        cursor: "not-allowed",
                        background: "darkgray",
                        border: "1px solid #ccc",
                        borderRadius: "6px",
                        fontSize: "14px",
                    }}
                />
                <span style={{ fontSize: "12px", color: "#888" }}>
                    {subdominioSugerido && `${subdominioSugerido}.tuapp.com`}
                </span>

                {subdominioChecking && (
                    <p style={{ color: "gray", fontSize: "12px", margin: "4px 0" }}>
                        Verificando...
                    </p>
                )}
                {subdominioExiste === true && (
                    <p style={{ color: "red", fontSize: "12px", margin: "4px 0" }}>
                        ⚠️ Este subdominio ya está en uso
                    </p>
                )}
                {/* solo muestra el botón si está disponible y aún no fue confirmado */}
                {subdominioExiste === false && !subdominioConfirmado && (
                    <>
                        <p style={{ color: "green", fontSize: "12px", margin: "4px 0" }}>
                            ✅ Disponible
                        </p>
                        <button onClick={onElegirSubdominio} style={{ marginTop: "6px", fontSize: "13px" }}>
                            Elegir este subdominio
                        </button>
                    </>
                )}
                {subdominioConfirmado && (
                    <p style={{ color: "green", fontSize: "12px", margin: "4px 0" }}>
                        ✅ Confirmado
                    </p>
                )}
            </div>

            <FormField
                label="Email de Contacto"
                type="email"
                placeholder="admin@acme.com"
                value={values.email}
                onChange={(e) => onChange("email", e.target.value)}
            />
            {/* ANTES: {errors?.email && <span>{errors.email._errors[0]}</span>}
                mismo problema — email tampoco existía en la raíz de errors */}
            {errors?.email && (
                <span style={{ color: "red", fontSize: "12px" }}>
                    {errors.email.errors[0]}
                </span>
            )}

            <FormField
                label="Teléfono"
                type="text"
                placeholder="3001234567"
                value={values.telefono}
                onChange={(e) => onChange("telefono", e.target.value)}
            />
            {/* ANTES: {errors?.telefono && <span>{errors.telefono._errors[0]}</span>}
                mismo problema — telefono tampoco existía en la raíz de errors */}
            {errors?.telefono && (
                <span style={{ color: "red", fontSize: "12px" }}>
                    {errors.telefono.errors[0]}
                </span>
            )}

            {/* cuando deshabilitarBoton = true  → comportamiento real
                cuando deshabilitarBoton = false → solo deshabilita mientras carga */}
            <Button
                buttonText={loading ? "Creando..." : "Crear Empresa"}
                onClick={onSubmit}
                disabled={deshabilitarBoton ? (!isFormValid || loading) : loading}
                full
                style={{
                    opacity: isFormValid ? 1 : 0.5,
                }}
            />
        </div>
    );
};

export default RegisterForm;