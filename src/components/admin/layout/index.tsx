import HeaderNavLayout from "@/components/headerNav/layout";
import { PropsWithChildren, useEffect, useState } from "react";
import { useAuth } from "@/context/auth/hooks";
import AdminSidebar from "../sidebar";
import { User } from "@prisma/client";
import Router from "next/router";

export interface AdminLayoutProps extends PropsWithChildren {
  className?: string;
}

export default function AdminLayout({ children, className }: AdminLayoutProps) {
  const {
    authState: { user },
    loading,
  } = useAuth();

  const [isAllowed, setAllowed] = useState<true | false>(false);

  useEffect(() => {
    if (user) {
      const { roles } = user as User;
      roles?.includes("ADMIN") ? setAllowed(true) : setAllowed(false);
    } else setAllowed(false);
  }, [loading]);

  if (!isAllowed)
    return (
      <>
        Not allowed to access,
        <a className="text-blue-500" href="/dashboard">
          click here
        </a>
      </>
    );

  return (
    <HeaderNavLayout className="flex h-full">
      <AdminSidebar />
      <div
        className={`flex h-full w-full flex-col gap-2 py-2 px-4 ${
          className || ""
        }`}
      >
        {children}
      </div>
    </HeaderNavLayout>
  );
}
