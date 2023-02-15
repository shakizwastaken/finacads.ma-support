import { useTicketContext } from "@/context/tickets";
import { api } from "@/utils/api";
import TicketChatMessage from "./Message";
import { useRef, useEffect } from "react";

export default function TicketChatMessages() {
  const { activeTicket } = useTicketContext();
  let { data: messages } = api.ticket.getConversation.useQuery({
    ticketId: activeTicket || "",
  });

  const messagesRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    messagesRef?.current?.scrollTo({ behavior: "smooth" });
  }, []);

  if (messages && messages.length)
    return (
      <div className="h-[calc(100vh-150px)] w-full overflow-y-auto px-4 py-4">
        {messages.map((message) => (
          <TicketChatMessage key={message.id} {...message} />
        ))}
        <div ref={messagesRef} />
      </div>
    );
  else
    return (
      <div className="flex flex-1 select-none items-center justify-center font-semibold text-dark">
        Conversation is empty
      </div>
    );
}
