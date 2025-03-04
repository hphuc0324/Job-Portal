import axiosClient from './api-client';

const baseUrl = '/level';

const levelApi = {
  getAllLevels: () => {
    return axiosClient.get(baseUrl);
  },
};

export default levelApi;
