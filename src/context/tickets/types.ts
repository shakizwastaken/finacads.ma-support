import { Dispatch, SetStateAction } from "react";

export interface TicketState {
  activeTicket?: string | null;
}
export interface TicketContextState extends TicketState {
  setActiveTicket: Dispatch<SetStateAction<string | null | undefined>>;
  deselectTicket: () => any;
  // registerOnSwitchEvent: (
  //   handler: (activeTicket?: string | null) => any
  // ) => any;
}
