import {
  createContext,
  PropsWithChildren,
  useState,
  useContext,
  useEffect,
} from "react";
import { TicketContextState, TicketState } from "./types";

const initialState: TicketState = {
  activeTicket: null,
};

export const ticketContext = createContext<TicketContextState>({
  ...initialState,
  setActiveTicket: () => null,
  deselectTicket: () => null,
  // registerOnSwitchEvent: () => null,
});

export const TicketContextProvider = ({ children }: PropsWithChildren) => {
  const [activeTicket, setActiveTicket] = useState<string | null | undefined>();
  const deselectTicket = () => setActiveTicket(null);

  const [onSwitchEvents, setOnSwitchEvents] = useState<
    ((activeTicket?: string | null) => any)[]
  >([]);

  // const registerOnSwitchEvent = (
  //   handler: (activeTicket?: string | null) => any
  // ) => {
  //   setOnSwitchEvents((events) => [...events, handler]);
  // };

  // useEffect(() => {
  //   onSwitchEvents.forEach((event) => {
  //     event(activeTicket);
  //   });
  // }, [activeTicket]);

  return (
    <ticketContext.Provider
      value={{
        activeTicket,
        setActiveTicket,
        deselectTicket,
        // registerOnSwitchEvent,
      }}
    >
      {children}
    </ticketContext.Provider>
  );
};

export const useTicketContext = () => useContext(ticketContext);
