import React from 'react';
import AutoForm, { AutoFormSubmit } from "@/components/ui/auto-form";
import * as z from "zod";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from "@/components/ui/use-toast";
import { LockClosedIcon } from '@radix-ui/react-icons';

const formSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  subject: z.string().min(1, { message: "Subject is required" }),
  email: z.string().min(1, { message: "Email is required" }),
  description: z.string().min(1, { message: "Description is required" })
});

const Contact = () => {
  const { toast } = useToast();

  return (
    <main className='tw-p-6 tw-bg-gray-50 tw-min-h-screen tw-flex tw-justify-center tw-items-center'>
      <div className='tw-w-full tw-max-w-3xl'>
        <Card className='tw-shadow-lg tw-rounded-lg'>
          <CardHeader className='tw-text-center  tw-rounded-t-lg'>
            <CardTitle className='tw-text-2xl tw-font-bold'>Contact Us</CardTitle>
            <CardDescription className='tw-text-base'>Please fill the form with required details</CardDescription>
          </CardHeader>
          <CardContent className='tw-p-6'>
            <AutoForm
              formSchema={formSchema}
              fieldConfig={{ description: { fieldType: 'textarea' } }}
              onSubmit={() => {
                toast({ title: "Email Sent", description: "We are happy to hear from you" });
              }}
              className='tw-flex tw-flex-col tw-gap-4'
            >
              <AutoFormSubmit className='tw-mt-4 tw-py-2 tw-rounded tw-font-semibold transition tw-duration-200'>
                Send Now
              </AutoFormSubmit>
            </AutoForm>
          </CardContent>
          <CardFooter className='tw-bg-gray-100 tw-rounded-b-lg'>
            <div className='tw-flex tw-justify-center'>
              <LockClosedIcon className='tw-text-gray-600 tw-w-5 tw-h-5' />
            </div>
          </CardFooter>
        </Card>
      </div>
    </main>
  );
};

export default Contact;
