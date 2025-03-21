import SearchJobBar from '@/components/search-job-bar';
import { Checkbox } from '@/components/ui/checkbox';
import { DualRangeSlider } from '@/components/dual-slider';
import useJobFilters from '@/hooks/use-job-filters';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useEffect, useState } from 'react';
import { AxiosError } from 'axios';
import jobApi from '@/apis/job-api';
import { Category, Job, Level } from '@/types/dtos';
import JobList from '@/components/job-list';
import { useToast } from '@/hooks/use-toast';
import levelApi from '@/apis/level-api';
import categoryApi from '@/apis/category-api';
import PaginationBar from '@/components/pagination-bar';
import useFavorite from '@/hooks/use-favorite';

function SearchJobsPage() {
  const { title, location, minSalary, maxSalary, level, categories, type, pagination, setFilters } = useJobFilters();
  const [filterData, setFilterData] = useState<{
    levels: Level[];
    category: Category[];
  }>({ levels: [], category: [] });
  const [jobData, setJobData] = useState<{
    jobs: Job[];
    isLoading: boolean;
    totalPages: number;
  }>({
    jobs: [],
    isLoading: false,
    totalPages: 0,
  });
  const { toast } = useToast();
  const { favoriteList, toggleFavorite } = useFavorite();

  const clearFilters = () => {
    setFilters({
      title: '',
      location: '',
      minSalary: 0,
      maxSalary: 1500,
      level: '',
      categories: [],
      type: [],
      pagination: {
        page: 0,
        limit: 5,
      },
    });
  };

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setJobData((prev) => ({ ...prev, isLoading: true }));
        const res = await jobApi.getJobs({
          title,
          location,
          minSalary,
          maxSalary,
          level,
          categories,
          type,
        });

        setJobData({
          jobs: res.data.data.content as Job[],
          isLoading: false,
          totalPages: res.data.data.totalPages,
        });
      } catch (error: AxiosError | any) {
        console.error('Error fetching jobs:', error.message);
        toast({
          title: 'Error fetching jobs',
          description: error.message,
          variant: 'destructive',
        });
      }
    };

    fetchJobs();
  }, [
    title,
    location,
    minSalary,
    maxSalary,
    level,
    categories?.join(','),
    type?.join(','),
    pagination.page,
    pagination.limit,
  ]);

  useEffect(() => {
    const handleFetchData = async () => {
      const [levelRes, categoryRes] = await Promise.all([levelApi.getAllLevels(), categoryApi.getAllCategories()]);

      setFilterData({
        category: categoryRes.data.data,
        levels: levelRes.data.data,
      });
    };

    handleFetchData();
  }, []);

  const handleChangePage = (page: number) => {
    if (pagination.page === page) {
      return;
    }

    setFilters({
      pagination: {
        ...pagination,
        page: page,
      },
    });
  };

  return (
    <div className="bg-[#f0f5f9] w-screen min-h-screen">
      <SearchJobBar title={title} location={location} setFilters={setFilters} />
      <div className="p-8 w-full max-w-screen-xl mx-auto">
        <h2 className="font-semibold text-2xl">Recommended Jobs</h2>
        <div className="flex w-full gap-12">
          <div>
            {/* Job type */}
            <div className="my-8">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-lg my-4">Job Type</h3>
                <Button variant="link" onClick={clearFilters} className="text-orange-500">
                  Clear all{' '}
                </Button>
              </div>
              <div className="flex items-center space-x-2 my-3">
                <Checkbox
                  id="fulltime"
                  checked={type?.includes('fulltime')}
                  value="fulltime"
                  onCheckedChange={(checked) =>
                    setFilters({
                      type: checked ? [...type, 'fulltime'] : type.filter((t) => t !== 'fulltime'),
                    })
                  }
                />
                <label
                  htmlFor="fulltime"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Full time
                </label>
              </div>
              <div className="flex items-center space-x-2 my-3">
                <Checkbox
                  id="parttime"
                  checked={type?.includes('parttime')}
                  value="parttime"
                  onCheckedChange={(checked) =>
                    setFilters({
                      type: checked ? [...type, 'parttime'] : type.filter((t) => t !== 'parttime'),
                    })
                  }
                />
                <label
                  htmlFor="partime"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Part time
                </label>
              </div>
              <div className="flex items-center space-x-2 my-3">
                <Checkbox
                  id="volunteering"
                  checked={type?.includes('volunteering')}
                  value="volunteering"
                  onCheckedChange={(checked) =>
                    setFilters({
                      type: checked ? [...type, 'volunteering'] : type.filter((t) => t !== 'volunteering'),
                    })
                  }
                />
                <label
                  htmlFor="volunteering"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Volunteering
                </label>
              </div>
            </div>
            {/* Job salary */}
            <div className="my-8 w-full">
              <h3 className="font-semibold text-lg my-4">Salary Range</h3>
              <DualRangeSlider
                className="mt-8 mb-12"
                value={[minSalary ?? 0, maxSalary ?? 1500]}
                min={0}
                max={1500}
                step={50}
                label={(value) => <span className="text-sm">{`$${value}`}</span>}
                onValueChange={(value) => setFilters({ minSalary: value[0], maxSalary: value[1] })}
                labelPosition="bottom"
              />
            </div>
            <div className="my-8">
              <h3 className="font-semibold text-lg my-4">Job Categories</h3>
              {filterData.category.map((category) => (
                <div className="flex items-center space-x-2 my-3" key={category.id}>
                  <Checkbox
                    id={category.id}
                    checked={categories?.includes(category.slug)}
                    value={category.slug}
                    onCheckedChange={(checked) =>
                      setFilters({
                        categories: checked
                          ? [...categories, category.slug]
                          : categories.filter((c) => c !== category.slug),
                      })
                    }
                  />
                  <label
                    htmlFor="terms"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {category.name}
                  </label>
                </div>
              ))}
            </div>
            <div className="my-8">
              <h3 className="font-semibold text-lg my-4">Level</h3>
              <RadioGroup onValueChange={(value) => setFilters({ level: value })} defaultValue="option-one">
                {filterData.levels.map((item) => (
                  <div className="flex items-center space-x-2" key={item.id}>
                    <RadioGroupItem value={item.slug} id={item.id} checked={level === item.slug} />
                    <Label htmlFor={item.id}>{item.name}</Label>
                  </div>
                ))}
              </RadioGroup>
            </div>
          </div>
          <div className="my-8 flex-1">
            <JobList jobs={jobData.jobs} favoriteList={favoriteList} toggleFavorite={toggleFavorite} />

            <PaginationBar
              currentPage={pagination.page}
              totalPages={jobData.totalPages}
              onPageChange={handleChangePage}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default SearchJobsPage;
