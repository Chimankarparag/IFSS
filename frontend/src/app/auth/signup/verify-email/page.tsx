"use client";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { z } from "zod";
import { Controller, useForm } from "react-hook-form";
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
import { toast } from "react-hot-toast"
import axios from 'axios';
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";

// Define the schema for the verification code
const verificationSchema = z.object({
  verificationCode: z.string()
    .min(6, { message: "Verification code must be 6 digits" })
    .max(6, { message: "Verification code must be 6 digits" })
    .regex(/^\d+$/, { message: "Verification code must contain only numbers" }),
});

export default function EmailVerificationPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [email, setEmail] = useState('');
  const [resendDisabled, setResendDisabled] = useState(false);
  const [countdown, setCountdown] = useState(0);

  // Initialize form with zod schema resolver
  const form = useForm<z.infer<typeof verificationSchema>>({
    resolver: zodResolver(verificationSchema),
    defaultValues: {
      verificationCode: "",
    },
  });

  // Retrieve email from session storage on component mount
  useEffect(() => {
    const email = sessionStorage.getItem('signup_email');

    if (!email) {
      // Redirect if no account data is found
      router.push('/auth/signup');
      return;
    }

    try {
      setEmail(email);
      form.setValue("verificationCode", ""); // Reset verification code when email changes
    } catch (error) {
      console.error('Error parsing account data:', error);
      router.push('/auth/signup');
    }
  }, [router, form]);

  // Manage the countdown timer for the resend button
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else if (countdown === 0 && resendDisabled) {
      setResendDisabled(false);
    }
  }, [countdown, resendDisabled]);

  // Handle form submission
  const onSubmit = async (data: z.infer<typeof verificationSchema>) => {
    if (!email) {
      setError('Email address is missing. Please go back to the signup page.');
      return;
    }
    
    try {
      setIsLoading(true);
      setError('');
      
      // Send verification code to the backend
      await axios.post('/api/auth/verify-otp', {
        email: email,
        code: data.verificationCode
      });

      // Redirect to set password page on success
      toast('Registration Complete!', {
        icon: '🎊',
      });
      router.push('/auth/login');
    } catch (error: any) {
      if (error.response?.data?.message) {
        setError(error.response.data.message);
      } else if (error.response?.status === 400 || error.response?.status === 409) {
        setError('Invalid or expired verification code. Please try again.');
      } else {
        setError('An error occurred. Please try again.');
      }
      console.error('Email verification error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle resending the verification code
  const handleResendCode = async () => {
    if (!email) {
      setError('Email address is missing. Please go back to the signup page.');
      return;
    }
    
    try {
      setResendDisabled(true);
      setCountdown(60 * 2); // 60 * 2 seconds cooldown

      await axios.post('/api/auth/verify-email', {
        email: email,
      });

      // Notify the user
      toast('Verification code resent!', {
        icon: '📧',
      });
      
      // Clear any previous errors
      setError('');
    } catch (error) {
      setError('Failed to resend verification code. Please try again later.');
      console.error('Resend code error:', error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-[#0F0F0F]">
      <div className="w-full max-w-md p-6 bg-[#1C1C1C] text-[#EAEAEA] border-2 border-[#333333] rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold mb-4 text-center">Verify Your Email</h1>
        <p className="mb-6 text-center">
          We've sent a 6-digit verification code to{' '}
          <span className="font-medium">{email || 'your email'}</span>
        </p>

        {isLoading && (
          <div className="bg-blue-900/30 border border-blue-800 text-blue-200 p-3 rounded-md mb-4">
            Verifying...
          </div>
        )}

        {error && (
          <div className="bg-red-900/30 border border-red-800 text-red-200 p-3 rounded-md mb-4">
            {error}
          </div>
        )}

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
            <FormField
              control={form.control}
              name="verificationCode"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Verification Code<span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Controller
                      name={field.name}
                      control={form.control}
                      render={({ field }) => (
                        <InputOTP 
                          maxLength={6}
                          value={field.value || ""} 
                          onChange={field.onChange}
                        >
                          <InputOTPGroup>
                            <InputOTPSlot index={0} />
                            <InputOTPSlot index={1} />
                            <InputOTPSlot index={2} />
                          </InputOTPGroup>
                          <InputOTPSeparator />
                          <InputOTPGroup>
                            <InputOTPSlot index={3} />
                            <InputOTPSlot index={4} />
                            <InputOTPSlot index={5} />
                          </InputOTPGroup>
                        </InputOTP>
                      )}
                    />
                  </FormControl>
                  <FormDescription>Enter the 6-digit code sent to your email</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex flex-col items-center sm:flex-row sm:justify-between sm:items-center mt-6">
              <Button
                type="button"
                variant="outline"
                onClick={handleResendCode}
                disabled={resendDisabled}
                className="mb-4 sm:mb-0 w-full sm:w-auto bg-[#2A2A2A] hover:bg-[#3A3A3A] text-[#D4D4D4]"
              >
                {resendDisabled ? `Resend in ${countdown}s` : 'Resend Code'}
              </Button>
              <Button 
                type="submit" 
                disabled={isLoading} 
                className="w-full sm:w-auto"
              >
                {isLoading ? 'Verifying...' : 'Verify'}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}