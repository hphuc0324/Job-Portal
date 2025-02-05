import { Link } from 'react-router-dom';

import RegisterForm from '@/components/forms/register-form';
import AutoPlayCarousel from '@/components/carousels/carousel';
import { useToast } from '@/hooks/use-toast';
import { RegisterFormSchemaType } from '@/types/schemas/register';
import { useContext } from 'react';
import { AuthContext } from '@/providers/AuthProvider';
import { useState } from 'react';

const images = [
  'https://t4.ftcdn.net/jpg/02/65/65/01/360_F_265650104_2K1hVhIAuZfSVuo3J1eXQ6PTn3S1Sd0K.jpg',
  'https://media.istockphoto.com/id/626469398/photo/overhead-view-of-five-business-people-at-table-in-meeting.jpg?s=612x612&w=0&k=20&c=LGB0sHCvIVcj4oRXYlvZWqeHlu1jjN2a4mmB3uIeJb8=',
  'https://media.istockphoto.com/id/1388693928/photo/work-together-to-win-together.jpg?s=612x612&w=0&k=20&c=o_e-bhwq1MzDQU2Mv7J4AhxwPGsV_5ampoSdPmLUZQI=',
];

function RegisterPage() {
  const { toast } = useToast();
  const auth = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);

  const renderImages = () => {
    return images.map((image, index) => (
      <img key={index} src={image} alt="carousel image" className="w-full h-full rounded-r-xl" />
    ));
  };

  const handleSubmit = async (data: RegisterFormSchemaType) => {
    setIsLoading(true);
    const success = await auth?.register(data);

    if (success) {
      toast({
        title: 'Register successfully',
        description: 'You can go to login page and login now',
      });
    }
    setIsLoading(false);
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="w-full min-h-16 max-w-screen-md  grid grid-cols-12 border-2 border-black rounded-xl ">
        <div className="col-span-12 md:col-span-6 min-h-16 px-8 ">
          <Link to="/" className="font-bold text-center block">
            JOB PORTAL
          </Link>
          <div className="mt-12">
            <p className="font-bold text-2xl text-center">CREATE ACCOUNT</p>
            <p className="text-red-500">{auth?.error?.message}</p>

            <RegisterForm onSubmit={handleSubmit} isLoading={isLoading} />
            <p className="text-center text-sm my-2">
              Already have account! Let's go to{' '}
              <Link to="/auth/login" className="font-bold hover:underline">
                Login
              </Link>
            </p>
          </div>
        </div>
        <div className="hidden md:block col-span-6 rounded-r-inherit ">
          <AutoPlayCarousel slides={renderImages()} />
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;
