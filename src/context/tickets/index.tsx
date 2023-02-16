import {
  createContext,
  PropsWithChildren,
  useState,
  useContext,
  useRef,
} from "react";
import { TicketContextState, TicketState } from "./types";

const initialState: TicketState = {
  activeTicket: null,
};

export const ticketContext = createContext<TicketContextState>({
  ...initialState,
  setActiveTicket: () => null,
  deselectTicket: () => null,
  messagesEnd: null,
  scrollToBottom: () => null,
  // registerOnSwitchEvent: () => null,
});

export const TicketContextProvider = ({ children }: PropsWithChildren) => {
  const [activeTicket, setActiveTicket] = useState<string | null | undefined>();
  const deselectTicket = () => setActiveTicket(null);

  const [onSwitchEvents, setOnSwitchEvents] = useState<
    ((activeTicket?: string | null) => any)[]
  >([]);

  const messagesEnd = useRef<HTMLDivElement | null>(null);

  const scrollToBottom = (
    arg?: boolean | ScrollIntoViewOptions | undefined
  ) => {
    messagesEnd.current?.scrollIntoView(arg);
  };

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
        messagesEnd,
        scrollToBottom,
      }}
    >
      {children}
    </ticketContext.Provider>
  );
};

export const useTicketContext = () => useContext(ticketContext);
