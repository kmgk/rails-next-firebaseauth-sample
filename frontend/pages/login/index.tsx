import { useAuthState } from 'react-firebase-hooks/auth';
import { getAuth, loginWithGoogle } from '@helper/firebaseAuthHelper';
import { useRouter } from 'next/router';
import Image from 'next/image';
import axios from 'axios';

export default function LoginPage() {
  const [user, loading] = useAuthState(getAuth());
  const router = useRouter();

  if (loading) {
    return <div className='py-20 text-center'>Loading...</div>;
  }

  if (!loading && user) {
    router.push('/');
  }

  const handleGoogleLogin = () => {
    const request = async () => {
      const user = await loginWithGoogle();
      const auth = getAuth();
      if (auth && auth.currentUser) {
        const currentUser = auth.currentUser;
        const token = await currentUser.getIdToken(true);
        const config = { headers: { authorization: `Bearer ${token}` } };
        try {
          await axios.get('/users/new', config);
        } catch (error) {
          console.log(error);
        }
      }
      if (user) router.push('/');
    };
    request();
  };

  return (
    <div className='w-2/3 py-20 mx-auto'>
      <p className='font-bold text-4xl py-5 text-center'>Login</p>
      <div className='text-center' onClick={handleGoogleLogin}>
        <Image
          className='cursor-pointer'
          src='/images/google_signin_btn.png'
          alt='google signin button'
          width={191}
          height={46}
        />
      </div>
    </div>
  );
}
