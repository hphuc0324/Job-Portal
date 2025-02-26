import { useParams } from 'react-router-dom';
import { BriefcaseBusiness, Building2, Calendar } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { X } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import UserAvatar from '@/components/user-avatar';
import JobList from '@/components/job-list';
import { useEffect, useState } from 'react';
import EditableSection from '@/components/editable-section';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { AxiosError } from 'axios';
import userApi from '@/apis/user-api';
import { useToast } from '@/hooks/use-toast';
import { Roles } from '@/types/schemas/register';
import { Experience } from '@/types/dtos';
import { Job } from '@/types/dtos';
import ApplicantPage from './applicant-ui';
import EmployerPage from './employer-ui';
import useAuth from '@/hooks/use-auth';

const job: Job = {
  title: 'Software Engineer',
  location: 'Vietnam',
  experience: 5,
  slug: 'software-engineer',
  type: 'partime',
  salary: 32,
  description:
    'Lorem ipsum dolor sit amet ctetur adipisicing elit. Voluptatem, alias. Quas, quae. Quisquam, Lorem ipsum dolor sit amet ctetur adipisicing elit. Voluptatem, alias. Quas, quae. Quisquam, voluptat',
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

  const auth = useAuth();
  const isOwner = auth?.user?.id === id;
  const { toast } = useToast();

  const [data, setData] = useState({
    name: 'Marshal',
    job: 'Developer',
    location: 'Vietnam',
    experience: 5,
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit . Voluptatem, alias. Quas, quae. Quisquam, voluptate',
    skills: ['javascript', 'html', 'css'],
    experiences: [experience, experience],
    role: 'applicant',
    jobs: [],
  });
  const [editing, setEditing] = useState<string | null>(null);

  const [companies, setCompanies] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const [companiesRes, userDetailRes] = await Promise.all([
        userApi.getUsers({ role: Roles.CANDIDATE }, 0, 100),
        userApi.getUserDetails(id ? id : ''),
      ]);

      setCompanies(companiesRes.data.data.content);
      setData({
        ...userDetailRes.data.data,
        skills: userDetailRes.data.data.skills ? userDetailRes.data.data?.skills?.split(',') : [],
      });

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

      const res = await userApi.updateProfile(submitData, id ? id : '');

      toast({
        title: 'Update profile successfully',
      });

      console.log(res);
    } catch (error: AxiosError | any) {
      toast({
        variant: 'destructive',
        title: 'Uh oh! Something went wrong.',
        description: 'There was a problem with your request.',
      });
      console.log(error.message);
    }
  };

  const handleUpdateExperience = async (data: Experience[]) => {
    try {
      await userApi.updateExperiences(id ? id : '', data);

      toast({
        title: 'Update experience successfully',
      });
    } catch (error: AxiosError | any) {
      toast({
        variant: 'destructive',
        title: 'Uh oh! Something went wrong.',
        description: 'There was a problem with your request.',
      });
      console.log(error.message);
    }
  };

  return (
    <div className="max-w-screen-lg w-screen mx-auto px-2">
      <div className="w-full max-w-full">
        {data.role === Roles.CANDIDATE && (
          <ApplicantPage
            data={data}
            handleUpdateProfile={handleUpdateProfile}
            companies={companies}
            handleUpdateExperience={handleUpdateExperience}
            isOwner={isOwner}
          />
        )}
        {data.role === Roles.EMPLOYER && (
          <EmployerPage data={data} handleUpdateProfile={handleUpdateProfile} isOwner={isOwner} />
        )}
      </div>
    </div>
  );
}

export default ProfilePage;
