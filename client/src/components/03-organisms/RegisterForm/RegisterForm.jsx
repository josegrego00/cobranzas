import FormField from "../../02-molecules/FormField/FormField";
import Button from "../../01-atoms/Button/Button";
import styles from "./RegisterForm.module.scss";

const RegisterForm = ({
    values, onChange, onSubmit, loading,
    subdominioSugerido, subdominioExiste, subdominioChecking,
    subdominioConfirmado, onElegirSubdominio
}) => {
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

            {/* Input subdominio — readonly, refleja lo autogenerado */}
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

                {subdominioChecking && <p style={{ color: "gray",  fontSize: "12px", margin: "4px 0" }}>Verificando...</p>}
                {subdominioExiste === true  && <p style={{ color: "red",   fontSize: "12px", margin: "4px 0" }}>⚠️ Este subdominio ya está en uso</p>}
                {subdominioExiste === false && !subdominioConfirmado && (
                    <>
                        <p style={{ color: "green", fontSize: "12px", margin: "4px 0" }}>✅ Disponible</p>
                        <button onClick={onElegirSubdominio} style={{ marginTop: "6px", fontSize: "13px" }}>
                            Elegir este subdominio
                        </button>
                    </>
                )}
                {subdominioConfirmado && <p style={{ color: "green", fontSize: "12px", margin: "4px 0" }}>✅ Confirmado</p>}
            </div>

            <FormField
                label="Email de Contacto"
                type="email"
                placeholder="admin@acme.com"
                value={values.email}
                onChange={(e) => onChange("email", e.target.value)}
            />

            <FormField
                label="Teléfono"
                type="text"
                placeholder="3001234567"
                value={values.telefono}
                onChange={(e) => onChange("telefono", e.target.value)}
            />

            <Button
                buttonText={loading ? "Creando..." : "Crear Empresa"}
                onClick={onSubmit}
                disabled={!subdominioConfirmado || loading}
                full
            />
        </div>
    );
};

export default RegisterForm;