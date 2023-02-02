import { useTicketContext } from "@/context/tickets";
import { api } from "@/utils/api";
import { SubmitHandler, useForm } from "react-hook-form";
import { IoMdSend } from "react-icons/io";
import { useEffect } from "react";

export default function TicketChatTextArea() {
  const utils = api.useContext();

  const { activeTicket } = useTicketContext();

  const { register, handleSubmit, reset } = useForm<{ content: string }>();
  const { mutate: sendMessage, isLoading } =
    api.ticket.sendUserMessage.useMutation({
      onSuccess() {
        utils.ticket.getConversation.invalidate();
        reset({ content: "" });
      },
    });

  const onSubmit: SubmitHandler<{ content: string }> = ({ content }) => {
    if (isLoading) return;
    sendMessage({ ticketId: activeTicket || "", content });
  };

  useEffect(() => {
    return () => {
      reset({ content: "" });
    };
  }, []);

  return (
    <div className="flex h-[75px] w-full gap-4 border-t-2 px-6 py-4">
      <input
        className="flex-[85%] rounded-full border-2 border-primary bg-light py-2 px-4 outline-none"
        placeholder="write a message..."
        {...register("content", { required: true })}
      />
      <div className="flex flex-[15%] items-center justify-center">
        <button
          disabled={isLoading}
          className="btn btn-primary items-center rounded-full"
          onClick={handleSubmit(onSubmit)}
        >
          <IoMdSend />
        </button>
      </div>
    </div>
  );
}
