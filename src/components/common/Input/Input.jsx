import React from "react";
import styles from "./Input.module.css";

const Input = ({
  value,
  onChange,
  placeholder = "",
  type = "text",
  className = "",
}) => {
  return (
    <input
      type={type}
      className={`${styles.input} ${className}`}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
    />
  );
};

export default Input;
