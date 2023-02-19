import Profile from "@/components/common/Profile";
import { useConfirmAction } from "@/components/common/modals/Confirm";
import { useTicketContext } from "@/context/tickets";
import { Customer, Ticket, User } from "@prisma/client";
import { useEffect, useRef, useState } from "react";
import { useModal } from "@/context/modal";

import { BiDotsVerticalRounded } from "react-icons/bi";
import { api } from "@/utils/api";

export interface TicketsListItemProps extends Ticket {
  customer: Customer;
  createdBy: User;
}

export default function TicketsListItem({
  id,
  title,
  description,
  customer: { name, picture },
  isClosed,
}: TicketsListItemProps) {
  const { setActiveTicket, activeTicket, deselectTicket } = useTicketContext();

  const { closeModal } = useModal();

  const [isOpen, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const handleClickOutside = (event: MouseEvent) => {
    if (ref.current && !ref.current.contains(event.target as Node)) {
      setOpen(false);
    }
  };

  const utils = api.useContext();
  const { mutate: setClosed } = api.ticket.closed.useMutation({
    onSuccess(data) {
      utils.ticket.invalidate();
      if (data?.isClosed) deselectTicket();
      closeModal();
    },
  });

  useEffect(() => {
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, []);

  const confirmCloseTicket = useConfirmAction({
    onSubmit() {
      setClosed({ ticketId: id, value: !isClosed });
    },
    onCancel() {
      closeModal();
    },
  });

  const closeTicket = () => {
    confirmCloseTicket();
  };

  const handleClick = () => {
    setActiveTicket(id);
  };

  return (
    <div
      className={`flex h-[80px] w-full cursor-pointer items-center justify-between gap-4 border-b-2 p-2 hover:bg-light ${
        activeTicket === id && "bg-light"
      }`}
      onClick={handleClick}
    >
      <Profile
        picture={picture || ""}
        size="45px"
        alt={`${name}'s picture`}
        className={"border-2 border-dark"}
      />

      <div className="flex h-full flex-1 flex-col ">
        <h1 className="font-semibold">{title}</h1>
        <h1 className="text-sm">{description}</h1>
      </div>

      <div
        className="relative flex items-center justify-center rounded-full p-2 hover:bg-slate-400 hover:bg-opacity-25 hover:shadow-md"
        onClick={() => {
          setOpen((val) => !val);
        }}
      >
        <BiDotsVerticalRounded />
        <div
          className="absolute top-0 right-0 z-50 my-10 flex flex-col overflow-hidden rounded-md border-[1px] border-dark bg-white shadow-xl"
          style={{ display: isOpen ? "block" : "none" }}
          ref={ref}
        >
          <h1
            className="w-full min-w-max px-4 py-2 hover:bg-dark hover:text-white"
            onClick={closeTicket}
          >
            {isClosed ? "Reopen ticket" : "Close ticket"}
          </h1>
        </div>
      </div>
    </div>
  );
}
