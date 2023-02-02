import { getErrMessage } from "@/utils/errorHandling";
import { PropsWithChildren } from "react";
import Logo from "../common/Logo";

export interface AuthLayoutProps extends PropsWithChildren {
  err?: any;
}

export default function AuthLayout({ children, err }: AuthLayoutProps) {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-2">
      <Logo scale="50%" />
      <div className="flex flex-col items-center justify-center gap-4 rounded-md border-2 border-dark p-4">
        {err && (
          <h1 className="m-0 w-full rounded-md bg-red-500 p-2 text-center text-white">
            {getErrMessage(err)}
          </h1>
        )}

        {children}
      </div>

      <h1 className="text-xs">
        {"Having issues ? "}
        <a
          className="cursor-pointer text-primary"
          onClick={() => {
            console.log("Contact support");
          }}
        >
          Contact support
        </a>
      </h1>
    </div>
  );
}
