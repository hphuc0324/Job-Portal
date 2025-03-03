import PaginationFilter from './pagination-filter';

export default interface JobFilter {
  title?: string;
  location?: string;
  minSalary?: number;
  maxSalary?: number;
  level?: string;
  categories?: string[];
  type?: string[];
  pagination?: PaginationFilter;
}
