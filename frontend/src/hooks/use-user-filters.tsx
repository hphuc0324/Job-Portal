import UserFilter from '@/types/filters/user-filter';
import { useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';

const useUserFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const getArrayParams = (name: string) => {
    const values = searchParams.getAll(name);

    return values.length > 0 ? values : searchParams.get(name)?.split(',') || [];
  };

  const name = searchParams.get('name') as UserFilter['name'];
  const location = searchParams.get('location') as UserFilter['location'];
  const minExperience = searchParams.get('minExperience')
    ? parseInt(searchParams.get('minExperience') as string)
    : undefined;
  const maxExperience = searchParams.get('maxExperience')
    ? parseInt(searchParams.get('maxExperience') as string)
    : undefined;
  const skills = getArrayParams('skills') as string[];
  const page = searchParams.get('page');
  const limit = searchParams.get('limit');

  const setSearchFilters = useCallback((filter: UserFilter) => {
    setSearchParams((params) => {
      if (filter.name !== undefined) {
        if (filter.name.trim() === '') {
          params.delete('name');
        } else {
          params.set('name', filter.name);
        }
      }

      if (filter.location !== undefined) {
        if (filter.location.trim() === '') {
          params.delete('location');
        } else {
          params.set('location', filter.location);
        }
      }

      if (filter.minExperience !== undefined) {
        params.set('minExperience', filter.minExperience.toString());
      }

      if (filter.maxExperience !== undefined) {
        params.set('maxExperience', filter.maxExperience.toString());
      }

      if (filter.skills !== undefined) {
        params.delete('skills');
        filter.skills.forEach((skill) => {
          params.append('skills', skill);
        });
      }

      if (filter.pagination?.page !== undefined) {
        params.set('page', filter.pagination.page.toString());
      }

      if (filter.pagination?.limit !== undefined) {
        params.set('limit', filter.pagination.limit.toString());
      }

      return params;
    });
  }, []);

  return {
    name,
    location,
    minExperience,
    maxExperience,
    skills,
    pagination: {
      page: page ? parseInt(page) : 0,
      limit: limit ? parseInt(limit) : 5,
    },
    setSearchFilters,
  };
};

export default useUserFilters;
