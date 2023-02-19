import { api } from "@/utils/api";
import AdminUserCard from "./Card";

export default function AdminUserCards() {
  const { data: users } = api.user.all.useQuery();

  const mapUsers = () => {
    if (!users) return <h1>No users</h1>;

    return users.map((user, i) => <AdminUserCard key={i} {...user} />);
  };

  return (
    <table>
      <tr>
        <th className="s flex-1 text-start text-xl">First Name</th>
        <th className="flex-1 text-start text-xl">Last Name</th>
        <th className="flex-1 text-start text-xl">Email</th>
        <th className="flex-1 text-start text-xl">Number</th>
        <th className="flex-1 text-center text-xl">Disabled</th>
        <th className="flex-1 text-center text-xl"></th>
      </tr>

      {mapUsers()}
    </table>
  );
}
