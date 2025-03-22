"use client";
import React from 'react';
import { LoginForm } from "@/components/login-form"
import {useRouter} from 'next/navigation';
import toast from 'react-hot-toast';

export default function Page() {

  const router = useRouter();

  const handleSubmit = async (data: { adminId: string; password: string }) => {
    try {
      const response = await fetch("/api/auth/admin/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        router.push("/admin/dashboard");
      } else {
        toast.error("Invalid credentials");
      }
    } catch (error) {
      console.error("Error during login:", error);
      toast.error("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <LoginForm onSubmit={handleSubmit} />
      </div>
    </div>
  )
}
