import Profile from "@/components/common/Profile";
import { useTicketContext } from "@/context/tickets";
import { Customer, Ticket, User } from "@prisma/client";

import { BiDotsVerticalRounded } from "react-icons/bi";

export interface TicketsListItemProps extends Ticket {
  customer: Customer;
  createdBy: User;
}

export default function TicketsListItem({
  id,
  title,
  description,
  customer: { name, picture },
}: TicketsListItemProps) {
  const { setActiveTicket, activeTicket } = useTicketContext();

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

      <div className="flex items-center justify-center rounded-full p-2 hover:bg-slate-400 hover:bg-opacity-25 hover:shadow-md">
        <BiDotsVerticalRounded />
      </div>
    </div>
  );
}
