import HeaderNavLayout from "@/components/headerNav/layout";
import AdminSidebar from "../sidebar";
import { PropsWithChildren, useEffect } from "react";
import { useAuth } from "@/context/auth/hooks";

export interface AdminLayoutProps extends PropsWithChildren {
  className?: string;
}

export default function AdminLayout({ children, className }: AdminLayoutProps) {
  const {
    authState: { user },
  } = useAuth();

  useEffect(() => {
    if (user) {
    }
  }, []);

  return (
    <HeaderNavLayout className="flex h-full">
      <AdminSidebar />
      <div
        className={`flex h-full w-full flex-col gap-2 py-2 px-4 ${className}`}
      >
        {children}
      </div>
    </HeaderNavLayout>
  );
}
