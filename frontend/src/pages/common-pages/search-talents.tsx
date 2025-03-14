import userApi from '@/apis/user-api';
import SearchTalentBar from '@/components/search-talent-bar';
import TalentCard from '@/components/talent-card';
import TalentList from '@/components/talent-list';
import useUserFilters from '@/hooks/use-user-filters';
import { User } from '@/types/dtos';
import { Roles } from '@/types/schemas/register';
import { AxiosError } from 'axios';
import { useEffect, useState } from 'react';

const user = {
  id: 'something',
  name: 'John Doe',
  job: 'Software Engineer',
  avatarUrl: 'https://github.com/shadcn.png',
  skills: 'React, Node.js, TypeScript',
  description: 'I am a full-stack developer with 5 years of, with 5 years of experience',
  experience: 5,
  role: Roles.CANDIDATE,
  location: 'Vietnam',
};

function SearchTalentsPage() {
  const { name, location, minExperience, maxExperience, skills, pagination, setSearchFilters } = useUserFilters();
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const handleFetchUsers = async () => {
      try {
        const res = await userApi.getUsers(
          {
            name,
            location,
            minExperience,
            maxExperience,
            skills,
          },
          pagination.page,
          pagination.limit,
        );

        setUsers(res.data.data.content);
      } catch (error: AxiosError | any) {
        console.error(error);
      }
    };

    handleFetchUsers();
  }, [name, location, minExperience, maxExperience, skills.join(','), pagination.page, pagination.limit]);

  console.log(users);

  return (
    <div className="bg-[#f0f5f9] w-screen">
      <SearchTalentBar
        name={name}
        location={location}
        skills={skills}
        minExperience={minExperience}
        maxExperience={maxExperience}
        setFilters={setSearchFilters}
      />
      <div className="p-8 w-full max-w-screen-xl mx-auto">{users && <TalentList talents={users} />}</div>
    </div>
  );
}

export default SearchTalentsPage;
