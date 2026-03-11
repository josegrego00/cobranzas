import { useState } from "react";
import RegisterForm from "../../03-organisms/RegisterForm/RegisterForm";
import useAuth from "../../../hooks/useAuth";
import useValidateSubdomain from "../../../hooks/useValidateSubdomain";
import useRegisterForm from "../../../hooks/useRegisterForm";

// convierte el nombre de la empresa en un subdominio limpio
// ejemplo: "Acme Corp!" → "acmecorp"
const generateSubdomain = (name) =>
    name.toLowerCase().trim()
        .normalize("NFD").replace(/[\u0300-\u036f]/g, "") // quita tildes
        .replace(/[^a-z0-9]/g, "")                        // solo letras y números
        .slice(0, 20);                                     // máximo 20 chars

const RegisterPage = () => {

    // todos los campos del formulario en un solo objeto
    const [values, setValues] = useState({
        nombreEmpresa: "",
        subdominio: "",
        email: "",
        telefono: "",
        planServicio: "Básico",
        crearUsuarioAdmin: true,
        crearDatosIniciales: true,
    });

    // estos dos son aparte porque manejan la lógica especial del subdominio
    const [subdominioConfirmado, setSubdominioConfirmado] = useState(false);
    const [subdominioSugerido, setSubdominioSugerido]     = useState("");

    // useAuth → habla con la API
    // useValidateSubdomain → verifica si el subdominio ya existe
    // useRegisterForm → valida los campos con Zod
    const { register, loading }                              = useAuth();
    const { exists, checking, validate: validateSubdominio } = useValidateSubdomain();
    const { errors, validate: validateForm, isValid }        = useRegisterForm();

    // se ejecuta cada vez que el usuario escribe en cualquier campo
    // si el campo es nombreEmpresa, también genera y verifica el subdominio
    const handleChange = (fieldName, value) => {

        // ANTES: setValues((prev) => ({ ...prev, [fieldName]: value }))
        // fallaba para la validación en tiempo real porque setValues es asíncrono —
        // si llamábamos validateForm(values) justo después, values todavía tenía el valor viejo
        // AHORA: construimos newValues antes de setValues para tener el valor actualizado
        // disponible de inmediato y pasárselo a validateForm sin esperar el re-render
        const newValues = { ...values, [fieldName]: value };
        setValues(newValues);

        if (fieldName === "nombreEmpresa") {
            const sugerido = generateSubdomain(value);
            setSubdominioSugerido(sugerido);
            setSubdominioConfirmado(false);          // si cambia la empresa hay que volver a confirmar
            newValues.subdominio = "";               // limpiamos también en newValues para que Zod lo vea
            setValues((prev) => ({ ...prev, subdominio: "" }));
            if (sugerido.length >= 3) validateSubdominio(sugerido); // consulta al backend si ya existe
        }

        // solo revalida en tiempo real si el usuario ya intentó enviar antes
        // así no bombardeamos con errores mientras apenas está escribiendo por primera vez
        // Object.keys(errors).length > 0 significa que ya hay errores visibles en pantalla
        if (Object.keys(errors).length > 0) {
            validateForm(newValues); // pasamos newValues no values — values aún es el valor viejo aquí
        }
    };

    // cuando el usuario presiona "Elegir este subdominio"
    // guarda el sugerido como el oficial y marca como confirmado
    const handleElegirSubdominio = () => {
        setValues((prev) => ({ ...prev, subdominio: subdominioSugerido }));
        setSubdominioConfirmado(true);
    };

    // antes de enviar, Zod revisa todo en el navegador
    // si hay errores los muestra sin tocar la API
    // solo llega a register() si todo está limpio
    const handleSubmit = () => {
        const formOk = validateForm(values);
        if (!formOk) return;
        register(values);
    };

    // el botón se activa solo cuando:
    // 1. todos los campos pasan las reglas de Zod
    // 2. el subdominio fue confirmado por el usuario
    const isFormValid = isValid(values) && subdominioConfirmado;

    return (
        <section className="register-page">
            <RegisterForm
                values={values}
                onChange={handleChange}
                onSubmit={handleSubmit}
                loading={loading}
                errors={errors}                        // mensajes de Zod para mostrar bajo cada campo
                isFormValid={isFormValid}              // controla el disabled del botón
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