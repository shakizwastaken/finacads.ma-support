import AdminLayout from "@/components/admin/layout";
import { useOpenAdminCreateOrganizationModal } from "@/components/admin/modals/CreateOrganization";
import OrganizationCards from "@/components/admin/organizations/Cards";

export default function AdminOrganizationsPage() {
  const createOpenCreateModal = useOpenAdminCreateOrganizationModal();

  return (
    <AdminLayout>
      <div className="flex w-full items-center justify-between">
        <h1 className="select-none text-2xl font-bold">Organizations:</h1>
        <button className="btn btn-primary" onClick={createOpenCreateModal}>
          Create
        </button>
      </div>

      <OrganizationCards />
    </AdminLayout>
  );
}
