import { useAuthState } from 'react-firebase-hooks/auth';
import { getAuth } from '@helper/firebaseAuthHelper';
import { useRouter } from 'next/router';
import { useState } from 'react';
import axios from 'axios';

export default function NewPage() {
  const [user, loading] = useAuthState(getAuth());
  const router = useRouter();
  const [form, setForm] = useState({ title: '', body: '' });
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState()

  if (loading) {
    return <div className='py-20 text-center'>Loading...</div>;
  }

  if (!loading && !user) {
    router.push('/login');
  }

  const handleChange = (key: string, value: string) => {
    setForm({ ...form, [key]: value });
  };

  const submit = () => {
    const request = async () => {
      setIsSubmitting(true)
      if (user) {
        const token = await user.getIdToken(true);
        const config = { headers: { authorization: `Bearer ${token}` } };
        try {
          await axios.post('/posts', { post: form }, config);
          router.push('/');
        } catch (error) {
          console.log(error.message);
          setError(error.message);
          setIsSubmitting(false);
        }
      }
    };
    request();
  };

  return (
    <div className='w-2/3 py-20 mx-auto'>
      <p className='font-bold text-4xl py-10 text-center'>New Post</p>
      <p className="text-center text-red-600">{error}</p>
      <div className='text-center'>
        <div className='px-3 py-5'>
          <input
            type='text'
            className='border-b w-2/3 px-3 py-5'
            placeholder='Title'
            onChange={(e) => handleChange('title', e.target.value)}
          />
        </div>
        <div className='px-3 py-5'>
          <textarea
            className='border-b w-2/3 px-3 py-5'
            placeholder='Body'
            onChange={(e) => handleChange('body', e.target.value)}
          />
        </div>
      </div>
      <div className='text-center'>
        {isSubmitting ? (
          <button className='border rounded px-2 py-1 border-black cursor-wait'>Loading</button>
        ) : (
          <button className='border rounded px-2 py-1 border-black' onClick={submit}>
            Submit
          </button>
        )}
      </div>
    </div>
  );
}
