import { HTMLInputTypeAttribute } from "react";
import { InputDefaultProps } from "./types";

export interface InputProps extends InputDefaultProps {
  type?: HTMLInputTypeAttribute;
}

export default function Input({
  label,
  type,
  placeholder,
  register,
  className,
  disabled,
}: InputProps) {
  return (
    <div className={`form-control ${className}`}>
      <label className="form-control-label">{label}</label>
      <input
        placeholder={placeholder}
        className="form-control-input"
        type={type}
        {...register}
        disabled={disabled}
      />
    </div>
  );
}
