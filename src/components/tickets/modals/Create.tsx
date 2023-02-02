import SubmitModal from "@/components/common/modals/Submit";
import { useModal } from "@/context/modal";
import { Ticket } from "@prisma/client";
import { SubmitHandler, useForm } from "react-hook-form";

export interface CreateTicketData
  extends Omit<Ticket, "createdAt" | "updatedAt" | "userId" | "id"> {}

export default function CreateTicketModal() {
  const { register, handleSubmit, reset } = useForm<CreateTicketData>();

  const { closeModal } = useModal();

  const onSubmit: SubmitHandler<CreateTicketData> = ({}) => {};
  const onCancel = () => {
    reset();
    closeModal();
  };

  return (
    <SubmitModal
      onCancel={onCancel}
      onSubmit={handleSubmit(onSubmit)}
      className=""
    >
      Create
    </SubmitModal>
  );
}

export const useCreateTicketModal = () => {
  const { openModal } = useModal();

  return () => openModal(<CreateTicketModal />);
};
