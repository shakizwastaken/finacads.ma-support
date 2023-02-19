import { useAuth } from "@/context/auth/hooks";
import { Message, User } from "@prisma/client";

export interface TicketChageMessageProps extends Message {
  isSender: boolean;
  sender: User | null;
}

export default function TicketChatMessage({
  isSender,
  content,
  createdAt,
  sender,
}: TicketChageMessageProps) {
  const {
    authState: { user },
  } = useAuth();

  return (
    <div
      className={`flex w-full flex-col justify-center `}
      style={{ placeItems: `${isSender ? "flex-end" : "flex-start"}` }}
    >
      <div className="flex gap-2">
        {!isSender && (
          <div
            className={`flex h-[30px] w-[30px] items-center justify-center overflow-hidden rounded-full bg-gray-200`}
          >
            <img
              src={sender?.picture || ""}
              alt={`${sender?.firstName}'s profile picture`}
              className="h-[30px] w-[30px]"
            />
          </div>
        )}
        <div
          className="group flex flex-col"
          style={{ alignItems: isSender ? "flex-end" : "flex-start" }}
        >
          <h1 className="m-0 w-full font-medium">
            {isSender ? "You" : `${sender?.firstName} ${sender?.lastName}`}
          </h1>
          <div
            className={`w-[250px] rounded-md bg-gray-300 py-2 px-4 font-normal`}
          >
            <p>{content}</p>
          </div>
          <h1 className="-z-10 m-0 -translate-y-[100%] text-xs transition-all ease-in-out group-hover:translate-y-0 ">
            sent at {createdAt.toLocaleDateString()}
          </h1>
        </div>
      </div>
    </div>
  );
}
