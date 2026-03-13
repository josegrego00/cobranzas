import { useState } from "react";

// 🟢 Subimos dos niveles (../..) para llegar a "components" y luego entramos a "03-organisms"
import LoginForm from "../../03-organisms/LoginForm/LoginForm";

// 🟢 Usando alias @ para src
import useAuth from "@/hooks/useAuth";
import useLoginForm from "@/hooks/useLoginForm";

// 🟢 Usando alias @ para src
import { toLoginPayload } from "@/mappers/tenant.mapper";

const LoginPage = () => {
  // 1. Traemos nuestros hooks
  const { login, loading, error } = useAuth();
  const { validate, errors, isValid } = useLoginForm();

  // 2. Estado local del formulario
  const [values, setValues] = useState({
    email: "",
    password: "",
    subdominio: "",
  });


  const handleChange = (fieldName, value) => {
    // Construimos el nuevo objeto al instante
    const newValues = { ...values, [fieldName]: value };
    setValues(newValues);

    // Revalidación en tiempo real: si ya había errores visibles, 
    // revisa de nuevo letra por letra para borrarlos en cuanto el usuario corrija
    if (Object.keys(errors).length > 0) {
      validate(newValues); 
    }
  };

  const handleSubmit = (e) => {
    // Prevenimos que el navegador recargue la página
    if (e) e.preventDefault();
    
    // 1. Validar reglas locales (Zod)
    const formOk = validate(values);
    if (!formOk) return;

    // 2. Usar Mapper (UI -> API)
    // toLoginPayload toma values.email y values.password 
    // (Asegura que el contrato DTO se respete)
    const payloadApi = toLoginPayload(values);

    // 3. Enviar al backend usando nuestro hook
    login(payloadApi);
  };

  return (
    <section className="login-page">
      <h1>Iniciar Sesión</h1>
      
      {/* 🟢 Si el backend devuelve credenciales inválidas, lo mostramos aquí */}
      {error && (
        <div style={{ color: "red", marginBottom: "1rem", fontWeight: "bold" }}>
          Error: {error}
        </div>
      )}

      {/* 🟢 Nuestro Organismo Tonto recibe todas las instrucciones aquí */}
      <LoginForm 
         values={values}
         errors={errors}
         onChange={handleChange}
         onSubmit={handleSubmit}
         loading={loading}
         // El botón se bloquea si isValid(values) da false de Zod
         disabled={!isValid(values)}
      />
    </section>
  );
};

export default LoginPage;