import { useConfirmAction } from "@/components/common/modals/Confirm";
import { useModal } from "@/context/modal";
import { api } from "@/utils/api";
import { User } from "@prisma/client";
import { BiLockOpen, BiTrash } from "react-icons/bi";

export interface UserCardProps extends User {}

export default function AdminUserCard({
  id,
  firstName,
  lastName,
  email,
  displayNumber,
  disabled,
}: UserCardProps) {
  const { closeModal } = useModal();
  let utils = api.useContext();
  const { mutate } = api.user.toggle.useMutation({
    onSuccess() {
      closeModal();
      utils.user.invalidate();
    },
  });
  const toggleUser = useConfirmAction({
    onSubmit() {
      mutate({ id });
    },
    onCancel() {
      closeModal();
    },
  });

  return (
    <tr>
      <td>{firstName}</td>
      <td>{lastName}</td>
      <td>{email}</td>
      <td>{displayNumber ? displayNumber : "No number"}</td>
      <td className="text-center">{disabled ? "true" : "false"}</td>
      <td className="flex items-center justify-center">
        {disabled ? (
          <button className="btn btn_primary" onClick={toggleUser}>
            <BiLockOpen />
          </button>
        ) : (
          <button className="btn btn_cancel" onClick={toggleUser}>
            <BiTrash />
          </button>
        )}
      </td>
    </tr>
  );
}
