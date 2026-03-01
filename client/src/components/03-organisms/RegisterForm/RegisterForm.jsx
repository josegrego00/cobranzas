import FormField from "../../02-molecules/FormField/FormField";
import Button from "../../01-atoms/Button/Button";
import styles from "./RegisterForm.module.scss";

const FIELDS = [
  { name: "nombreEmpresa", label: "Nombre de la Empresa", type: "text",  placeholder: "Acme S.A." },
  { name: "subdominio",    label: "Subdominio",           type: "text",  placeholder: "acme" },
  { name: "emailContacto", label: "Email de Contacto",   type: "email", placeholder: "admin@acme.com" },
  { name: "telefono",      label: "Teléfono",             type: "text",  placeholder: "3001234567" },
];

const RegisterForm = ({ values, onChange, onSubmit, loading }) => {
  return (
    <div className={styles.container}>
      <h2>Crear Nueva Empresa</h2>
      {FIELDS.map((field) => (
        <FormField
          key={field.name}
          label={field.label}
          type={field.type}
          placeholder={field.placeholder}
          value={values[field.name]}
          onChange={(e) => onChange(field.name, e.target.value)}
        />
      ))}
      <Button
        buttonText={loading ? "Creando..." : "Crear Empresa"}
        onClick={onSubmit}
        full
      />
    </div>
  );
};

export default RegisterForm;