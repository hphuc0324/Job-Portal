import { useParams } from 'react-router-dom';
import { BriefcaseBusiness, Building2, Calendar } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { X } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import UserAvatar from '@/components/user-avatar';
import JobList from '@/components/job-list';
import { useEffect, useState } from 'react';
import EditableSection from '@/components/editable-section';
import UserExperienceSection from '@/components/user-experience-section';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { AxiosError } from 'axios';
import userApi from '@/apis/user-api';
import { useToast } from '@/hooks/use-toast';
import { Roles } from '@/types/schemas/register';
import { Experience } from '@/types/dtos';
import { Job } from '@/types/dtos';

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
  company: {
    id: '09df2327-a1e3-4f90-a8b4-728e3039eaa4',
    name: 'Google',
    role: Roles.EMPLOYER,
  },
};

const experience: Experience = {
  role: 'Developer',
  startDate: new Date('2020-09-09'),
  isCurrentlyWorking: true,
  company: {
    id: '09df2327-a1e3-4f90-a8b4-728e3039eaa4',
    name: 'Google',
    role: Roles.EMPLOYER,
  },
  location: 'Vietnam',
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

function ProfilePage() {
  const { id } = useParams();
  const [editing, setEditing] = useState<string | null>(null);
  const [data, setData] = useState({
    job: 'Developer',
    location: 'Vietnam',
    yearExperience: 5,
    about:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit . Voluptatem, alias. Quas, quae. Quisquam, voluptate',
    skills: ['javascript', 'html', 'css'],
    experiences: [experience, experience],
    role: 'applicant',
  });
  const { toast } = useToast();

  const [companies, setCompanies] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const [companiesRes, userDetailRes] = await Promise.all([
        userApi.getUsers({ role: Roles.CANDIDATE }, 0, 100),
        userApi.getUserDetails(id ? id : ''),
      ]);

      setCompanies(companiesRes.data.data.content);
      setData({ ...userDetailRes.data.data, skills: userDetailRes.data.data?.skills?.split(',') });

      console.log(userDetailRes);
    };

    fetchData();
  }, []);

  const handleUpdateProfile = async (data: any) => {
    try {
      const submitData = {
        ...data,
      };
      if (data.skills) {
        submitData.skills = data.skills.toString();
      }

      const res = await userApi.updateProfile(submitData, '69ef218b-1f26-4193-a6f6-9e45e9170b14');

      toast({
        title: 'Update profile successfully',
      });

      console.log(res);
    } catch (error: AxiosError | any) {
      console.log(error.message);
    }
  };

  return (
    <div className="max-w-screen-lg w-screen mx-auto px-2">
      <div className="w-full max-w-full">
        <div className="bg-red-300 h-32 relative mb-16">
          <div className="absolute -bottom-12 left-4">
            <UserAvatar size="large" avatarUrl="https://github.com/shadcn.png" type="employer" />
          </div>
        </div>

        {/* Info */}
        <h2 className="font-bold text-[28px] my-1">Marshal</h2>

        <EditableSection
          isEditing={editing === 'info'}
          initialValue={{
            job: data.job,
            location: data.location,
            yearExperience: data.yearExperience,
          }}
          renderViewing={() => (
            <div>
              <div className="flex items-center gap-2">
                <BriefcaseBusiness size={24} />
                <h1>Job title: {data.job}</h1>
              </div>

              <div className="flex items-center gap-2 my-1">
                <Building2 size={24} />
                <h1>Location: {data.location}</h1>
              </div>

              <div className="flex items-center gap-2 my-1">
                <Calendar size={24} />
                <h1>Experience: {data.yearExperience} years</h1>
              </div>
            </div>
          )}
          renderEditing={(tempValue, setTempValue) => <InfoSection tempValue={tempValue} setTempValue={setTempValue} />}
          handleCancel={() => setEditing(null)}
          handleSave={handleUpdateProfile}
          handleEdit={() => setEditing('info')}
        />

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
          handleSave={handleUpdateProfile}
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
          handleSave={handleUpdateProfile}
          handleEdit={() => setEditing('skills')}
        />

        <Separator className="my-8" />

        {/* Experience */}
        <UserExperienceSection experiences={data.experiences} companies={companies} />
      </div>
    </div>
  );
}

export default ProfilePage;
