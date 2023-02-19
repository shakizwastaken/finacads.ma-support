import { MouseEventHandler, PropsWithChildren } from "react";
import { useModal } from "@/context/modal";
import { ModalProps } from "./types";

export interface ConfirmActionModalProps extends ModalProps {
  onCancel: MouseEventHandler<HTMLButtonElement>;
  onSubmit: MouseEventHandler<HTMLButtonElement>;
}

export default function ConfirmActionModal({
  onCancel,
  onSubmit,
  className,
}: ConfirmActionModalProps) {
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
      <h1 className="text-2xl font-bold text-dark">
        Are you sure you want to do this ?
      </h1>
      <div className="flex  items-center justify-end gap-4">
        <button className="btn btn_cancel" onClick={handleCancel}>
          Cancel
        </button>
        <button className="btn btn_accent" onClick={handleSubmit}>
          Confirm
        </button>
      </div>
    </div>
  );
}

export const useConfirmAction = (props: ConfirmActionModalProps) => {
  const { openModal } = useModal();
  return () => {
    openModal(<ConfirmActionModal {...props} />);
  };
};
