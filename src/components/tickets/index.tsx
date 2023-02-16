import { TicketContextProvider, useTicketContext } from "@/context/tickets";
import TicketChat from "./chat";
import TicketsList from "./list";

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
