import HeaderNavLayout from "@/components/headerNav/layout";
import Tickets from "@/components/tickets";

export default function dashboardHomePage() {
  return (
    <HeaderNavLayout className="flex h-full w-full flex-col items-center justify-center gap-2">
      <Tickets />
    </HeaderNavLayout>
  );
}
