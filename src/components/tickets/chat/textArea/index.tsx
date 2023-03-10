import { useTicketContext } from "@/context/tickets";
import { api } from "@/utils/api";
import { EventHandler, KeyboardEvent, useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { IoMdSend } from "react-icons/io";

export default function TicketChatTextArea() {
  const utils = api.useContext();

  const { activeTicket } = useTicketContext();

  const { data: ticketData } = api.ticket.getTicket.useQuery({
    id: activeTicket || "",
  });
  console.log(ticketData);

  const { register, handleSubmit, reset, getValues } = useForm<{
    content: string;
  }>();
  const { mutate: sendMessage, isLoading } =
    api.ticket.sendUserMessage.useMutation({
      onSuccess() {
        utils.ticket.getConversation.invalidate();
        utils.ticket.getAll.invalidate();
      },
    });

  const onSubmit: SubmitHandler<{ content: string }> = ({ content }) => {
    if (isLoading) return;
    sendMessage({ ticketId: activeTicket as string, content });
    reset({ content: "" });
  };

  const handlePressEnter = (e: any) => {
    if (e.key === "Enter" && getValues().content) {
      onSubmit(getValues());
    }
  };

  useEffect(() => {
    document.addEventListener("keyup", handlePressEnter);

    return () => {
      document.removeEventListener("keyup", handlePressEnter);
    };
  }, [activeTicket]);

  return (
    <div className="flex h-[75px] w-full gap-4 border-t-2 px-6 py-4">
      <input
        className="flex-[85%] rounded-full border-2 border-primary bg-light py-2 px-4 outline-none"
        placeholder={
          ticketData?.isClosed
            ? "Cannot talk in a closed ticket."
            : "write a message..."
        }
        {...register("content", {
          required: true,
          onChange() {
            if (isLoading) return;
          },
        })}
        disabled={ticketData?.isClosed}
      />
      <div className="flex flex-[15%] items-center justify-center">
        <button
          disabled={isLoading || ticketData?.isClosed}
          className="btn btn-primary items-center rounded-full"
          onClick={handleSubmit(onSubmit)}
        >
          <IoMdSend />
        </button>
      </div>
    </div>
  );
}
