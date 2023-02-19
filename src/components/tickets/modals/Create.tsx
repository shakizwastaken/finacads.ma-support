import Input from "@/components/common/inputs/Input";
import InputSelect, { Option } from "@/components/common/inputs/Select";
import TextArea from "@/components/common/inputs/TextArea";
import SubmitModal from "@/components/common/modals/Submit";
import { useAuth } from "@/context/auth/hooks";
import { useModal } from "@/context/modal";
import { Label, Ticket } from "@prisma/client";
import { SubmitHandler, useForm } from "react-hook-form";
import { api } from "@/utils/api";
import SelectCustomer from "@/components/common/inputs/misc/SelectCustomer";

export interface LabelOption {
  label: string;
  value: Label;
}

export interface CreateTicketData
  extends Omit<Ticket, "createdAt" | "updatedAt" | "userId" | "id"> {}

export default function CreateTicketModal() {
  const { register, handleSubmit, reset } = useForm<CreateTicketData>();

  const labelOptions: LabelOption[] = [
    {
      label: "Urgent",
      value: "URGENT",
    },
    {
      label: "Info",
      value: "INFO",
    },
    {
      label: "Order",
      value: "ORDER",
    },
    {
      label: "Issue",
      value: "ISSUE",
    },
  ];

  const {
    authState: { user },
  } = useAuth();

  const utils = api.useContext();

  const { data: customerOptions, isLoading: customerOptionsLoading } =
    api.ticket.getCustomerOptions.useQuery();

  const { mutate: createTicket } = api.ticket.create.useMutation({
    onSuccess() {
      utils.ticket.getAll.invalidate();
      closeModal();
    },
  });

  const { closeModal } = useModal();

  const onSubmit: SubmitHandler<CreateTicketData> = (data) => {
    console.log(data.labels);

    //@ts-ignore
    createTicket(data);
  };
  const onCancel = () => {
    reset();
    closeModal();
  };

  return (
    <SubmitModal
      onCancel={onCancel}
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-5 border-2 border-dark bg-white text-dark shadow-md"
    >
      <h1 className="text-xl font-bold">Create a ticket</h1>
      <div className="flex flex-wrap items-center justify-center gap-4">
        <Input
          register={register("title")}
          label="Title"
          className="flex-[45%]"
          placeholder="give a title to this ticket"
        />
        <TextArea
          register={register("description")}
          label="Description"
          placeholder="why have you created this ticket"
          className="flex-[45%]"
        />

        <SelectCustomer
          register={register("customerId")}
          className="flex-[45%]"
        />

        <InputSelect
          label="Label"
          loading={false}
          options={labelOptions}
          register={register("labels")}
          placeholder="select a label for this ticket"
          className="flex-[45%]"
        />
      </div>
    </SubmitModal>
  );
}

export const useCreateTicketModal = () => {
  const { openModal } = useModal();

  return () => openModal(<CreateTicketModal />);
};
