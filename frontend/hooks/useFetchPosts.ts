import { useEffect, useState } from 'react';
import axios from 'axios';
import { Post } from '@utils/types';

export const useFetchPosts = (): Array<Post> => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios.get('/posts');
        setData(result.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  return data;
};
