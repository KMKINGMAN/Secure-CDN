import { useRouter } from 'next/router';
import axios from 'axios';
import AutoForm, { AutoFormSubmit } from "@/components/ui/auto-form";
import * as z from "zod";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from "@/components/ui/use-toast";
import { API_URL } from '@/utils/apj';

const formSchema = z.object({
  username: z.string().min(1, { message: "Username is required" }),
  password: z.string().min(1, { message: "Password is required" }),
  name: z.string().min(1, { message: "Name is required" }),
  dob: z.date(),
});

export default function Register() {
  const router = useRouter();
  const { toast } = useToast();

  const handleRegister = async (data) => {
    try {
      const response = await axios.post(`${API_URL}/auth/register`, data);
      localStorage.setItem('token', response.data.token);
      router.push('/dashboard');
      toast({ title: "Registration Successful", description: "You have been registered successfully" });
    } catch (error) {
      console.error('Registration error:', error);
      toast({ title: "Registration Error", description: error.response?.data?.message || 'Error registering' });
    }
  };

  return (
    <main className="tw-p-6">
      <div className="tw-flex tw-flex-col tw-gap-4 tw-h-full tw-items-center tw-justify-center">
        <section className="tw-flex-1 tw-max-w-md tw-w-full">
          <Card>
            <CardHeader className="tw-text-center">
              <CardTitle>Register</CardTitle>
              <CardDescription>Please enter your registration details</CardDescription>
            </CardHeader>
            <CardContent>
              <AutoForm
                formSchema={formSchema}
                onSubmit={handleRegister}
                className="tw-flex tw-flex-col"
              >
                <AutoFormSubmit className="tw-mt-3">Register</AutoFormSubmit>
              </AutoForm>
            </CardContent>
          </Card>
        </section>
      </div>
    </main>
  );
}
