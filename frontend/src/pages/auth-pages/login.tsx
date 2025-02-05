import { Link, useNavigate } from 'react-router-dom';

import LoginForm from '@/components/forms/login-form';
import AutoPlayCarousel from '@/components/carousels/carousel';
import { Button } from '@/components/ui/button';
import { FcGoogle } from 'react-icons/fc';
import { LoginFormSchemaType } from '@/types/schemas/login';
import { useContext } from 'react';
import { AuthContext } from '@/providers/AuthProvider';
import { useState } from 'react';

const images = [
  'https://t4.ftcdn.net/jpg/02/65/65/01/360_F_265650104_2K1hVhIAuZfSVuo3J1eXQ6PTn3S1Sd0K.jpg',
  'https://media.istockphoto.com/id/626469398/photo/overhead-view-of-five-business-people-at-table-in-meeting.jpg?s=612x612&w=0&k=20&c=LGB0sHCvIVcj4oRXYlvZWqeHlu1jjN2a4mmB3uIeJb8=',
  'https://media.istockphoto.com/id/1388693928/photo/work-together-to-win-together.jpg?s=612x612&w=0&k=20&c=o_e-bhwq1MzDQU2Mv7J4AhxwPGsV_5ampoSdPmLUZQI=',
];

function LoginPage() {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const renderImages = () => {
    return images.map((image, index) => (
      <img key={index} src={image} alt="carousel image" className="w-full h-full rounded-l-xl" />
    ));
  };

  const handleSubmit = async (values: LoginFormSchemaType) => {
    setIsLoading(true);
    const success = await auth?.login(values);

    if (success) {
      const search = new URLSearchParams(location.search);
      const redirectUrl = search.get('redirect');

      navigate(redirectUrl ? decodeURIComponent(redirectUrl) : '/');
    }

    setIsLoading(false);
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="w-full min-h-16 max-w-screen-md  grid grid-cols-12 border-2 border-black rounded-xl ">
        <div className="md:block col-span-6 rounded-l-inherit hidden">
          <AutoPlayCarousel slides={renderImages()} />
        </div>

        <div className="col-span-12 md:col-span-6 min-h-16 px-8 flex flex-col justify-center relative">
          <Link to="/" className="font-bold text-center block top-4 absolute left-1/2 transform -translate-x-1/2">
            JOB PORTAL
          </Link>
          <div className="mt-12">
            <p className="font-bold text-2xl text-center">WELCOME BACK</p>
            <p className="text-red-500">{auth?.error?.message}</p>
            <LoginForm onSubmit={handleSubmit} isLoading={isLoading} />
            <p className="text-center text-sm my-2">
              You can register for new accout here!{' '}
              <Link to="/auth/register" className="font-bold hover:underline">
                Register
              </Link>
            </p>
          </div>

          <h2 className="w-full my-6 text-center border-b-[1px] border-gray-600 leading-[0.1em]">
            <span className="px-2 bg-white text-gray-600">or</span>
          </h2>

          <Button variant="outline" className="shadow-md my-4" disabled={isLoading}>
            <FcGoogle />
            Continue with Google
          </Button>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
