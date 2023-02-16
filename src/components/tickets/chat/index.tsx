import { useTicketContext } from "@/context/tickets";
import { useCreateTicketModal } from "../modals/Create";
import TicketChatMessages from "./messages";
import TicketChatTextArea from "./textArea";

export default function TicketChat() {
  const { activeTicket } = useTicketContext();

  const openCreateTicketModal = useCreateTicketModal();

  return activeTicket ? (
    <div className="flex flex-1 flex-col">
      <TicketChatMessages />
      <TicketChatTextArea />
    </div>
  ) : (
    <div className="flex flex-1 flex-col items-center justify-center gap-2">
      <h1>Select a ticket</h1>
      <h1 className="text-gray-400">or</h1>
      <button className="btn btn-primary" onClick={openCreateTicketModal}>
        Create a ticket
      </button>
    </div>
  );
}
