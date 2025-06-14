import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import React from "react";

const ConfirmModal = ({ 
  isOpen, 
  onClose, 
  onConfirm, 
  title = "Are you sure?", 
  description = "This action cannot be undone.", 
  confirmLabel = "Confirm", 
  cancelLabel = "Cancel", 
  loading = false 
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/30 z-50 flex justify-center items-center">
      <Card className="w-[95%] max-w-md p-6 relative shadow-lg">
        <button 
          onClick={onClose} 
          className="absolute right-3 top-3 text-gray-500 hover:text-black dark:hover:text-white"
        >
          <X size={18} />
        </button>
        <h2 className="text-xl font-semibold mb-2 text-center">{title}</h2>
        <p className="text-sm text-gray-600 dark:text-gray-300 text-center mb-6">
          {description}
        </p>
        <div className="flex justify-end gap-3">
          <Button 
            variant="outline" 
            onClick={onClose} 
            disabled={loading}
          >
            {cancelLabel}
          </Button>
          <Button 
            onClick={onConfirm} 
            disabled={loading}
          >
            {loading ? "Please wait..." : confirmLabel}
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default ConfirmModal;
