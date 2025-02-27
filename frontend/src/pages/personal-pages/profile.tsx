import { useParams } from 'react-router-dom';

import { useEffect, useState } from 'react';

import { AxiosError } from 'axios';
import userApi from '@/apis/user-api';
import { useToast } from '@/hooks/use-toast';
import { Roles } from '@/types/schemas/register';
import { Experience } from '@/types/dtos';
import ApplicantPage from './applicant-ui';
import EmployerPage from './employer-ui';
import useAuth from '@/hooks/use-auth';

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
    description: '',
    skills: ['javascript', 'html', 'css'],
    experiences: [experience, experience],
    role: 'applicant',
    jobs: [],
  });

  const [companies, setCompanies] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const [companiesRes, userDetailRes] = await Promise.all([
        userApi.getUsers({ role: Roles.EMPLOYER }, 0, 100),
        userApi.getUserDetails(id ? id : ''),
      ]);

      setCompanies(companiesRes.data.data.content);
      setData({
        ...userDetailRes.data.data,
        skills: userDetailRes.data.data.skills ? userDetailRes.data.data?.skills?.split(',') : [],
      });
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

      setData({
        ...res.data.data,
        skills: res.data.data.skills ? res.data.data?.skills?.split(',') : [],
      });
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
      const res = await userApi.updateExperiences(id ? id : '', data);

      setData((prev) => ({
        ...prev,
        experiences: res.data.data,
      }));

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
