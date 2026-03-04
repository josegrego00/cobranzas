import { useState } from "react";
import RegisterForm from "../../03-organisms/RegisterForm/RegisterForm";
import useAuth from "../../../hooks/useAuth";
import useValidateSubdomain from "../../../hooks/useValidateSubdomain";

const generateSubdomain = (name) =>
    name.toLowerCase().trim()
        .normalize("NFD").replace(/[\u0300-\u036f]/g, "") // quita tildes
        .replace(/[^a-z0-9]/g, "")                        // solo letras y números
        .slice(0, 20);                                     // máximo 20 chars

const RegisterPage = () => {
    const [values, setValues] = useState({
        nombreEmpresa: "",
        subdominio: "",
        email: "",
        telefono: "",
        planServicio: "Básico",
        crearUsuarioAdmin: true,
        crearDatosIniciales: true,
    });

    const [subdominioConfirmado, setSubdominioConfirmado] = useState(false);
    const [subdominioSugerido, setSubdominioSugerido] = useState("");

    const { register, loading } = useAuth();
    const { exists, checking, validate } = useValidateSubdomain();

    const handleChange = (fieldName, value) => {
        setValues((prev) => ({ ...prev, [fieldName]: value }));

        if (fieldName === "nombreEmpresa") {
            const sugerido = generateSubdomain(value);
            setSubdominioSugerido(sugerido);
            setSubdominioConfirmado(false);
            setValues((prev) => ({ ...prev, subdominio: "" }));
            if (sugerido.length >= 3) validate(sugerido);
        }
    };

    const handleElegirSubdominio = () => {
        setValues((prev) => ({ ...prev, subdominio: subdominioSugerido }));
        setSubdominioConfirmado(true);
    };

    return (
        <section className="register-page">
            <RegisterForm
                values={values}
                onChange={handleChange}
                onSubmit={() => register(values)}
                loading={loading}
                subdominioSugerido={subdominioSugerido}
                subdominioExiste={exists}
                subdominioChecking={checking}
                subdominioConfirmado={subdominioConfirmado}
                onElegirSubdominio={handleElegirSubdominio}
            />
        </section>
    );
};

export default RegisterPage;