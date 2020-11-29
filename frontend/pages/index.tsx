import { useFetchPosts } from '@hooks/useFetchPosts';
import styles from '../styles/Home.module.css';
import Link from 'next/link';
import { useAuthState } from 'react-firebase-hooks/auth';
import { getAuth, loginWithGoogle, logout } from '@helper/firebaseAuthHelper';

export default function HomePage() {
  const [user, loading] = useAuthState(getAuth());
  const posts = useFetchPosts();

  if (!posts) {
    return <div className={styles.container}>Loading...</div>;
  }

  return (
    <div className='py-20 w-2/3 mx-auto'>
      <div>
        <Link href='/new'>
          <a className='border border-black px-2 py-1 rounded cursor-pointer'>New Post</a>
        </Link>
      </div>
      {posts.map((post, index) => (
        <div key={index} className='border py-3 px-4 my-3'>
          <p className='font-bold text-lg border-b my-2'>{post.title}</p>
          <p>{post.body}</p>
          <p className='text-sm text-gray-400'>
            {`${post.created_at.slice(0, 10)} ${post.created_at.slice(11, 16)}`}
          </p>
        </div>
      ))}
      {!loading && user && (
        <span className='border px-1 py-1 cursor-pointer' onClick={logout}>
          Logout
        </span>
      )}
    </div>
  );
}
