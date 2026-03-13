// 🟢 [NUEVO] -> Importamos la molécula exacta
import FormField from "@/components/02-molecules/FormField/FormField";
import styles from "./LoginForm.module.scss";

// 🟢 [NUEVO] -> Recibimos las props que mandará la LoginPage
const LoginForm = ({ values, errors, onChange, onSubmit, loading, disabled }) => {
  return (
    // 🟢 [NUEVO] -> El onSubmit va en la etiqueta form nativa
    <form className={styles.loginForm} onSubmit={onSubmit}>
      
      {/* --- CAMPO EMAIL --- */}
      <FormField
        label="Correo Electrónico"
        type="email"
        placeholder="admin@empresa.com"
        value={values.email}
        // 🟢 [NUEVO] -> Como el Átomo no usa "name", le pasamos el nombre del campo 
        // directamente en la función onChange para que el Page sepa qué se está escribiendo.
        onChange={(e) => onChange("email", e.target.value)}
      />
      {/* 🟢 [NUEVO] -> Zod devuelve los errores en un array _errors. Mostramos el primero si existe */}
      {errors?.email && (
        <span style={{ color: "red", fontSize: "0.8rem" }}>
         {errors.email.errors[0]}
        </span>
      )}

      {/* --- CAMPO PASSWORD --- */}
      <FormField
        label="Contraseña"
        type="password"
        placeholder="********"
        value={values.password}
        onChange={(e) => onChange("password", e.target.value)}
      />
      {errors?.password && (
        <span style={{ color: "red", fontSize: "0.8rem" }}>
          {errors.password.errors[0]}
        </span>
      )}

      <FormField
      label="Subdominio"
      type="text"
      placeholder="manu"
      value={values.subdominio}
      onChange={(e) => onChange("subdominio", e.target.value)}
    />
    {errors?.subdominio && (
      <span style={{ color: "red", fontSize: "0.8rem" }}>
        {errors.subdominio.errors[0]}
      </span>
    )}

      {/* --- BOTÓN SUBMIT --- */}
      {/* 🟢 [NUEVO] -> Si está cargando o el form no es válido (disabled), bloqueamos el botón */}
      <button 
        type="submit" 
        disabled={disabled || loading}
        className={styles.submitBtn} // (Falta darle  estilos a este botón en el LoginForm.module.scss)
      >
        {loading ? "Iniciando sesión..." : "Ingresar"}
      </button>

    </form>
  );
};

export default LoginForm;