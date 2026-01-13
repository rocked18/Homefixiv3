import { Button } from "./ui/button";

interface DeleteJobModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  jobTitle: string;
}

export function DeleteJobModal({
  isOpen,
  onClose,
  onConfirm,
  jobTitle,
}: DeleteJobModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">
          Delete chat?
        </h2>
        <div className="mb-6">
          <p className="text-gray-700 mb-3">
            This will delete <span className="font-semibold">{jobTitle}</span>.
          </p>
        </div>
        <div className="flex items-center justify-end gap-3">
          <Button
            onClick={onClose}
            variant="outline"
            className="rounded-full px-6"
          >
            Cancel
          </Button>
          <Button
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className="rounded-full px-6 bg-red-600 text-white hover:bg-red-700"
          >
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
}