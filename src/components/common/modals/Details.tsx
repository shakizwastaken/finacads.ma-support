import { MouseEventHandler, PropsWithChildren, ReactNode } from "react";
import { ModalProps } from "./types";

export interface DetailsModalProps extends PropsWithChildren, ModalProps {
  onClose: MouseEventHandler<HTMLButtonElement>;
}

export default function DetailsModal({
  onClose,
  children,
  className,
}: DetailsModalProps) {
  const handleClose: MouseEventHandler<HTMLButtonElement> = (e) => {
    onClose(e);
  };

  return (
    <div
      className={`flex w-screen flex-col overflow-y-auto bg-light px-6 py-4 text-white shadow-md md:w-[50vw] md:rounded-md ${className}`}
    >
      {children}

      <div className="flex  items-center justify-end gap-4">
        <button className="btn btn_accent" onClick={handleClose}>
          Close
        </button>
      </div>
    </div>
  );
}
