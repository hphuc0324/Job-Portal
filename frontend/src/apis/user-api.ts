import axiosClient from './api-client';

const baseURL = '/user';

const userApi = {
  updateProfile: (data: object, userId: string) => {
    return axiosClient.patch(`${baseURL}/profile/${userId}`, data);
  },
};

export default userApi;
