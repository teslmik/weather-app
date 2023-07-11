import React from "react";
import { FieldValues, UseFormRegister } from "react-hook-form";

import styles from "./styles.module.css";

type Properties = {
  label: string;
  name: keyof FieldValues;
  register: UseFormRegister<FieldValues>;
  min?: number;
  max?: number;
};

export const TemperatureInput: React.FC<Properties> = ({
  label,
  name,
  register,
  min = -80,
  max = 80
}) => {
  return (
    <div className={styles.inputWrapper}>
      <label>{label}</label>
      <input
        className={styles.input}
        type="number"
        {...register(name, {
          valueAsNumber: true,
          min: min,
          max: max
        })}
        placeholder={label}
      />
    </div>
  );
};