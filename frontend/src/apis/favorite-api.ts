import axiosClient from './api-client';

const baseUrl = '/favorite';

const favoriteApi = {
  getFavoriteList: (userId: string) => {
    return axiosClient.get(`${baseUrl}/${userId}`);
  },

  addToFavorite: (userId: string, jobId: string) => {
    return axiosClient.post(`${baseUrl}`, { userId, jobId });
  },

  removeFromFavorite: (userId: string, jobId: string) => {
    return axiosClient.delete(`${baseUrl}/${userId}/${jobId}`);
  },
};

export default favoriteApi;
