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
import { toast } from "react-hot-toast";
import Link from "next/link";
import { RefreshCw as Reload } from "lucide-react";

// Define the schema for login validation
const loginSchema = z.object({
    panNumber: z
        .string()
        .min(10, { message: "PAN number must be 10 characters" })
        .max(10, { message: "PAN number must be 10 characters" })
        .regex(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/, {
            message: "Invalid PAN format. Example: ABCDE1234F"
        }),
    password: z
        .string()
        .min(8, { message: "Password must be at least 8 characters" }),
    captcha: z
        .string()
        .min(1, { message: "Please enter the captcha code" }),
});

export default function LoginPage() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [captchaImage, setCaptchaImage] = useState('');
    const [captchaSessionId, setCaptchaSessionId] = useState('');
    const [isCaptchaLoading, setIsCaptchaLoading] = useState(true);

    // Initialize form with zod schema resolver
    const form = useForm<z.infer<typeof loginSchema>>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            panNumber: "",
            password: "",
            captcha: "",
        },
    });

    // Replace the regenerateCaptcha function
    const regenerateCaptcha = async () => {
        try {
            setIsCaptchaLoading(true);
            const response = await fetch('/api/auth/generate-captcha');

            if (!response.ok) {
                throw new Error('Failed to generate captcha');
            }

            const data = await response.json();
            setCaptchaImage(data.image);
            setCaptchaSessionId(data.sessionId);
            form.setValue("captcha", "");
        } catch (error) {
            console.error('Captcha generation error:', error);
            // Fallback to a simple message if API fails
            setCaptchaImage('');
        } finally {
            setIsCaptchaLoading(false);
        }
    };

    // Load captcha on component mount
    useEffect(() => {
        regenerateCaptcha();
    }, []);

    // Modified form submission
    const onSubmit = async (data: z.infer<typeof loginSchema>) => {
        try {
            setIsLoading(true);
            setError('');

            const response = await fetch('/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    panNumber: data.panNumber,
                    password: data.password,
                    captcha: data.captcha,
                    captchaSessionId
                }),
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.message || 'Authentication failed');
            }

            toast.success('Login successful!');
            router.push('/profile');
        } catch (error: any) {
            setError(error.message || 'Invalid credentials or captcha');
            regenerateCaptcha();
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-[#0F0F0F]">
            <div className="w-full max-w-md p-6 bg-[#1C1C1C] text-[#EAEAEA] border-2 border-[#333333] rounded-lg shadow-lg">
                <h1 className="text-2xl font-bold mb-6 text-center">Account Login</h1>

                {isLoading && (
                    <div className="bg-blue-900/30 border border-blue-800 text-blue-200 p-3 rounded-md mb-4">
                        Logging in...
                    </div>
                )}

                {error && (
                    <div className="bg-red-900/30 border border-red-800 text-red-200 p-3 rounded-md mb-4">
                        {error}
                    </div>
                )}

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <FormField
                            control={form.control}
                            name="panNumber"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>
                                        PAN Number<span className="text-red-500">*</span>
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            placeholder="ABCDE1234F"
                                            className="bg-[#2A2A2A] border-[#333333] text-[#EAEAEA]"
                                            autoComplete="off"
                                        />
                                    </FormControl>
                                    <FormDescription>Enter your 10-character PAN number</FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>
                                        Password<span className="text-red-500">*</span>
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            type="password"
                                            placeholder="Enter your password"
                                            className="bg-[#2A2A2A] border-[#333333] text-[#EAEAEA]"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="captcha"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>
                                        Captcha<span className="text-red-500">*</span>
                                    </FormLabel>
                                    <div className="flex flex-col sm:flex-row gap-4 mb-2">
                                        <div className="flex-none bg-[#2A2A2A] border border-[#333333] rounded-md p-2 flex items-center justify-center">
                                            {isCaptchaLoading ? (
                                                <div className="h-10 w-24 flex items-center justify-center">
                                                    <span className="text-sm text-gray-400">Loading...</span>
                                                </div>
                                            ) : captchaImage ? (
                                                <img
                                                    src={captchaImage}
                                                    alt="CAPTCHA"
                                                    className="h-10"
                                                />
                                            ) : (
                                                <div className="h-10 w-24 flex items-center justify-center">
                                                    <span className="text-sm text-red-400">Error loading captcha</span>
                                                </div>
                                            )}
                                        </div>
                                        <div className="flex-1 flex items-center gap-2">
                                            <FormControl>
                                                <Input
                                                    {...field}
                                                    placeholder="Enter captcha"
                                                    className="bg-[#2A2A2A] border-[#333333] text-[#EAEAEA]"
                                                    autoComplete="off"
                                                />
                                            </FormControl>
                                            <Button
                                                type="button"
                                                variant="outline"
                                                size="icon"
                                                onClick={regenerateCaptcha}
                                                className="bg-[#2A2A2A] border-[#333333] hover:bg-[#3A3A3A]"
                                            >
                                                <Reload className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </div>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <div className="flex justify-end">
                            <Link
                                href="/auth/forgot-password"
                                className="text-sm text-blue-400 hover:text-blue-300"
                            >
                                Forgot Password?
                            </Link>
                        </div>

                        <Button
                            type="submit"
                            disabled={isLoading}
                            className="w-full"
                        >
                            {isLoading ? 'Logging in...' : 'Login'}
                        </Button>

                        <div className="text-center mt-4">
                            <span className="text-sm text-gray-400">Don't have an account? </span>
                            <Link
                                href="/auth/signup"
                                className="text-sm text-blue-400 hover:text-blue-300"
                            >
                                Register
                            </Link>
                        </div>
                    </form>
                </Form>
            </div>
        </div>
    );
}