import categoryApi from '@/apis/category-api';
import jobApi from '@/apis/job-api';
import levelApi from '@/apis/level-api';
import JobForm, { JobFormSchemaType } from '@/components/forms/job-form';
import { Category, Level, Job } from '@/types/dtos';
import { AxiosError } from 'axios';
import { useEffect, useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import useAuth from '@/hooks/use-auth';
import { toast } from '@/hooks/use-toast';

function PostJob() {
  const { slug } = useParams();
  const [levels, setLevels] = useState<Level[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [job, setJob] = useState<Job | undefined>(undefined);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const auth = useAuth();

  useEffect(() => {
    const handleFetchData = async () => {
      try {
        const [levelsRes, categoriesRes] = await Promise.all([levelApi.getAllLevels(), categoryApi.getAllCategories()]);

        setLevels(levelsRes.data.data);
        setCategories(categoriesRes.data.data);
      } catch (error: AxiosError | any) {
        console.error(error);
      }
    };

    handleFetchData();
  }, []);

  useEffect(() => {
    const handleFetchJob = async () => {
      try {
        setIsLoading(true);
        const res = await jobApi.getJobDetails(slug || '');
        setJob(res.data.data);
      } catch (error: AxiosError | any) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    if (slug) {
      handleFetchJob();
    }
  }, []);

  const handleSubmit = async (values: JobFormSchemaType) => {
    if (slug) {
      const res = await jobApi.updateJob(slug, values);

      setJob(res.data.data);
      toast({
        title: 'Success',
        description: 'Job updated successfully',
      });
    } else {
      const res = await jobApi.createJob(values);
      setJob(res.data.data);
      toast({
        title: 'Success',
        description: 'Post job successfully',
      });
    }
  };

  if (job) {
    if (job.company.id !== auth?.user?.id) {
      return <Navigate to="/404" />;
    }
  }

  return (
    <div className="w-screen max-w-screen-xl mx-auto my-8 py-4 px-16">
      {auth?.user && !isLoading && (
        <JobForm job={job} onSubmit={handleSubmit} user={auth?.user} categories={categories} levels={levels} />
      )}
    </div>
  );
}

export default PostJob;
