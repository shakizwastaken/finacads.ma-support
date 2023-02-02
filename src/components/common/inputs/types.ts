import { UseFormRegisterReturn } from "react-hook-form";

export interface InputDefaultProps {
  label?: string;
  placeholder?: string;
  register: UseFormRegisterReturn;
  className?: string;
  disabled?: boolean;
}
