import SearchJobBar from '@/components/search-job-bar';
import { Checkbox } from '@/components/ui/checkbox';
import { DualRangeSlider } from '@/components/dual-slider';
import useJobFilters from '@/hooks/use-job-filters';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

function SearchJobsPage() {
  const { title, location, minSalary, maxSalary, level, categories, type, setFilters } = useJobFilters();
  const clearFilters = () => {
    setFilters({
      title: '',
      location: '',
      minSalary: 0,
      maxSalary: 1500,
      level: '',
      categories: [],
      type: [],
    });
  };

  return (
    <div className="bg-[#f0f5f9] w-screen">
      <SearchJobBar title={title} location={location} setFilters={setFilters} />
      <div className="p-8 w-full max-w-screen-xl mx-auto">
        <h2 className="font-semibold text-2xl">Recommended Jobs</h2>
        <div className="flex w-full gap-4">
          <div className="flex-1">
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
                  id="partime"
                  checked={type?.includes('partime')}
                  value="partime"
                  onCheckedChange={(checked) =>
                    setFilters({
                      type: checked ? [...type, 'partime'] : type.filter((t) => t !== 'partime'),
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
              <div className="flex items-center space-x-2 my-3">
                <Checkbox id="terms" />
                <label
                  htmlFor="terms"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Full time
                </label>
              </div>
              <div className="flex items-center space-x-2 my-3">
                <Checkbox id="terms" />
                <label
                  htmlFor="terms"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Part time
                </label>
              </div>
              <div className="flex items-center space-x-2 my-3">
                <Checkbox id="terms" />
                <label
                  htmlFor="terms"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Volunteering
                </label>
              </div>
            </div>

            <div className="my-8">
              <h3 className="font-semibold text-lg my-4">Level</h3>
              <RadioGroup onValueChange={(value) => setFilters({ level: value })} defaultValue="option-one">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="intern" id="option-one" checked={level === 'intern'} />
                  <Label htmlFor="option-one">Intern</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="senior" id="option-two" checked={level === 'senior'} />
                  <Label htmlFor="option-two">Senior</Label>
                </div>
              </RadioGroup>
            </div>
          </div>
          <div className="w-[80%]"></div>
        </div>
      </div>
    </div>
  );
}

export default SearchJobsPage;
