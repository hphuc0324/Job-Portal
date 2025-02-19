import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useParams } from 'react-router-dom';
import { BriefcaseBusiness, Building2, Calendar } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { X } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import CompanyAvatar from '@/components/company-avatar';
import JobCard, { Job } from '@/components/job-card';
import JobList from '@/components/job-list';
import { Key, useState } from 'react';
import EditableSection from '@/components/editable-section';
import UserExperience, { Experience } from '@/components/user-experience';
import { Pencil, Plus } from 'lucide-react';
import UserExperienceSection from '@/components/user-experience-section';

const job: Job = {
  title: 'Software Engineer',
  location: 'Vietnam',
  experience: 5,
  slug: 'software-engineer',
  type: 'partime',
  salary: 32,
  description:
    'Lorem ipsum dolor sit amet ctetur adipisicing elit. Voluptatem, alias. Quas, quae. Quisquam, Lorem ipsum dolor sit amet ctetur adipisicing elit. Voluptatem, alias. Quas, quae. Quisquam, voluptat',
  requirement:
    'Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem, alias. Quas, quae. Quisquam, voluptate',
  benefit: 'something',
  status: 'active',
  level: 'Intern',
};

const experience: Experience = {
  role: 'Developer',
  startDate: new Date('2020-09-09'),
  isCurrentlyWorking: true,
  company: 'google',
  location: 'Vietnam',
};

const SkillsSection = ({ tempValue, setTempValue }: any) => {
  const [newSkill, setNewSkill] = useState<string>('');

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      if (!newSkill.trim()) {
        return;
      }
      addSkill();
      setNewSkill(''); // Clear input after adding skill
    }
  };

  const addSkill = () => {
    if (tempValue.skills.includes(newSkill.trim())) {
      return; // Avoid adding duplicate skill
    }

    setTempValue({ ...tempValue, skills: [...tempValue.skills, newSkill.trim()] }); // Update global state
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
                setTempValue({ ...tempValue, skills: updatedSkills }); // Remove skill globally
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

function ProfilePage() {
  const { id } = useParams();
  const [editing, setEditing] = useState<string | null>(null);
  const [data, setData] = useState({
    about:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit . Voluptatem, alias. Quas, quae. Quisquam, voluptate',
    skills: ['javascript', 'html', 'css'],
    experience: [experience, experience],
  });

  return (
    <div className="max-w-screen-lg w-screen mx-auto px-2">
      <div className="w-full max-w-full">
        <div className="bg-red-300 h-32 relative mb-16">
          <div className="absolute -bottom-12 left-4">
            {/* <Avatar className="w-36 h-36 border-solid border-[6px] border-white">
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar> */}
            <CompanyAvatar size="large" avatarUrl="https://github.com/shadcn.png" />
          </div>
        </div>

        {/* Info */}
        <div>
          <h2 className="font-bold text-[28px] my-1">Marshal</h2>
          <div className="flex items-center gap-2">
            <BriefcaseBusiness size={24} />
            <h1>Job title: Software Engineer</h1>
          </div>

          <div className="flex items-center gap-2 my-1">
            <Building2 size={24} />
            <h1>Location: Ho Chi Minh City, Vietnam</h1>
          </div>

          <div className="flex items-center gap-2 my-1">
            <Calendar size={24} />
            <h1>Experience: 5 years</h1>
          </div>
        </div>

        <Separator className="my-8" />

        <Tabs defaultValue="about">
          <TabsList>
            <TabsTrigger value="about" className="text-md font-bold">
              About
            </TabsTrigger>
            <TabsTrigger value="jobs" className="text-md font-bold">
              Jobs
            </TabsTrigger>
          </TabsList>
          <TabsContent value="about">About</TabsContent>
          <TabsContent value="jobs">
            <JobList jobs={[job, job, job]} />
          </TabsContent>
        </Tabs>

        <EditableSection
          isEditing={editing === 'about'}
          initialValue={{ about: data.about }}
          renderViewing={() => (
            <div>
              <h2 className="font-bold text-[24px] my-1">About</h2>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit . Voluptatem, alias. Quas, quae. Quisquam,
                voluptate
              </p>
            </div>
          )}
          renderEditing={(tempValue, setTempValue) => (
            <div>
              <h2 className="font-bold text-[24px] my-1">About</h2>
              <textarea
                className="w-full h-32 outline-black focus:outline-none border-solid border-[2px] border-black p-2 rounded-sm resize-none"
                defaultValue={tempValue.about}
                onChange={(e) => setTempValue(e.target.value)}
              />
            </div>
          )}
          handleCancel={() => setEditing(null)}
          handleSave={() => {}}
          handleEdit={() => setEditing('about')}
        />

        <Separator className="my-8" />

        <EditableSection
          isEditing={editing === 'skills'}
          initialValue={{ skills: data.skills }}
          renderViewing={() => (
            <div>
              <h2 className="font-bold text-[24px] my-1">Skills</h2>
              <p className="flex gap-2 flex-wrap">
                {data.skills.map((skill, index) => (
                  <span key={index} className="min-w-8 text-center text-sm bg-black text-white py-1 px-2 rounded-full">
                    {skill.trim()}
                  </span>
                ))}
              </p>
            </div>
          )}
          renderEditing={(tempValue, setTempValue) => (
            <SkillsSection tempValue={tempValue} setTempValue={setTempValue} />
          )}
          handleCancel={() => setEditing(null)}
          handleSave={() => {}}
          handleEdit={() => setEditing('skills')}
        />

        <Separator className="my-8" />

        {/* Experience */}
        <UserExperienceSection experiences={data.experience} />
      </div>
    </div>
  );
}

export default ProfilePage;
