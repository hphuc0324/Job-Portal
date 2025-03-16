import axiosClient from './api-client';

const baseUrl = '/application';

const applicationApi = {
  createApplication: (values: FormData) => {
    return axiosClient.post(baseUrl, values, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },

  getJobApplications: (slug: string) => {
    return axiosClient.get(`${baseUrl}/job-applications/${slug}`);
  },

  updateApplication: (id: string, data: any) => {
    return axiosClient.patch(`${baseUrl}/${id}`, data);
  },
};

export default applicationApi;
