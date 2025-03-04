import axiosClient from './api-client';

const baseUrl = '/category';

const categoryApi = {
  getAllCategories: () => {
    return axiosClient.get(baseUrl);
  },
};

export default categoryApi;
