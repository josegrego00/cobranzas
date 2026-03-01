import { useState } from "react";
import RegisterForm from "../../03-organisms/RegisterForm/RegisterForm";
import useAuth from "../../../hooks/useAuth";

const RegisterPage = () => {
  const [values, setValues] = useState({
    nombreEmpresa: "",
    subdominio: "",
    emailContacto: "",
    telefono: "",
    plan: "Básico",
    crearUsuarioAdmin: true,
    crearDatosIniciales: true,
  });

  const { register, loading } = useAuth();

  const handleChange = (fieldName, value) => {
    setValues((prev) => ({ ...prev, [fieldName]: value }));
  };

  return (
    <section className="register-page">
      <RegisterForm
        values={values}
        onChange={handleChange}
        onSubmit={() => register(values)}
        loading={loading}
      />
    </section>
  );
};

export default RegisterPage;