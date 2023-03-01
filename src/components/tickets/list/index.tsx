import { api } from "@/utils/api";
import TicketsListItem, { TicketsListItemProps } from "./Item";

import { FaPlus } from "react-icons/fa";
import { useCreateTicketModal } from "../modals/Create";
import { useTicketContext } from "@/context/tickets";
import { useState } from "react";

export enum TicketFilter {
  OPEN = "OPEN",
  ALL = "ALL",
  CLOSED = "CLOSED",
}

export default function TicketsList() {
  const utils = api.useContext();

  const filters: { label: string; value: TicketFilter }[] = [
    {
      label: "Open",
      value: TicketFilter.OPEN,
    },
    {
      label: "Closed",
      value: TicketFilter.CLOSED,
    },
    {
      label: "All",
      value: TicketFilter.ALL,
    },
  ];
  const [selectedFilter, setSelectedFilter] = useState({
    label: "Open",
    value: TicketFilter.OPEN,
  });
  const { data: tickets } = api.ticket.getAll.useQuery(undefined, {
    refetchInterval: 3000,
  });

  const mapFilters = () =>
    filters.map(({ label, value }) => {
      const handleClick = () => {
        if (selectedFilter.value === value) return;
        setSelectedFilter({ label, value });
      };

      return (
        <div
          className={`h-full w-full flex-1 cursor-pointer select-none border-[1px] p-2 text-center hover:bg-slate-200 ${
            selectedFilter.value === value && "bg-slate-200"
          }`}
          onClick={handleClick}
        >
          {label}
        </div>
      );
    });

  const openCreateTicketModal = useCreateTicketModal();
  const { deselectTicket } = useTicketContext();

  const mapTickets = () => {
    if (!tickets || !tickets.length)
      return (
        <div className="flex h-full w-full flex-col items-center justify-center">
          <h1 className="mb-2 select-none">No tickets to show</h1>
          <button className="btn btn-primary" onClick={openCreateTicketModal}>
            Create a ticket
          </button>
        </div>
      );

    return (
      tickets
        .filter((ticket) => {
          if (selectedFilter.value === "ALL") return true;
          if (selectedFilter.value === "OPEN") return !ticket.isClosed;
          if (selectedFilter.value === "CLOSED") return ticket.isClosed;
          else return true;
        })

        //@ts-ignore
        .sort((a, b) => b.lastMessage - a.lastMessage)
        .map((ticket, i) => (
          <TicketsListItem key={i} {...(ticket as TicketsListItemProps)} />
        ))
    );
  };

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
      <div className="flex w-full justify-between">{mapFilters()}</div>
      {mapTickets()}
    </div>
  );
}
