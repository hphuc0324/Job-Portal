import PaginationFilter from './pagination-filter';

export default interface UserFilter {
  role?: string;
  name?: string;
  experience?: number;
  location?: string;
  minExperience?: number;
  maxExperience?: number;
  skills?: string[];
  pagination?: PaginationFilter;
}
