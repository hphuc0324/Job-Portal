import { useEffect, useState } from 'react';
import UserExperience from './user-experience';
import { Pencil, Plus, Trash } from 'lucide-react';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import DatePicker from './form-input/date-picker';
import { Checkbox } from './ui/checkbox';
import { Button } from './ui/button';
import { User } from '@/types/dtos';
import { Experience } from '@/types/dtos';
import lodash from 'lodash';

interface UserExperienceSectionProps {
  experiences: Experience[];
  companies: User[];
  onSubmit: (experiences: Experience[]) => void;
  allowEdit?: boolean;
}

interface ExperienceEditorProps {
  index: number;
  experience: Experience;
  companies: User[];
  setExperience: (index: number, field: string, value: any) => void;
  onCancel: () => void;
  onSubmit: () => void;
}

const ExperienceEditor = ({
  index,
  experience,
  setExperience,
  onCancel,
  onSubmit,
  companies,
}: ExperienceEditorProps) => {
  return (
    <div className="w-full">
      <div className="w-full grid grid-cols-1 md:grid-cols-3 md:gap-4 items-center">
        <div className="space-y-1">
          <Label htmlFor="role">Role</Label>
          <Input
            id="role"
            placeholder="Role"
            onChange={(e) => setExperience(index, 'role', e.target.value)}
            value={experience.role || ''}
            className="border-solid border-black border-[1px] w-full"
          />
        </div>
        <div className="space-y-1">
          <Label htmlFor="location">Location</Label>
          <Input
            id="location"
            placeholder="Location"
            onChange={(e) => setExperience(index, 'location', e.target.value)}
            value={experience.location || ''}
            className="border-solid border-black border-[1px] "
          />
        </div>
        <div className="space-y-1">
          <Label htmlFor="company">Company</Label>
          <Select value={experience.company.id} onValueChange={(value) => setExperience(index, 'company.id', value)}>
            <SelectTrigger id="company" className="border-solid border-black border-[1px]">
              <SelectValue placeholder="Company" />
            </SelectTrigger>
            <SelectContent>
              {companies.map((company) => (
                <SelectItem key={company.id} value={company.id}>
                  {company.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-1">
          <Label htmlFor="company">Start Date</Label>
          <DatePicker
            className="border-black border-[1px]"
            date={experience.startDate}
            onSelect={(date) => setExperience(index, 'startDate', date)}
          />
        </div>
        <div className="space-y-1">
          <Label htmlFor="company">End Date</Label>
          <DatePicker
            className="border-black border-[1px] flex-1 w-full"
            date={experience.endDate}
            onSelect={(date) => setExperience(index, 'endDate', date)}
          />
        </div>
        <div></div>
        <div className="space-y-1 h-full flex items-center gap-2">
          <Checkbox
            id="current"
            checked={experience.isCurrentlyWorking}
            onCheckedChange={(checked) => setExperience(index, 'isCurrentlyWorking', checked)}
          />
          <Label
            htmlFor="current"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Currently working here
          </Label>
        </div>
      </div>

      <div className="space-x-2 my-2">
        <Button onClick={onSubmit}>Save</Button>
        <Button variant="destructive" onClick={onCancel}>
          Cancel
        </Button>
      </div>
    </div>
  );
};

function UserExperienceSection({ experiences, companies, onSubmit, allowEdit = false }: UserExperienceSectionProps) {
  const [tempValue, setTempValue] = useState<Experience[]>(experiences);
  const [isEditTing, setIsEditing] = useState<number | null>(null);

  useEffect(() => {
    if (isEditTing == null) {
      setTempValue(experiences);
    }
  }, [experiences, isEditTing]);

  const handleCancel = () => {
    setIsEditing(null);
    setTempValue(experiences);
  };

  const handleEdit = (index: number) => {
    setIsEditing(index);
  };

  const handleAddExperience = () => {
    setTempValue((prev) => [
      {
        role: '',
        startDate: new Date(),
        isCurrentlyWorking: false,
        company: {
          id: '',
          name: '',
          job: '',
          location: '',
          experience: '',
          avatarUrl: '',
          role: '',
          about: '',
          skills: '',
        },
        location: '',
      },
      ...prev,
    ]);
    setIsEditing(0);
  };

  const handleEditExperience = (index: number, field: string, value: any) => {
    setTempValue((prev) => {
      const newState = [...prev];
      lodash.set(newState[index], field, value);
      return newState;
    });
  };

  const handleSubmit = async () => {
    setIsEditing(null);
    await onSubmit(tempValue);
  };

  const handleRemoveExperience = async (index: number) => {
    const temp = tempValue.filter((_, i) => i !== index);

    setTempValue(temp);

    await onSubmit(temp);
    setIsEditing(null);
  };

  return (
    <div>
      <div className="my-4 relative">
        <h2 className="font-bold text-[24px] my-1">Experience</h2>
        {allowEdit && (
          <button className="absolute right-0 top-0 cursor-pointer">
            <Plus onClick={handleAddExperience} className="text-yellow-500" />
          </button>
        )}
      </div>
      <div>
        {tempValue.map((experience, index) => (
          <div key={index} className="flex items-start gap-4 my-2">
            {isEditTing !== index && (
              <>
                <UserExperience experience={experience} />
                {allowEdit && (
                  <div className="flex gap-2 items-center">
                    <button onClick={() => handleEdit(index)}>
                      <Pencil className="w-4 h-4 text-gray-400" />
                    </button>
                    <button onClick={() => handleRemoveExperience(index)}>
                      <Trash className="w-4 h-4 text-gray-400" />
                    </button>
                  </div>
                )}
              </>
            )}

            {isEditTing === index && (
              <ExperienceEditor
                index={isEditTing}
                experience={experience}
                companies={companies}
                onCancel={handleCancel}
                setExperience={handleEditExperience}
                onSubmit={handleSubmit}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default UserExperienceSection;
