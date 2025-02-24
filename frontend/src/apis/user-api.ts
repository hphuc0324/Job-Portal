import UserFilter from '@/types/filters/user-filter';
import axiosClient from './api-client';

const baseURL = '/user';

const userApi = {
  updateProfile: (data: object, userId: string) => {
    return axiosClient.patch(`${baseURL}/profile/${userId}`, data);
  },

  getUsers: (filter: UserFilter, page: number, limit: number) => {
    const queryParams = new URLSearchParams();

    if (filter.name) {
      queryParams.append('name', filter.name);
    }

    if (filter.role) {
      queryParams.append('role', filter.role);
    }

    if (filter.experience) {
      queryParams.append('experience', filter.experience.toString());
    }

    if (filter.location) {
      queryParams.append('location', filter.location);
    }

    queryParams.append('limit', limit.toString());
    queryParams.append('page', page.toString());

    return axiosClient.get(`${baseURL}/getAll?${queryParams.toString()}`);
  },

  getUserDetails: (userId: string) => {
    return axiosClient.get(`${baseURL}/profile/${userId}`);
  },
};

export default userApi;
