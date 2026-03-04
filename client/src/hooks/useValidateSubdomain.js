import { useState, useRef } from "react";

const useValidateSubdomain = () => {
    const [exists, setExists] = useState(null);
    const [checking, setChecking] = useState(false);
    const timerRef = useRef(null);

    const validate = (valor) => {
        clearTimeout(timerRef.current);
        if (!valor || valor.length < 3) return;

        timerRef.current = setTimeout(async () => {
            setChecking(true);
            try {
                const response = await fetch(
                    `${import.meta.env.VITE_API_URL}/api/subdominios/validar?valor=${valor}`
                );
                if (!response.ok) return;
                const existe = await response.json();
                setExists(existe);
            } catch (err) {
                console.error("Error validando subdominio:", err);
            } finally {
                setChecking(false);
            }
        }, 500);
    };

    return { exists, checking, validate };
};

export default useValidateSubdomain;