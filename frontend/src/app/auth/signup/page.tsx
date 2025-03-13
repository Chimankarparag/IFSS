"use client"
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import axios from 'axios';

const panSchema = z.object({
  pan: z.string().length(10, { message: "PAN must be exactly 10 characters" })
    .regex(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/, { message: "Invalid PAN format" }),
});

export default function PANVerificationPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const form = useForm<z.infer<typeof panSchema>>({
    resolver: zodResolver(panSchema),
    defaultValues: {
      pan: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof panSchema>) => {
    try {
      setIsLoading(true);
      setError('');
      setSuccess('');
      
      // Call API to verify PAN
      const response = await axios.post('/api/auth/verify-pan', { pan: data.pan });
      
      // If PAN exists, store PAN details in session storage
      if (response.data.panDetails) {
        sessionStorage.setItem('signup_pan', data.pan);
        
        // Show success message briefly before redirecting
        setSuccess('PAN verified successfully! Redirecting...');

        const encodedPan = encodeURIComponent(data.pan);
        
        // Redirect after a short delay to show the success message
        setTimeout(() => {
          router.push(`/auth/signup/details?pan=${encodedPan}`);
        }, 1000);
      } else {
        // If response is successful but no details were provided
        sessionStorage.setItem('signup_pan', data.pan);
        const encodedPan = encodeURIComponent(data.pan);
        router.push(`/auth/signup/details?pan=${encodedPan}`);
      }
    } catch (error: any) {
      if (error.response?.status === 404) {
        setError('PAN not found in our records. Please check and try again.');
      } else if (error.response?.status === 409) {
        setError('An account with this PAN already exists. Please use a different PAN or login.');
      } else {
        setError('An error occurred. Please try again later.');
      }
      console.error('PAN verification error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='flex p-5 bg-[#0F0F0F] items-center justify-center min-h-screen'>
      <div className='border-2 p-8 bg-[#1C1C1C] text-[#EAEAEA] border-[#333333] rounded-lg shadow-lg w-full max-w-md'>
        <h1 className="text-2xl font-bold mb-6">Verify Your PAN</h1>
        <p className="mb-4">Enter your PAN to begin the account creation process</p>

        {error && <div className="bg-red-900/30 border border-red-800 text-red-200 p-3 rounded-md mb-4">{error}</div>}
        {success && <div className="bg-green-900/30 border border-green-800 text-green-200 p-3 rounded-md mb-4">{success}</div>}

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="pan"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>PAN Card Number<span className="text-red-500">*</span></FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="ABCDE1234F" 
                      {...field} 
                      value={field.value.toUpperCase()}
                      onChange={(e) => field.onChange(e.target.value.toUpperCase())}
                      className="bg-[#2A2A2A] border-[#3D3D3D] text-[#EAEAEA]"
                      disabled={isLoading}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button 
              type="submit" 
              className='bg-[#2A2A2A] hover:bg-[#3A3A3A] text-[#D4D4D4] w-full'
              disabled={isLoading}
            >
              {isLoading ? "Verifying..." : "Proceed"}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
