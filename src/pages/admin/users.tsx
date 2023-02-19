import AdminLayout from "@/components/admin/layout";
import { useOpenAdminCreateUserModal } from "@/components/admin/modals/CreateUser";
import AdminUserCards from "@/components/admin/users/cards/Cards";

export default function AdminUsersPage() {
  const handleCreate = useOpenAdminCreateUserModal();

  return (
    <AdminLayout>
      <div className="flex w-full items-center justify-between">
        <h1 className="select-none text-2xl font-bold">Users:</h1>
        <button className="btn btn-primary" onClick={handleCreate}>
          Add user
        </button>
      </div>
      
      <AdminUserCards />
    </AdminLayout>
  );
}
