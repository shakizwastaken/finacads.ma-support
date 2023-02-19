import { api } from "@/utils/api";
import OrganizationCard from "./Card";

export default function OrganizationCards() {
  const { data: organizations } = api.organization.all.useQuery();

  const mapOrganizations = () => {
    if (!organizations || !organizations.length) {
      return <h1>no organization</h1>;
    }

    return organizations.map((organization, i) => (
      <OrganizationCard key={i} {...organization} />
    ));
  };

  return (
    <div className="flex h-full w-full flex-wrap gap-4">
      {mapOrganizations()}
    </div>
  );
}
