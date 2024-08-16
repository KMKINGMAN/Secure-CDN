import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { Container } from 'react-bootstrap';

const Logout = () => {
  const router = useRouter();

  useEffect(() => {
    localStorage.removeItem('token');
    setTimeout(() => {
      router.push('/login');
    }, 2000);
  }, [router]);

  return (
    <Container className="py-5 vh-100">
      <h1 className="text-center mb-5">You have been logged out</h1>
      <p className="text-center">Redirecting to the login page...</p>
    </Container>
  );
};

export default Logout;
