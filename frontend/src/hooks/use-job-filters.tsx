import JobFilter from '@/types/filters/job-filter';
import { useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';

const useJobFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const getArrayParams = (name: string) => {
    const value = searchParams.getAll(name);
    return value.length > 0 ? value : searchParams.get(name)?.split(',') || [];
  };

  const title = searchParams.get('title') as JobFilter['title'];
  const location = searchParams.get('location') as JobFilter['location'];
  const minSalary = searchParams.get('minSalary') ? parseInt(searchParams.get('minSalary') as string) : undefined;
  const maxSalary = searchParams.get('maxSalary') ? parseInt(searchParams.get('maxSalary') as string) : undefined;
  const level = searchParams.get('level') as JobFilter['level'];
  const categories = getArrayParams('categories') as string[];
  const type = getArrayParams('type') as string[];
  const page = searchParams.get('page');
  const limit = searchParams.get('limit');

  const setFilters = useCallback((filter: JobFilter) => {
    setSearchParams((params) => {
      if (filter.title !== undefined) {
        if (filter.title.trim() === '') {
          params.delete('title');
        } else {
          params.set('title', filter.title);
        }
      }

      if (filter.location !== undefined) {
        if (filter.location.trim() === '') {
          params.delete('location');
        } else {
          params.set('location', filter.location);
        }
      }

      if (filter.level !== undefined) {
        if (filter.level.trim() === '') {
          params.delete('level');
        } else {
          params.set('level', filter.level);
        }
      }

      if (filter.minSalary !== undefined) {
        params.set('minSalary', filter.minSalary.toString());
      }

      if (filter.maxSalary !== undefined) {
        params.set('maxSalary', filter.maxSalary.toString());
      }

      if (filter.categories !== undefined) {
        params.delete('categories');
        filter.categories.forEach((categories) => {
          params.append('categories', categories);
        });
      }

      if (filter.type !== undefined) {
        params.delete('type');
        filter.type.forEach((type) => {
          params.append('type', type);
        });
      }

      if (filter.pagination?.page && filter.pagination.page >= 0) {
        params.set('page', filter.pagination.page.toString());
      }

      if (filter.pagination?.limit && filter.pagination.limit >= 0) {
        params.set('limit', filter.pagination.limit.toString());
      }

      return params;
    });
  }, []);

  return {
    title,
    location,
    minSalary,
    maxSalary,
    level,
    type,
    categories,
    pagination: {
      page: page ? parseInt(page) : 0,
      limit: limit ? parseInt(limit) : 6,
    },
    setFilters,
  };
};

export default useJobFilters;
