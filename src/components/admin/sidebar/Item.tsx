import { ReactNode } from "react";

export interface AdminSidebarItemProps {
  label: string;
  icon: ReactNode;
  onClick?: () => any;
}

export default function AdminSidebarItem({
  label,
  icon,
  onClick,
}: AdminSidebarItemProps) {
  const handleClick = () => onClick && onClick();

  return (
    <div
      className="flex w-full cursor-pointer select-none items-center justify-start gap-2 rounded-md py-2 px-4 hover:bg-gray-200 [&>*]:text-gray-900 "
      onClick={handleClick}
    >
      <div className="[&>*]:h-[20px] [&>*]:w-[20px]">{icon}</div>
      <h1>{label}</h1>
    </div>
  );
}
