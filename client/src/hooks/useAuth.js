import { useState } from "react";

const useAuth = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const register = async (values) => {
    setLoading(true);
    
    setError(null);
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/superadmin/crear-tenant`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      if (response.ok) {
        const data = await response.json();
        alert(`¡Empresa "${data.nombreTenant}" creada con éxito!`);
      } else {
        // 🟢[NUEVO] Manejo de error si la API responde con 400/500
        const errData = await response.json();
        throw new Error(errData.message || "Error al registrar");
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // 🟢 [NUEVO] Función Login implementada
  const login = async (values) => {
    setLoading(true);
    setError(null);
    try {
      // 🟢 OJO: Cambia la ruta por la real de tu API para login
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      if (response.ok) {
        const data = await response.json();
        // 🟢 [NUEVO] Guardar token en localStorage (o estado global)
        localStorage.setItem("token", data.token);
        alert(`¡Bienvenido! Rol: ${data.rol}`);
        // Aquí podrías redirigir al Dashboard
      } else {
        const errData = await response.json();
        throw new Error(errData.message || "Credenciales incorrectas");
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return { register, login, loading, error };
};

export default useAuth;