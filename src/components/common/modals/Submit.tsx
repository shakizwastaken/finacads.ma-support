import { MouseEventHandler, PropsWithChildren, ReactNode } from "react";
import { ModalProps } from "./types";

export interface SubmitModalProps extends PropsWithChildren, ModalProps {
  onCancel: MouseEventHandler<HTMLButtonElement>;
  onSubmit: MouseEventHandler<HTMLButtonElement>;
}

export default function SubmitModal({
  onCancel,
  onSubmit,
  children,
  className,
}: SubmitModalProps) {
  const handleSubmit: MouseEventHandler<HTMLButtonElement> = (e) => {
    onSubmit(e);
  };

  const handleCancel: MouseEventHandler<HTMLButtonElement> = (e) => {
    onCancel(e);
  };

  return (
    <div
      className={`flex w-screen flex-col overflow-y-auto bg-light px-6 py-4 text-white shadow-md md:w-[50vw] md:rounded-md ${className}`}
    >
      {children}

      <div className="flex  items-center justify-end gap-4">
        <button className="btn btn_cancel" onClick={handleCancel}>
          Cancel
        </button>
        <button className="btn btn_accent" onClick={handleSubmit}>
          Create
        </button>
      </div>
    </div>
  );
}
