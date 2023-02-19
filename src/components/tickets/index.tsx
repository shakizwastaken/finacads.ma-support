import { TicketContextProvider } from "@/context/tickets";
import TicketsList from "./list";
import TicketChat from "./chat";

export default function Tickets() {
  return (
    <TicketContextProvider>
      <div className="flex h-full w-full">
        <TicketsList />
        <TicketChat />
      </div>
    </TicketContextProvider>
  );
}
