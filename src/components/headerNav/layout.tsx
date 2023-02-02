import { PropsWithChildren } from "react";
import HeaderNav from ".";

export interface HeaderNavLayoutProps extends PropsWithChildren {
  className?: string;
}
export default function HeaderNavLayout({
  children,
  className,
}: HeaderNavLayoutProps) {
  return (
    <div className="flex h-screen w-screen flex-col items-center">
      <HeaderNav />
      <div className={`w-full ${className}`}>{children}</div>
    </div>
  );
}
