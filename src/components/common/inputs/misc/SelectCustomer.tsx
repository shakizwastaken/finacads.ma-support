import { api } from "@/utils/api";
import InputSelect from "../Select";
import { UseFormRegisterReturn } from "react-hook-form";

export default function SelectCustomer({
  className,
  register,
}: {
  className?: string;
  register: UseFormRegisterReturn;
}) {
  const { data: customerOptions, isLoading: customerOptionsLoading } =
    api.ticket.getCustomerOptions.useQuery();

  return (
    <InputSelect
      loading={customerOptionsLoading}
      options={customerOptions || [{ label: "Something cool", value: "" }]}
      register={{...register}}
      label="Cutomer"
      placeholder="select a customer"
      className={className}
    />
  );
}
