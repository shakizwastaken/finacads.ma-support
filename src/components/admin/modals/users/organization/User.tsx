import {
  FieldArrayWithId,
  FieldValues,
  UseFormRegister,
} from "react-hook-form";
import { OrganizationForm, UserForm } from "../../CreateOrganization";
import Input from "@/components/common/inputs/Input";
import { BiTrash } from "react-icons/bi";
import CreateUserForm from "../User";

export interface CreateOrganizationUserProps<T extends FieldValues>
  extends UserForm {
  id: number;
  register: UseFormRegister<T>;
  removeUser: () => any;
  users: FieldArrayWithId<OrganizationForm, "users", "id">[];
}

export default function CreateOrganizationUser({
  id,
  register,
  removeUser,
  users,
}: CreateOrganizationUserProps<OrganizationForm>) {
  return (
    <div>
      <CreateUserForm
        firstName={register(`users.${id}.firstName`)}
        lastName={register(`users.${id}.lastName`)}
        displayNumber={register(`users.${id}.displayNumber`)}
        email={register(`users.${id}.email`)}
      />

      <div className="flex items-center justify-end px-4 py-2 ">
        <button
          className="btn btn-cancel flex items-center gap-2"
          onClick={removeUser}
          disabled={users.length === 1}
        >
          <BiTrash /> Remove user
        </button>
      </div>
      <div className="h-[2px] w-full rounded-full bg-gray-900"></div>
    </div>
  );
}
