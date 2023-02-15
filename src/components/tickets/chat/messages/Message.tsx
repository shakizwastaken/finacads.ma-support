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
  senderId,
}: TicketChageMessageProps) {
  const {
    authState: { user },
  } = useAuth();

  return (
    <div
      className={`flex w-full flex-col justify-center `}
      style={{ placeItems: `${isSender ? "flex-end" : "flex-start"}` }}
    >
      <div
        className={`w-[250px] rounded-md bg-gray-300 py-2 px-4 font-normal ${
          isSender ? "" : ""
        }`}
      >
        <p>{content}</p>
      </div>

      <h1 className="m-0 text-xs">sent at {createdAt.toLocaleDateString()}</h1>
    </div>
  );
}
