import Logo from "../common/Logo";

export default function HeaderNav() {
  return (
    <nav className="justify -between sticky top-0 left-0 flex h-[75px] w-full items-center border-b-[1px] bg-white p-4">
      <Logo className="max-w-[110px]" />
    </nav>
  );
}
