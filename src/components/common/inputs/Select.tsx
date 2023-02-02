import { InputDefaultProps } from "./types";

export type Option = { label: string; value: any };

export interface SelectInputProps extends InputDefaultProps {
  options: Option[];
  loading?: boolean;
}

export default function InputSelect({
  label,
  placeholder,
  register,
  className,
  options = [],
  disabled,
  loading,
}: SelectInputProps) {
  const mapOptions = () =>
    options.map((option) => (
      <option label={option.label} value={option.value}></option>
    ));

  return (
    <div className={`form-control ${className}`}>
      <h1 className="form-control-label">{label}</h1>
      {loading ? (
        <h1 className="form-control-input">Loading options</h1>
      ) : options.length ? (
        <select
          {...register}
          className="form-control-input"
          placeholder={placeholder}
          disabled={disabled}
        >
          {mapOptions()}
        </select>
      ) : (
        <h1 className="form-control-input select-none ">No {label} options</h1>
      )}
    </div>
  );
}
