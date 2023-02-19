import Input from "@/components/common/inputs/Input";
import { UseFormRegisterReturn } from "react-hook-form";

export interface CreateUserFormProps {
  email: UseFormRegisterReturn;
  firstName: UseFormRegisterReturn;
  lastName: UseFormRegisterReturn;
  displayNumber: UseFormRegisterReturn;
}

export default function CreateUserForm({
  firstName,
  lastName,
  email,
  displayNumber,
}: CreateUserFormProps) {
  return (
    <div className="items-between flex flex-wrap items-center gap-2 py-4 px-2">
      <Input
        label="first name"
        className="flex-[30%]"
        placeholder="user's first name"
        register={{ ...firstName }}
      />

      <Input
        label="last name (optional)"
        className="flex-[30%]"
        placeholder="user's last name"
        register={{ ...lastName }}
      />
      <Input
        label="email (important)"
        className="flex-[30%]"
        placeholder="user's email"
        register={{ ...email }}
      />

      <Input
        label="number (optional)"
        className="flex-[30%]"
        placeholder="user's contact number"
        register={{ ...displayNumber }}
      />
    </div>
  );
}
