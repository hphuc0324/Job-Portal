import applicationApi from '@/apis/application-api';
import { Application } from '@/types/dtos';
import { AxiosError } from 'axios';
import { createContext, useEffect, useState } from 'react';

export interface AppliedContextType {
  appliedList: string[];
}

export const AppliedContext = createContext<AppliedContextType | null>(null);

const AppliedProvider = ({ userId, children }: { userId?: string; children: React.ReactNode }) => {
  const [appliedList, setAppliedList] = useState<string[]>(() => {
    const storedApplied = localStorage.getItem('applied');
    return storedApplied ? JSON.parse(storedApplied) : [];
  });

  useEffect(() => {
    localStorage.setItem('applied', JSON.stringify(appliedList));
  }, [appliedList]);

  useEffect(() => {
    const fetchAppliedList = async () => {
      if (!userId) {
        setAppliedList([]);
        return;
      }

      try {
        const res = await applicationApi.getUserApplications(userId);

        const list = res.data.data?.map((application: Application) => application.job.id) || [];
        setAppliedList(list);
      } catch (error: AxiosError | any) {
        console.error(error);
      }
    };

    fetchAppliedList();
  }, [userId]);

  return <AppliedContext.Provider value={{ appliedList }}>{children}</AppliedContext.Provider>;
};

export default AppliedProvider;
