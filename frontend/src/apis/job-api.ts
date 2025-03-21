import JobFilter from '@/types/filters/job-filter';
import axiosClient from './api-client';
import { JobFormSchemaType } from '@/components/forms/job-form';
const baseUrl = '/job';

const jobApi = {
  getJobs: (filter: JobFilter) => {
    const queryParams = new URLSearchParams();
    if (filter.title) {
      queryParams.append('title', filter.title);
    }

    if (filter.location) {
      queryParams.append('location', filter.location);
    }

    if (filter.minSalary) {
      queryParams.append('minSalary', filter.minSalary.toString());
    }

    if (filter.maxSalary) {
      queryParams.append('maxSalary', filter.maxSalary.toString());
    }

    if (filter.level) {
      queryParams.append('level', filter.level);
    }

    if (filter.categories && filter.categories.length > 0) {
      queryParams.append('categories', filter.categories.join(','));
    }

    if (filter.type && filter.type.length > 0) {
      queryParams.append('type', filter.type.join(','));
    }

    queryParams.append('page', filter.pagination?.page.toString() || '0');
    queryParams.append('limit', filter.pagination?.limit.toString() || '6');

    return axiosClient.get(`${baseUrl}?${queryParams.toString()}`);
  },

  getJobDetails: (slug: string) => {
    return axiosClient.get(`${baseUrl}/${slug}`);
  },

  createJob: (data: JobFormSchemaType) => {
    return axiosClient.post(baseUrl, data);
  },

  updateJob: (slug: string, data: any) => {
    return axiosClient.patch(`${baseUrl}/${slug}`, data);
  },

  getCompanyJobs: (companyId: string) => {
    return axiosClient.get(`${baseUrl}/company-jobs/${companyId}`);
  },
};

export default jobApi;
