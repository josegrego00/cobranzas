import FormField from "../../02-molecules/FormField/FormField";
import Button from "../../01-atoms/Button/Button";
import styles from "./RegisterForm.module.scss";

const RegisterForm = ({
    values, onChange, onSubmit, loading,
    errors,        // mensajes de Zod por campo — viene como errors.properties desde el hook
    isFormValid,   // true cuando todos los campos pasan y el subdominio está confirmado
    subdominioSugerido, subdominioExiste, subdominioChecking,
    subdominioConfirmado, onElegirSubdominio
}) => {

    // cambiar a false para probar que los errores aparecen sin bloquear el botón
    // cambiar a true para el comportamiento real
    const deshabilitarBoton = false; // TODO: cambiar a true cuando se confirmen que los errores se ven bien

    return (
        // layout split: panel izquierdo oscuro (hero/branding) + panel derecho blanco (form)
        // en mobile el panel izquierdo se oculta y el form ocupa toda la pantalla
        <div className={styles.wrapper}>

            {/* ── PANEL IZQUIERDO — hero / branding ── */}
            {/* este panel no tiene lógica, solo es visual y decorativo */}
            <div className={styles.hero}>
                <div className={styles.heroContent}>

                    {/* logo */}
                    <div className={styles.logo}>
                        <span className={styles.logoIcon}>◈</span>
                        <span className={styles.logoText}>CobroSaaS</span>
                    </div>

                    {/* tagline principal con acento de color */}
                    <div className={styles.tagline}>
                        <h1 className={styles.taglineTitle}>
                            Gestiona tus cobranzas
                            <span className={styles.taglineAccent}> con poder.</span>
                        </h1>
                        <p className={styles.taglineSub}>
                            Únete a miles de empresas que ya transformaron
                            su gestión financiera con nuestra plataforma.
                        </p>
                    </div>

                    {/* social proof — avatares + texto de confianza */}
                    <div className={styles.socialProof}>
                        <div className={styles.avatars}>
                            <span className={styles.avatar}>JR</span>
                            <span className={styles.avatar}>MV</span>
                            <span className={styles.avatar}>AL</span>
                        </div>
                        <p className={styles.socialProofText}>
                            +2.500 empresas ya confían en nosotros
                        </p>
                    </div>
                </div>

                {/* decoración de fondo — círculos de luz difusa + grilla */}
                {/* son divs vacíos, toda la magia está en el scss */}
                <div className={styles.heroBgCircle1} />
                <div className={styles.heroBgCircle2} />
                <div className={styles.heroBgGrid} />
            </div>

            {/* ── PANEL DERECHO — formulario ── */}
            <div className={styles.formPanel}>
                <div className={styles.formContainer}>

                    <div className={styles.formHeader}>
                        <h2 className={styles.formTitle}>Crear nueva empresa</h2>
                        <p className={styles.formSubtitle}>
                            Ingresa los datos para registrar tu empresa en la plataforma
                        </p>
                    </div>

                    {/* Nombre de la empresa */}
                    <div className={styles.fieldWrap}>
                        <FormField
                            label="Nombre de la Empresa"
                            type="text"
                            placeholder="Ej. Finanzas S.A."
                            value={values.nombreEmpresa}
                            onChange={(e) => onChange("nombreEmpresa", e.target.value)}
                        />
                        {/* ANTES: errors?.nombreEmpresa → siempre undefined porque treeifyError
                            mete los campos dentro de "properties", no en la raíz del objeto
                            AHORA: el hook guarda solo .properties entonces llegamos directo al campo
                            errors.nombreEmpresa.errors[0] en vez de errors.nombreEmpresa._errors[0]
                            porque treeifyError usa "errors" no "_errors" */}
                        {errors?.nombreEmpresa && (
                            <span className={styles.errorMsg}>
                                {errors.nombreEmpresa.errors[0]}
                            </span>
                        )}
                    </div>

                    {/* Subdominio — readonly, se genera desde el nombre de la empresa */}
                    <div className={styles.fieldWrap}>
                        <label className={styles.subLabel}>Subdominio</label>
                        <div className={styles.subRow}>
                            <div className={styles.subInputWrap}>
                                <input
                                    type="text"
                                    value={subdominioSugerido}
                                    readOnly
                                    // subInputConfirmed cambia el borde y color cuando ya fue aceptado
                                    className={`${styles.subInput} ${subdominioConfirmado ? styles.subInputConfirmed : ""}`}
                                    placeholder="se genera automáticamente"
                                />
                                {subdominioSugerido && (
                                    <span className={styles.subDomain}>.tuapp.com</span>
                                )}
                            </div>

                            {/* solo muestra el botón si está disponible y aún no fue confirmado */}
                            {subdominioExiste === false && !subdominioConfirmado && (
                                <button
                                    type="button"
                                    onClick={onElegirSubdominio}
                                    className={styles.acceptBtn}
                                >
                                    Elegir
                                </button>
                            )}
                        </div>

                        {subdominioChecking && (
                            <p className={styles.subChecking}>Verificando disponibilidad...</p>
                        )}
                        {subdominioExiste === true && (
                            <p className={styles.subError}>⚠ Este subdominio ya está en uso</p>
                        )}
                        {/* solo muestra disponible si existe === false y aún no confirmado */}
                        {subdominioExiste === false && !subdominioConfirmado && (
                            <p className={styles.subAvailable}>✓ Disponible</p>
                        )}
                        {subdominioConfirmado && (
                            <p className={styles.subConfirmed}>✓ Subdominio confirmado</p>
                        )}
                    </div>

                    {/* Email */}
                    <div className={styles.fieldWrap}>
                        <FormField
                            label="Correo Electrónico"
                            type="email"
                            placeholder="admin@empresa.com"
                            value={values.email}
                            onChange={(e) => onChange("email", e.target.value)}
                        />
                        {/* ANTES: {errors?.email && <span>{errors.email._errors[0]}</span>}
                            mismo problema — email tampoco existía en la raíz de errors
                            AHORA: .errors[0] en vez de ._errors[0] */}
                        {errors?.email && (
                            <span className={styles.errorMsg}>
                                {errors.email.errors[0]}
                            </span>
                        )}
                    </div>

                    {/* Teléfono */}
                    <div className={styles.fieldWrap}>
                        <FormField
                            label="Teléfono"
                            type="text"
                            placeholder="3001234567"
                            value={values.telefono}
                            onChange={(e) => onChange("telefono", e.target.value)}
                        />
                        {/* ANTES: {errors?.telefono && <span>{errors.telefono._errors[0]}</span>}
                            mismo problema — telefono tampoco existía en la raíz de errors
                            AHORA: .errors[0] en vez de ._errors[0] */}
                        {errors?.telefono && (
                            <span className={styles.errorMsg}>
                                {errors.telefono.errors[0]}
                            </span>
                        )}
                    </div>

                    {/* cuando deshabilitarBoton = true  → comportamiento real
                        cuando deshabilitarBoton = false → solo deshabilita mientras carga */}
                    <Button
                        buttonText={loading ? "Creando empresa..." : "Crear Empresa"}
                        onClick={onSubmit}
                        disabled={deshabilitarBoton ? (!isFormValid || loading) : loading}
                        full
                        style={{
                            opacity: isFormValid ? 1 : 0.6,
                        }}
                    />

                </div>
            </div>

        </div>
    );
};

export default RegisterForm;