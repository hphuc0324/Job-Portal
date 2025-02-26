import { useState } from 'react';

import UserAvatar from '@/components/user-avatar';
import EditableSection from '@/components/editable-section';
import { BriefcaseBusiness, Building2, Calendar, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import UserExperienceSection from '@/components/user-experience-section';
import { Experience, User } from '@/types/dtos';

const SkillsSection = ({ tempValue, setTempValue }: any) => {
  const [newSkill, setNewSkill] = useState<string>('');

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      if (!newSkill.trim()) {
        return;
      }
      addSkill();
      setNewSkill('');
    }
  };

  const addSkill = () => {
    if (tempValue.skills.includes(newSkill.trim())) {
      return;
    }

    setTempValue({ ...tempValue, skills: [...tempValue.skills, newSkill.trim()] });
  };

  return (
    <div>
      <h2 className="font-bold text-[24px] my-1">Skills</h2>
      <div className="flex gap-2 flex-wrap p-4 border-solid border-[2px] border-black rounded-sm">
        {tempValue.skills?.map((skill: string, index: number) => (
          <div
            key={index}
            className="min-w-8 flex items-center gap-2 text-center text-sm bg-black text-white py-1 px-2 rounded-full"
          >
            {skill.trim()}
            <button
              className="rounded-[50%] p-0"
              onClick={() => {
                const updatedSkills = tempValue.skills.filter((s: string) => s !== skill);
                setTempValue({ ...tempValue, skills: updatedSkills });
              }}
            >
              <X size="16px" />
            </button>
          </div>
        ))}
        <input
          autoFocus
          className="focus:outline-none"
          value={newSkill}
          onChange={(e) => setNewSkill(e.target.value)}
          onKeyDown={handleKeyDown}
        />
      </div>
    </div>
  );
};

const InfoSection = ({ tempValue, setTempValue }: any) => {
  return (
    <div className="grid grid-cols-3 gap-3">
      <div>
        <Label htmlFor="job">Job</Label>
        <Input
          id="job"
          placeholder="Job title"
          value={tempValue.job}
          onChange={(e) => setTempValue({ ...tempValue, job: e.target.value })}
          className="border-solid border-black border-[1px] "
        />
      </div>

      <div>
        <Label htmlFor="location">Location</Label>
        <Input
          id="location"
          placeholder="Location"
          value={tempValue.location}
          onChange={(e) => setTempValue({ ...tempValue, location: e.target.value })}
          className="border-solid border-black border-[1px] "
        />
      </div>

      <div>
        <Label htmlFor="yearExperience">Experience</Label>
        <Input
          id="yearExperience"
          placeholder="Year of experience"
          value={tempValue.yearExperience}
          type="number"
          onChange={(e) => setTempValue({ ...tempValue, yearExperience: e.target.value })}
          className="border-solid border-black border-[1px] "
        />
      </div>
    </div>
  );
};

interface ApplicantPageProps {
  data: any;
  handleUpdateProfile: (data: any) => void;
  companies: User[];
  handleUpdateExperience: (experiences: Experience[]) => void;
  isOwner: boolean;
}

function ApplicantPage({ data, handleUpdateProfile, companies, handleUpdateExperience, isOwner }: ApplicantPageProps) {
  const [editing, setEditing] = useState<string | null>(null);

  console.log(data);

  return (
    <div>
      <div className="bg-red-300 h-32 relative mb-16">
        <div className="absolute -bottom-12 left-4">
          <UserAvatar size="large" avatarUrl="https://github.com/shadcn.png" />
        </div>
      </div>
      <h2 className="font-bold text-[28px] my-1">{data.name}</h2>

      <EditableSection
        isEditing={editing === 'info'}
        initialValue={{
          job: data.job,
          location: data.location,
          experience: data.experience,
        }}
        renderViewing={() => (
          <div>
            {!!data.job && (
              <div className="flex items-center gap-2">
                <BriefcaseBusiness size={24} />
                <h1>Job title: {data.job}</h1>
              </div>
            )}

            {!!data.location && (
              <div className="flex items-center gap-2 my-1">
                <Building2 size={24} />
                <h1>Location: {data.location}</h1>
              </div>
            )}

            {!!data.experience && (
              <div className="flex items-center gap-2 my-1">
                <Calendar size={24} />
                <h1>Experience: {data.experience} years</h1>
              </div>
            )}
          </div>
        )}
        renderEditing={(tempValue, setTempValue) => <InfoSection tempValue={tempValue} setTempValue={setTempValue} />}
        handleCancel={() => setEditing(null)}
        handleSave={handleUpdateProfile}
        handleEdit={() => setEditing('info')}
        allowEdit={isOwner}
      />

      <Separator className="my-8" />

      <EditableSection
        isEditing={editing === 'description'}
        initialValue={{ description: data.description }}
        renderViewing={() => (
          <div>
            <h2 className="font-bold text-[24px] my-1">About</h2>
            <p>{data.description}</p>
          </div>
        )}
        renderEditing={(tempValue, setTempValue) => (
          <div>
            <h2 className="font-bold text-[24px] my-1">About</h2>
            <textarea
              className="w-full h-32 outline-black focus:outline-none border-solid border-[2px] border-black p-2 rounded-sm resize-none"
              defaultValue={tempValue.description}
              onChange={(e) => setTempValue({ ...tempValue, description: e.target.value })}
            />
          </div>
        )}
        handleCancel={() => setEditing(null)}
        handleSave={handleUpdateProfile}
        handleEdit={() => setEditing('description')}
        allowEdit={isOwner}
      />

      <Separator className="my-8" />

      <EditableSection
        isEditing={editing === 'skills'}
        initialValue={{ skills: data.skills }}
        renderViewing={() => (
          <div>
            <h2 className="font-bold text-[24px] my-1">Skills</h2>
            <p className="flex gap-2 flex-wrap">
              {data.skills.map((skill: string, index: number) => (
                <span key={index} className="min-w-8 text-center text-sm bg-black text-white py-1 px-2 rounded-full">
                  {skill.trim()}
                </span>
              ))}
            </p>
          </div>
        )}
        renderEditing={(tempValue, setTempValue) => <SkillsSection tempValue={tempValue} setTempValue={setTempValue} />}
        handleCancel={() => setEditing(null)}
        handleSave={handleUpdateProfile}
        handleEdit={() => setEditing('skills')}
        allowEdit={isOwner}
      />

      <Separator className="my-8" />

      <UserExperienceSection
        experiences={data.experiences}
        companies={companies}
        onSubmit={handleUpdateExperience}
        allowEdit={isOwner}
      />
    </div>
  );
}

export default ApplicantPage;
