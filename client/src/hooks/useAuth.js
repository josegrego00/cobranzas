import { useState } from "react";

const useAuth = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const register = async (values) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/superadmin/empresas`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      if (response.ok) {
        const data = await response.json();
        alert(`¡Empresa "${data.nombreTenant}" creada con éxito!`);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Cuando exista login, solo agregar aquí:
  // const login = async (values) => { ... }

  return { register, loading, error };
};

export default useAuth;