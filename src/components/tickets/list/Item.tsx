import { Customer, Ticket, User } from "@prisma/client";

export interface TicketsListItemProps extends Ticket {
  customer: Customer;
  createdBy: User;
}

export default function TicketsListItem({ ...props }: TicketsListItemProps) {
  return <div>Item</div>;
}
