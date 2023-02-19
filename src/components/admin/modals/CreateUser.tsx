import SubmitModal from "@/components/common/modals/Submit";
import { useModal } from "@/context/modal";
import { SubmitHandler, useForm } from "react-hook-form";
import { UserForm } from "./CreateOrganization";
import CreateUserForm from "./users/User";
import { api } from "@/utils/api";
import SelectCustomer from "@/components/common/inputs/misc/SelectCustomer";

export interface CreateUserForm extends UserForm {
  customerId: string;
}

export default function AdminCreateUserModal() {
  const { register, handleSubmit, reset } = useForm<CreateUserForm>();
  const { closeModal } = useModal();

  const { mutate: createUser } = api.user.add.useMutation({
    onSuccess() {
      reset();
      closeModal();
    },
  });

  const onCancel = () => {
    closeModal();
  };

  const onSubmit: SubmitHandler<CreateUserForm> = (data) => createUser(data);

  return (
    <SubmitModal
      onSubmit={handleSubmit(onSubmit)}
      onCancel={onCancel}
      className="flex select-none flex-col gap-5 border-2 border-dark bg-white text-dark shadow-md"
    >
      <h1 className="text-2xl font-bold">Add user</h1>
      <h1 className="text-xl font-bold">Customer Details</h1>
      <SelectCustomer register={register("customerId")} />
      <h1 className="text-xl font-bold">User Details</h1>
      <CreateUserForm
        firstName={register(`firstName`)}
        lastName={register(`lastName`)}
        displayNumber={register(`displayNumber`)}
        email={register(`email`)}
      />
    </SubmitModal>
  );
}

export const useOpenAdminCreateUserModal = () => {
  const { openModal } = useModal();
  return () => openModal(<AdminCreateUserModal />);
};
