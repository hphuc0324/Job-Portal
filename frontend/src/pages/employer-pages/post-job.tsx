import categoryApi from '@/apis/category-api';
import levelApi from '@/apis/level-api';
import JobForm, { JobFormSchemaType } from '@/components/forms/job-form';
import { Category, Level } from '@/types/dtos';
import { AxiosError } from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function PostJob() {
  const { slug } = useParams();
  const [levels, setLevels] = useState<Level[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);

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

  return (
    <div className="w-screen max-w-screen-xl mx-auto my-8 py-4 px-16">
      <JobForm
        onSubmit={(values: JobFormSchemaType, type: string) => {
          console.log(values);
          console.log(type);
        }}
        categories={categories}
        levels={levels}
      />
    </div>
  );
}

export default PostJob;
