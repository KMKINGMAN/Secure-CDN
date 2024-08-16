import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

const ProtectedRoute = ({ children }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const verifyToken = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        router.push('/login');
        return;
      }

      try {
        const response = await axios.get('/api/verifyToken', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.status === 200 && response.data.valid) {
          setIsLoading(false);
        } else {
          router.push('/login');
        }
      } catch (error) {
        router.push('/login');
      }
    };

    verifyToken();
  }, [router]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return children;
};

export default ProtectedRoute;
