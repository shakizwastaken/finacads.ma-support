import { InputDefaultProps } from "./types";

export interface InputTextAreaProps extends InputDefaultProps {}

export default function TextArea({
  label,
  placeholder,
  register,
  className,
  disabled,
}: InputTextAreaProps) {
  return (
    <div className={`form-control ${className}`}>
      <label className="form-control-label">{label}</label>
      <textarea
        placeholder={placeholder}
        className="form-control-input"
        {...register}
        disabled={disabled}
      />
    </div>
  );
}
