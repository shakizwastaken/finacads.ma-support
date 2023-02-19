import { useTicketContext } from "@/context/tickets";
import { api } from "@/utils/api";
import TicketChatMessage from "./Message";
import { useEffect } from "react";

export default function TicketChatMessages() {
  const { activeTicket, messagesEnd, scrollToBottom } = useTicketContext();
  let { data: messages } = api.ticket.getConversation.useQuery(
    {
      ticketId: activeTicket || "",
    },
    {
      refetchIntervalInBackground: true,
      refetchInterval: 3000,
    }
  );

  let { data: ticketData } = api.ticket.getTicket.useQuery({
    id: activeTicket || "",
  });

  useEffect(() => {
    scrollToBottom();
  }, [activeTicket, messagesEnd, messagesEnd?.current, messages]);

  if (messages && messages.length)
    return (
      <div className="h-[calc(100vh-150px)] w-full overflow-y-auto px-4 py-4">
        {messages.map((message) => (
          <TicketChatMessage key={message.id} {...message} />
        ))}

        <div ref={messagesEnd}></div>

        {ticketData?.isClosed && (
          <div className="flex w-full items-center justify-center text-center">
            <h1 className="select-none rounded-full bg-slate-400 px-4 py-[1px] text-center text-sm">
              This ticket is closed
            </h1>
          </div>
        )}
      </div>
    );
  else
    return (
      <div className="flex flex-1 select-none items-center justify-center font-semibold text-dark">
        Conversation is empty
      </div>
    );
}
