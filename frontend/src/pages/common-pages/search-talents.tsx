import userApi from '@/apis/user-api';
import PaginationBar from '@/components/pagination-bar';
import SearchTalentBar from '@/components/search-talent-bar';
import TalentList from '@/components/talent-list';
import useUserFilters from '@/hooks/use-user-filters';
import { User } from '@/types/dtos';
import { AxiosError } from 'axios';
import { useEffect, useState } from 'react';

function SearchTalentsPage() {
  const { name, location, minExperience, maxExperience, skills, pagination, setSearchFilters } = useUserFilters();
  const [users, setUsers] = useState<User[]>([]);
  const [totalPages, setTotalPages] = useState(0);

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

        setTotalPages(res.data.data.totalPages);
        setUsers(res.data.data.content);
      } catch (error: AxiosError | any) {
        console.error(error);
      }
    };

    handleFetchUsers();
  }, [name, location, minExperience, maxExperience, skills.join(','), pagination.page, pagination.limit]);

  console.log(users);

  const handlePageChange = (page: number) => {
    if (page < 0 || page >= totalPages || page === pagination.page) return;

    setSearchFilters({ pagination: { ...pagination, page } });
  };

  return (
    <div className="bg-[#f0f5f9] w-screen min-h-screen pb-2">
      <SearchTalentBar
        name={name}
        location={location}
        skills={skills}
        minExperience={minExperience}
        maxExperience={maxExperience}
        setFilters={setSearchFilters}
      />
      <div className="p-8 w-full max-w-screen-xl mx-auto">{users && <TalentList talents={users} />}</div>

      <PaginationBar currentPage={pagination.page} totalPages={totalPages} onPageChange={handlePageChange} />
    </div>
  );
}

export default SearchTalentsPage;
