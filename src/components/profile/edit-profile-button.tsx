import { useOpenProfileEditorModal } from "@/store/profile-editor-modal";
import { Button } from "../ui/button";

export default function EditProfileButton() {
  const opnProfileEditorModal = useOpenProfileEditorModal();

  return (
    <Button
      onClick={opnProfileEditorModal}
      variant={"secondary"}
      className="cursor-pointer"
    >
      프로필 수정
    </Button>
  );
}
