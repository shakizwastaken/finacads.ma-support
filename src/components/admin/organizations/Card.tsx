import { Customer } from "@prisma/client";

export interface OrganizationCardProps extends Customer {}

export default function OrganizationCard({
  id,
  name,
  description,
  picture,
  createdAt,
  updatedAt,
}: OrganizationCardProps) {
  return (
    <div className="flex h-[250px] w-[250px] flex-col gap-2 rounded-md border-2 border-gray-600">
      <img
        src={picture || "https://cdn-icons-png.flaticon.com/512/115/115905.png"}
        className="h-[50%] border-b-2 border-gray-600 p-2"
      />

      <div className="flex flex-1 flex-col items-center justify-center gap-2">
        <h1 className="m-0 text-xl font-medium">{name}</h1>
        <p>{description}</p>
      </div>

      <h1 className="text-center text-xs text-gray-600">{id}</h1>
    </div>
  );
}
