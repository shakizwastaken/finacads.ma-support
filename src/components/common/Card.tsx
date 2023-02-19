import { PropsWithChildren } from "react";

export default function Card({ children }: PropsWithChildren) {
  return <div className="rounded-md">{children}</div>;
}
