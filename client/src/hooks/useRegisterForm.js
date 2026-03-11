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
  // ejemplo: { email: ["Ingresa un email válido"] }
  const [errors, setErrors] = useState({});

  // validate — llámala al hacer submit
  // devuelve true si todo está bien, false si hay errores
  const validate = (values) => {
    const result = schema.safeParse(values);

    if (!result.success) {
      // treeifyError() convierte los errores al formato { campo: ["mensaje"] }
      setErrors(z.treeifyError(result.error));
      return false; // hay errores, no envíes
    }

    setErrors({});
    return true; // todo limpio, puedes enviar
  };

  // isValid — se usa para deshabilitar el botón en tiempo real
  // no guarda errores, solo dice true o false
  const isValid = (values) => schema.safeParse(values).success;

  return { errors, validate, isValid };
};

export default useRegisterForm;