import React, { useState } from "react";
import RegisterForm from "../../03-organisms/RegisterForm/RegisterForm";
import useAuth from "../../../hooks/useAuth";

const RegisterPage = () => {
  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const { register, loading } = useAuth(); // toda la lógica aquí

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