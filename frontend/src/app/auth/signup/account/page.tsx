"use client";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import axios from 'axios';

const accountSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z.string()
    .min(6, { message: "Password must be at least 6 characters" })
    .max(50, { message: "Password must not exceed 50 characters" }),
  pan: z.string(),
});

export default function AccountCreationPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  // Initialize form
  const form = useForm<z.infer<typeof accountSchema>>({
    resolver: zodResolver(accountSchema),
    defaultValues: {
      email: "",
      password: "",
      pan: "",
    },
  });

  // Check if user has completed previous steps
  useEffect(() => {
    const pan = sessionStorage.getItem('signup_pan');

    if (!pan) {
      // If previous steps not completed, redirect back
      router.push('/auth/signup');
    }
  }, [router]);

  const onSubmit = async (data: z.infer<typeof accountSchema>) => {
    try {
      setIsLoading(true);
      setError('');
      const pan = sessionStorage.getItem('signup_pan');

      // Send email verification
      await axios.post('/api/auth/verify-email', {
        email: data.email,
        password: data.password,
        pan: pan
      });

      sessionStorage.setItem('signup_email',data.email);

      // Proceed to email verification page
      router.push('/auth/signup/verify-email');
    } catch (error: any) {
      if (error.response?.data?.field === 'email') {
        setError('Email is already registered. Please use another email or try logging in.');
        form.setError('email', {
          type: 'manual',
          message: 'Email is already registered'
        });
      } else {
        setError('An error occurred. Please try again.');
      }
      console.error('Account creation error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='flex p-5 bg-[#0F0F0F] items-center justify-center min-h-screen'>
      <div className='border-2 p-8 bg-[#1C1C1C] text-[#EAEAEA] border-[#333333] rounded-lg shadow-lg w-full max-w-md'>
        <h1 className="text-2xl font-bold mb-6">Create Your Account</h1>
        <p className="mb-6">Choose your email and set a password</p>

        {error && <div className="bg-red-900/30 border border-red-800 text-red-200 p-3 rounded-md mb-4">{error}</div>}

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email Address<span className="text-red-500">*</span></FormLabel>
                  <FormControl>
                    <Input
                      placeholder="your.email@example.com"
                      type="email"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    We'll send a verification code to this email
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password<span className="text-red-500">*</span></FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Choose a password"
                      type="password"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Password must be 6-50 characters long
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-between">
              <Button
                type="button"
                variant="outline"
                onClick={() => router.back()}
                className="bg-[#2A2A2A] hover:bg-[#3A3A3A] text-[#D4D4D4]"
              >
                Back
              </Button>
              <Button
                type="submit"
                className='bg-[#2A2A2A] hover:bg-[#3A3A3A] text-[#D4D4D4]'
                disabled={isLoading}
              >
                {isLoading ? "Processing..." : "Continue"}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
