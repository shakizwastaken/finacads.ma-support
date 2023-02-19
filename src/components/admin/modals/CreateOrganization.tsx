import Input from "@/components/common/inputs/Input";
import SubmitModal from "@/components/common/modals/Submit";
import { useModal } from "@/context/modal";
import { SubmitHandler, useFieldArray, useForm } from "react-hook-form";
import CreateOrganizationUsers from "./users/organization";
import { api } from "@/utils/api";

export interface UserForm {
  firstName: string;
  lastName: string;
  email: string;
  emailConfirmed: boolean;

  contactEmail?: string;
  displayNumber?: string;

  position?: string;
}

export interface OrganizationForm {
  name: string;
  description?: string;
  users: UserForm[];
}

export default function AdminCreateOrganizationModal() {
  const { closeModal } = useModal();

  const { control, register, handleSubmit, reset } =
    useForm<OrganizationForm>();

  const { mutate: createOrganization } = api.organization.create.useMutation({
    onSuccess() {
      reset();
      closeModal();
    },
  });

  const onSubmit: SubmitHandler<OrganizationForm> = (data) => {
    createOrganization({ ...data });
  };
  const onCancel = () => {
    reset();
    closeModal();
  };
  return (
    <SubmitModal
      onSubmit={handleSubmit(onSubmit)}
      onCancel={onCancel}
      className="flex flex-col gap-5 border-2 border-dark bg-white text-dark shadow-md"
    >
      <h1 className="text-xl font-bold">Create a ticket</h1>
      <h1 className="font-bold">Organization details</h1>
      <div className="flex flex-wrap items-center justify-center gap-4">
        <Input
          register={register("name", { required: true })}
          label="Name"
          className="flex-[45%]"
          placeholder="organization's name"
        />
        <Input
          register={register("description", { required: false })}
          label="Description (optional)"
          className="flex-[45%]"
          placeholder="organization's description"
        />
      </div>
      <h1 className="font-bold">Organization users</h1>

      <CreateOrganizationUsers register={register} control={control} />
    </SubmitModal>
  );
}

export const useOpenAdminCreateOrganizationModal = () => {
  const { openModal } = useModal();

  return () => openModal(<AdminCreateOrganizationModal />);
};
