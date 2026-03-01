import Input from  "../../01-atoms/Input/Input";
import styles from "./FormField.module.scss";

const FormField = ({ label, type, placeholder, value, onChange }) => {
  return (
    <div className={styles.formField}>
      <Input 
        label={label}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default FormField;