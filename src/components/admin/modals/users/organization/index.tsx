import { useState } from "react";
import {
  Control,
  FieldValues,
  UseFormRegister,
  useFieldArray,
} from "react-hook-form";
import { OrganizationForm, UserForm } from "../../CreateOrganization";
import CreateOrganizationUser from "./User";

export interface CreateOrganizationUsersProps<T extends FieldValues> {
  register: UseFormRegister<T>;
  control: Control<T>;
}

export default function CreateOrganizationUsers({
  register,
  control,
}: CreateOrganizationUsersProps<OrganizationForm>) {
  const {
    remove,
    append,
    update,
    fields: users,
  } = useFieldArray({
    control,
    name: "users",
    rules: { required: true },
  });

  //@ts-ignore
  const addUser = () => append({});

  const removeUser = (id: number) => () => remove(id);

  const mapUsers = () =>
    users.map(({ id, ...user }, i) => (
      <CreateOrganizationUser
        id={i}
        key={i}
        {...user}
        removeUser={removeUser(i)}
        register={register}
        users={users}
      />
    ));

  return (
    <div className="my-0 flex max-h-[45vh] flex-col items-center gap-4 overflow-y-scroll">
      {mapUsers()}
      <button className="btn btn-primary" onClick={() => addUser()}>
        Add user
      </button>
    </div>
  );
}
