import { api } from "@/utils/api";

export default function AdminDashboard() {
  const { data: tickets } = api.ticket.getAll.useQuery();

  const renderTickets = () =>
    tickets?.map(
      ({ id, title, description, isClosed, createdAt, updatedAt }) => (
        <tr className="h-full py-4 text-center">
          <td>{id}</td>
          <td>{title}</td>
          <td>{description}</td>
          <td>{isClosed ? "Closed" : "Open"}</td>
          <td>{createdAt.toDateString()}</td>
          <td>{isClosed ? updatedAt.toDateString() : "null"}</td>
        </tr>
      )
    );

  return (
    <table className="w-full">
      <thead>
        <tr>
          <th>#</th>
          <th>Title</th>
          <th>Description</th>
          <th>Status</th>
          <th>Creation date</th>
          <th>Closed date</th>
        </tr>
      </thead>
      <tbody>{renderTickets()}</tbody>
    </table>
  );
}
