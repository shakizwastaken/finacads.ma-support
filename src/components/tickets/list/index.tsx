import { api } from "@/utils/api";
import TicketsListItem, { TicketsListItemProps } from "./Item";

import { FaPlus } from "react-icons/fa";
import { useCreateTicketModal } from "../modals/Create";
import { useTicketContext } from "@/context/tickets";

export default function TicketsList() {
  const { data: tickets } = api.ticket.getAll.useQuery(undefined, {
    refetchInterval: 3000,
  });

  const openCreateTicketModal = useCreateTicketModal();

  const { deselectTicket } = useTicketContext();

  return (
    <div className="flex min-w-[350px] flex-col items-center border-r-[1px] shadow-md">
      <div
        className="flex h-[50px] w-full items-center justify-between border-b-[1px] p-4"
        onClick={deselectTicket}
      >
        <h1 className="select-none font-bold text-primary">Your tickets</h1>
        <FaPlus
          size="35px"
          className=" cursor-pointer rounded-full border-2 border-primary p-2 text-primary hover:bg-primary hover:text-white hover:shadow-xl"
          onClick={openCreateTicketModal}
        />
      </div>

      {tickets && tickets.length ? (
        tickets.map((ticket, i) => (
          <TicketsListItem key={i} {...(ticket as TicketsListItemProps)} />
        ))
      ) : (
        <div className="flex h-full w-full flex-col items-center justify-center">
          <h1 className="mb-2 select-none">No tickets to show</h1>
          <button className="btn btn-primary" onClick={openCreateTicketModal}>
            Create a ticket
          </button>
        </div>
      )}
    </div>
  );
}
