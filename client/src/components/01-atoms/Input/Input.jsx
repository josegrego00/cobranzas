import React from "react";
import styles from "./Input.module.scss";

// Este Input es reutilizable gracias a las props:
// - label: texto que aparece arriba del campo
// - placeholder: texto de ejemplo dentro del input
// - type: tipo de input (text, email, password, etc.)
// - value: valor actual del input (controlado por React)
// - onChange: función que se ejecuta cuando el usuario escribe
const Input = ({ label, placeholder, type = "text", value, onChange }) => {
  return (
    <div className={styles["input"]}>
      {label && <label className={styles["input__label"]}>{label}</label>}
      <input
        className={styles["input__field"]}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default Input;
