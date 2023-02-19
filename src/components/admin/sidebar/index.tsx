import React from "react";
import AdminSidebarItem from "./Item";
import { BiBuilding, BiGroup } from "react-icons/bi";
import Router from "next/router";
import { MdOutlineSpaceDashboard } from "react-icons/md";

export default function AdminSidebar() {
  const handleNavigate = (to: string) => () => Router.push(to);

  return (
    <div className="flex h-full w-fit flex-col justify-between border-r-2 p-2">
      <div className="flex flex-col gap-2">
        <AdminSidebarItem
          label="Dashboard"
          icon={<MdOutlineSpaceDashboard />}
          onClick={handleNavigate("/admin/")}
        />
        <AdminSidebarItem
          label="Organizations"
          icon={<BiBuilding />}
          onClick={handleNavigate("/admin/organizations")}
        />
        <AdminSidebarItem
          label="Users"
          icon={<BiGroup />}
          onClick={handleNavigate("/admin/users")}
        />
      </div>
    </div>
  );
}
