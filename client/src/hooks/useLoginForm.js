import { useState } from "react";
import { z } from "zod";

// 🟢[NUEVO] Esquema exclusivo para el Login
const schema = z.object({
  email: z
    .email({ message: "Ingresa un email válido" })
    .trim(),
  password: z
    .string()
    .min(6, { message: "La contraseña debe tener al menos 6 caracteres" }),
  subdominio: z
    .string()
    .trim()
    .min(3, { message: "Mínimo 3 caracteres" }),
});

const useLoginForm = () => {
  const [errors, setErrors] = useState({});

  const validate = (values) => {
    const result = schema.safeParse(values);

    if (!result.success) {
      const errores = z.treeifyError(result.error);
      setErrors(errores.properties);
      return false;
    }

    setErrors({});
    return true;
  };

  const isValid = (values) => schema.safeParse(values).success;

  return { errors, validate, isValid };
};

export default useLoginForm;