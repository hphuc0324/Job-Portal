import { ReactNode, useState, useEffect } from 'react';
import { Pencil, Check, X } from 'lucide-react';

interface EditableSectionProps {
  renderViewing: () => ReactNode;
  renderEditing: (tempValue: any, setTempValue: React.Dispatch<any>) => ReactNode;
  handleSave: (data: object) => void;
  handleCancel: () => void;
  handleEdit: () => void;
  isEditing: boolean;
  initialValue: any;
}

function EditableSection({
  isEditing,
  initialValue,
  renderViewing,
  renderEditing,
  handleEdit,
  handleSave,
  handleCancel,
}: EditableSectionProps) {
  const [tempValue, setTempValue] = useState(initialValue);

  useEffect(() => {
    if (isEditing) {
      setTempValue(initialValue);
    }
  }, [initialValue, isEditing]);

  return (
    <div className="relative">
      {isEditing ? renderEditing(tempValue, setTempValue) : renderViewing()}

      <div className="absolute right-0 top-0">
        {isEditing ? (
          <div className="flex items-center gap-1 ">
            <button onClick={() => handleSave(tempValue)}>
              <Check className="text-green-500 w-5 h-5" />
            </button>
            <button onClick={handleCancel}>
              <X className="text-red-500 w-5 h-5" />
            </button>
          </div>
        ) : (
          <button onClick={handleEdit}>
            <Pencil className="text-yellow-500 w-5 h-5" />
          </button>
        )}
      </div>
    </div>
  );
}

export default EditableSection;
