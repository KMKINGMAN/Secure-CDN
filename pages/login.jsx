import { useState, useContext } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import { AuthContext } from '@/contexts/AuthContext';
import AutoForm, { AutoFormSubmit } from "@/components/ui/auto-form";
import * as z from "zod";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from "@/components/ui/use-toast";
import { API_URL } from '@/utils/apj';

const formSchema = z.object({
  username: z.string().min(1, { message: "Username is required" }),
  password: z.string().min(1, { message: "Password is required" }),
});

export default function Login() {
  const router = useRouter();
  const { login } = useContext(AuthContext);
  const { toast } = useToast();

  const handleLogin = async (data) => {
    try {
      const response = await axios.post(`${API_URL}/auth/login`, data);
      login(response.data.token);
      router.push('/dashboard');
      toast({ title: "Login Successful", description: "You have been logged in successfully" });
    } catch (error) {
      console.error('Login error:', error);
      toast({ title: "Login Error", description: error.response?.data?.message || 'Error logging in' });
    }
  };

  return (
    <main className="tw-p-6">
      <div className="tw-flex tw-flex-col tw-gap-4 tw-h-full tw-items-center tw-justify-center">
        <section className="tw-flex-1 tw-max-w-md tw-w-full">
          <Card>
            <CardHeader className="tw-text-center">
              <CardTitle>Login</CardTitle>
              <CardDescription>Please enter your login details</CardDescription>
            </CardHeader>
            <CardContent>
              <AutoForm
                formSchema={formSchema}
                onSubmit={handleLogin}
                className="tw-flex tw-flex-col"
              >
                <AutoFormSubmit className="tw-mt-3">Login</AutoFormSubmit>
              </AutoForm>
            </CardContent>
            <CardFooter>
              <div className="tw-text-center tw-mt-4">
                <a href="/register" className="tw-text-blue-500">Register</a>
              </div>
            </CardFooter>
          </Card>
        </section>
      </div>
    </main>
  );
}
