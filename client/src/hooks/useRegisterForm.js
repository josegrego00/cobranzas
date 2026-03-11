// hooks/useRegisterForm.js

import { useState } from "react";
import { z } from "zod";

// ── El esquema describe las reglas de cada campo ──────────────────
// z.string() = debe ser texto
// .trim()    = Zod elimina espacios antes de validar
// .min(2)    = después de quitar espacios, mínimo 2 caracteres
const schema = z.object({

  nombreEmpresa: z
    .string()
    .trim()
    .min(2, { message: "Mínimo 2 caracteres" }),

  email: z
    .email({ message: "Ingresa un email válido" })
    .trim(),

  telefono: z
    .string()
    .trim()
    .min(7, { message: "Teléfono muy corto" })
    .regex(/^[0-9+\s-]+$/, { message: "Solo números permitidos" }),

  subdominio: z
    .string()
    .trim()
    .min(3, { message: "Mínimo 3 caracteres" }),

});

const useRegisterForm = () => {
  // errors guarda los mensajes por campo
  const [errors, setErrors] = useState({});

  const validate = (values) => {
    const result = schema.safeParse(values);

    if (!result.success) {
      const errores = z.treeifyError(result.error);
      console.log("valores que llegaron →", values);  // ver qué datos tiene el form
      console.log("errores Zod →", errores);           // ver la estructura exacta de los errores

      // ANTES: setErrors(errores)
      // fallaba porque treeifyError devuelve { errors:[], properties:{ campo:{ errors:[] } } }
      // y en el organismo leíamos errors.nombreEmpresa que no existe en la raíz
      // AHORA: guardamos solo .properties para acceder directo a cada campo sin escribir
      // errors.properties.campo en cada span — queda más limpio en el organismo
      setErrors(errores.properties);

      return false;
    }

    setErrors({});
    return true;
  };

  // isValid — se usa para deshabilitar el botón en tiempo real
  // no guarda errores, solo dice true o false
  const isValid = (values) => schema.safeParse(values).success;

  return { errors, validate, isValid };
};

export default useRegisterForm;