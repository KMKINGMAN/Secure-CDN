import React, { useState, useEffect } from 'react';
import AutoForm, { AutoFormSubmit } from "@/components/ui/auto-form";
import * as z from "zod";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from "@/components/ui/use-toast";
import axios from 'axios';
import { API_URL } from '@/utils/apj';
const formSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  dob: z.date(),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
});

const Settings = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    dob: '',
    password: '',
  });
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`${API_URL}/auth/settings`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setFormData(response.data);
        setLoading(false);
      } catch (error) {
        setMessage(error.response?.data?.message || 'Error fetching settings');
        setLoading(false);
      }
    };

    fetchSettings();
  }, []);

  const handleSubmit = async (data) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.put(`${API_URL}/auth/settings`, data, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setMessage(response.data.message);
      toast({ title: "Settings Updated", description: "Your settings have been updated successfully" });
    } catch (error) {
      setMessage(error.response?.data?.message || 'Error updating settings');
      toast({ title: "Error", description: error.response?.data?.message || 'Error updating settings' });
    }
  };

  if (loading) {
    return <div className="tw-container tw-mx-auto tw-p-6">Loading...</div>;
  }

  return (
    <main className="tw-p-6">
      <div className="tw-flex tw-flex-col tw-gap-4">
        <section className="tw-flex-1">
          <Card>
            <CardHeader className="tw-text-center">
              <CardTitle>Settings</CardTitle>
              <CardDescription>Update your account settings</CardDescription>
            </CardHeader>
            <CardContent>
              <AutoForm
                formSchema={formSchema}
                initialValues={formData}
                onSubmit={handleSubmit}
                className="tw-flex tw-flex-col"
              >
                <AutoFormSubmit className="tw-mt-3">Save Settings</AutoFormSubmit>
              </AutoForm>
            </CardContent>
            <CardFooter>
              {message && <div className="tw-text-center tw-text-red-500">{message}</div>}
            </CardFooter>
          </Card>
        </section>
      </div>
    </main>
  );
};

export default Settings;
