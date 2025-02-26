import { useState } from 'react';

import { Building2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

import { Separator } from '@/components/ui/separator';

import JobList from '@/components/job-list';
import UserAvatar from '@/components/user-avatar';
import EditableSection from '@/components/editable-section';

const InfoSection = ({ tempValue, setTempValue }: any) => {
  return (
    <div className="grid grid-cols-3 gap-3">
      <div>
        <Label htmlFor="job">Job</Label>
        <Input
          id="job"
          placeholder="Job title"
          value={tempValue.job}
          onChange={(e) => setTempValue({ ...tempValue, job: e.target.value })}
          className="border-solid border-black border-[1px] "
        />
      </div>

      <div>
        <Label htmlFor="location">Location</Label>
        <Input
          id="location"
          placeholder="Location"
          value={tempValue.location}
          onChange={(e) => setTempValue({ ...tempValue, location: e.target.value })}
          className="border-solid border-black border-[1px] "
        />
      </div>

      <div>
        <Label htmlFor="yearExperience">Experience</Label>
        <Input
          id="yearExperience"
          placeholder="Year of experience"
          value={tempValue.yearExperience}
          type="number"
          onChange={(e) => setTempValue({ ...tempValue, yearExperience: e.target.value })}
          className="border-solid border-black border-[1px] "
        />
      </div>
    </div>
  );
};

interface EmployerPageProps {
  data: any;
  handleUpdateProfile: (data: any) => void;
  isOwner: boolean;
}

function EmployerPage({ data, handleUpdateProfile, isOwner }: EmployerPageProps) {
  const [editing, setEditing] = useState<string | null>(null);

  return (
    <div>
      <div className="bg-red-300 h-32 relative mb-16">
        <div className="absolute -bottom-12 left-4">
          <UserAvatar size="large" avatarUrl="https://github.com/shadcn.png" type="employer" />
        </div>
      </div>
      <h2 className="font-bold text-[28px] my-1">{data.name}</h2>

      <EditableSection
        isEditing={editing === 'info'}
        initialValue={{
          location: data.location,
        }}
        renderViewing={() => (
          <div>
            {!!data.location && (
              <div className="flex items-center gap-2 my-1">
                <Building2 size={24} />
                <h1>Location: {data.location}</h1>
              </div>
            )}
          </div>
        )}
        renderEditing={(tempValue, setTempValue) => <InfoSection tempValue={tempValue} setTempValue={setTempValue} />}
        handleCancel={() => setEditing(null)}
        handleSave={handleUpdateProfile}
        handleEdit={() => setEditing('info')}
        allowEdit={isOwner}
      />

      <Separator className="my-8" />

      <Tabs defaultValue="about">
        <TabsList>
          <TabsTrigger value="about" className="text-md font-bold">
            About
          </TabsTrigger>
          <TabsTrigger value="jobs" className="text-md font-bold">
            Jobs
          </TabsTrigger>
        </TabsList>
        <TabsContent value="about">About</TabsContent>
        <TabsContent value="jobs">
          <JobList jobs={data.jobs ? data.jobs : []} />
        </TabsContent>
      </Tabs>

      <EditableSection
        isEditing={editing === 'description'}
        initialValue={{ description: data.description }}
        renderViewing={() => (
          <div>
            <h2 className="font-bold text-[24px] my-1">About</h2>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit . Voluptatem, alias. Quas, quae. Quisquam,
              voluptate
            </p>
          </div>
        )}
        renderEditing={(tempValue, setTempValue) => (
          <div>
            <h2 className="font-bold text-[24px] my-1">About</h2>
            <textarea
              className="w-full h-32 outline-black focus:outline-none border-solid border-[2px] border-black p-2 rounded-sm resize-none"
              defaultValue={tempValue.about}
              onChange={(e) => setTempValue(e.target.value)}
            />
          </div>
        )}
        handleCancel={() => setEditing(null)}
        handleSave={handleUpdateProfile}
        handleEdit={() => setEditing('description')}
        allowEdit={isOwner}
      />
    </div>
  );
}

export default EmployerPage;
