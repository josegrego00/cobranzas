import FormField from "../../02-molecules/FormField/FormField";
import Button from "../../01-atoms/Button/Button";
import styles from "./RegisterForm.module.scss";


const FIELDS = [
 // { name: "fullName",        label: "Full Name",        type: "text",     placeholder: "John Doe",             icon: "person"  },
 // { name: "businessName",    label: "Business Name",    type: "text",     placeholder: "Acme Corp",            icon: "business"},
  { name: "email",           label: "Email Address",    type: "email",    placeholder: "name@company.com",     icon: "email"   },
  { name: "password",        label: "Password",         type: "password", placeholder: "••••••••",             icon: "lock"    },
 // { name: "confirmPassword", label: "Confirm Password", type: "password", placeholder: "••••••••",             icon: "lock"    },
];

const RegisterForm = ({ values, onChange, onSubmit, loading }) => {
  return (
    <div className={styles.container}>
      <h2>Crear Cuenta</h2>

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
        buttonText={loading ? "Cargando..." : "Registrarme"}
        onClick={onSubmit}
        full
      />
    </div>
  );
};

export default RegisterForm;