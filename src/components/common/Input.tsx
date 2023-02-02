import { HTMLInputTypeAttribute } from "react";
import { UseFormRegisterReturn } from "react-hook-form";

export interface InputProps {
  label?: string;
  placeholder?: string;
  type?: HTMLInputTypeAttribute;
  register: UseFormRegisterReturn;
  className?: string;
}

export default function Input({
  label,
  type,
  placeholder,
  register,
  className,
}: InputProps) {
  return (
    <div className={`form-control ${className}`}>
      <label className="form-control-label">{label}</label>
      <input
        placeholder={placeholder}
        className="form-control-input"
        type={type}
        {...register}
      />
    </div>
  );
}
