import { UseFormRegisterReturn } from "react-hook-form";

export interface InputProps {
  label?: string;
  placeholder?: string;
  register: UseFormRegisterReturn;
}

export default function TextArea({ label, placeholder, register }: InputProps) {
  return (
    <div className="form-control">
      <label className="form-control-label">{label}</label>
      <textarea
        placeholder={placeholder}
        className="form-control-input"
        {...register}
      />
    </div>
  );
}
