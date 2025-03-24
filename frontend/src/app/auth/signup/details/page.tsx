"use client"
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns"; // Format date
import { CalendarIcon } from "lucide-react"; // Import Calendar Icon
import { cn } from "@/lib/utils"; // Utility function for classnames
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const formSchema = z.object({
    pan: z.string(),
    lastName: z.string().min(2, {
        message: "Lastname must be at least 2 characters.",
    }),
    middleName: z.string().min(2, {
        message: "Middlename must be at least 2 characters.",
    }),
    firstName: z.string().min(2, {
        message: "Firstname must be at least 2 characters.",
    }),
    dateOfBirth: z.date({
        required_error: "Date of Birth is required.",
        invalid_type_error: "Invalid date format.",
    }),
    gender: z.enum(["Male", "Female", "Transgender"], {
        message: "Gender is required.",
    }),
    address: z.string(),
});

export default function SignupPage() {
    const router = useRouter();

    const pan = sessionStorage.getItem('signup_pan');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');


    // ✅ Define `useForm` inside the component
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            pan: pan || "",
            lastName: "",
            middleName: "",
            firstName: "",
            dateOfBirth: undefined,
            gender: undefined,
            address: "",
        },
        mode: "onChange",
    });


    const onSignup = async (data: z.infer<typeof formSchema>, event?: React.BaseSyntheticEvent) => {
        try {
            setError('');
            setSuccess('');
            const response = await axios.post('/api/auth/get-details', data);
            if (response.data.success) {
                // Redirect to email verification page or handle verification logic
                setSuccess('Fetched details successfully! Redirecting...');
                setTimeout(() => {
                router.push('/auth/signup/account');
                }, 1000);
            } else {
                console.error("Registration failed:", response.data.message);
            }
        } catch (error: any) {
            if (error.response?.status === 400) {
                setError(error.response?.message);
            } else if (error.response?.status === 500) {
                setError(error.response?.message);
            } else {
                setError('An error occurred. Please try again later.');
            }
            console.error("Error during registration:", error);
        }
    };


    return (
        <>
            <div className='flex p-5 bg-[#0F0F0F] items-center justify-center h-screen'>
                <div className='border-2 p-8 bg-[#1C1C1C] text-[#EAEAEA] border-[#333333] rounded-lg shadow-lg w-full max-w-2xl'>
                    {error && <div className="bg-red-900/30 border border-red-800 text-red-200 p-3 rounded-md mb-4">{error}</div>}
                    {success && <div className="bg-green-900/30 border border-green-800 text-green-200 p-3 rounded-md mb-4">{success}</div>}
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSignup)} className="space-y-6">

                            <FormField
                                control={form.control}
                                name="pan"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>PAN</FormLabel>
                                        <FormControl>
                                            <Input {...field} readOnly className="cursor-not-allowed" />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <div className='flex max-md:flex-col md:items-end justify-between gap-5'>
                                <div className='flex flex-col gap-5 md:w-1/2'>
                                    <FormField
                                        control={form.control}
                                        name="lastName"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Last Name<span className="text-red-500">*</span></FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Last Name" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="middleName"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Middle Name<span className="text-red-500">*</span></FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Middle Name" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <FormField
                                    control={form.control}
                                    name="firstName"
                                    render={({ field }) => (
                                        <FormItem className='md:w-1/2'>
                                            <FormLabel>First Name<span className="text-red-500">*</span></FormLabel>
                                            <FormControl>
                                                <Input placeholder="First Name" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>

                            <div className='flex max-md:flex-col max-md:gap-5 justify-between md:items-center'>
                                <FormField
                                    control={form.control}
                                    name="dateOfBirth"
                                    render={({ field }) => (
                                        <FormItem className="flex flex-col md:w-1/3">
                                            <FormLabel>Date of Birth<span className="text-red-500">*</span></FormLabel>
                                            <Popover>
                                                <PopoverTrigger asChild>
                                                    <FormControl>
                                                        <button
                                                            type="button"
                                                            className={cn(
                                                                "flex w-full items-center justify-between rounded-md border px-3 py-2 text-left text-sm",
                                                                !field.value && "text-muted-foreground"
                                                            )}
                                                        >
                                                            {field.value ? format(field.value, "dd-MMM-yyyy") : "Pick a date"}
                                                            <CalendarIcon className="h-4 w-4 opacity-50" />
                                                        </button>
                                                    </FormControl>
                                                </PopoverTrigger>
                                                <PopoverContent align="start" className="w-auto p-0">
                                                    <Calendar
                                                        mode="single"
                                                        selected={field.value}
                                                        onSelect={field.onChange}
                                                        disabled={(date) => date > new Date()} // Disable future dates
                                                        initialFocus
                                                    />
                                                </PopoverContent>
                                            </Popover>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="gender"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Gender<span className="text-red-500">*</span></FormLabel>
                                            <FormControl>
                                                <RadioGroup className='flex' onValueChange={field.onChange} defaultValue={field.value}>
                                                    <FormItem className="flex items-center space-x-2">
                                                        <RadioGroupItem value="Male" id="male" />
                                                        <FormLabel htmlFor="male">Male</FormLabel>
                                                    </FormItem>
                                                    <FormItem className="flex items-center space-x-2">
                                                        <RadioGroupItem value="Female" id="female"  />
                                                        <FormLabel htmlFor="female">Female</FormLabel>
                                                    </FormItem>
                                                    <FormItem className="flex items-center space-x-2">
                                                        <RadioGroupItem value="Transgender" id="transgender" />
                                                        <FormLabel htmlFor="transgender">Transgender</FormLabel>
                                                    </FormItem>
                                                </RadioGroup>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>

                            <FormField
                                control={form.control}
                                name="address"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Address</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Address" {...field} className="" />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <Button type="submit" className='bg-[#2A2A2A] text-[#D4D4D4] hover:bg-slate-900'>Sign Up</Button>
                        </form>
                    </Form>
                </div>
            </div>
        </>
    );
}

function setError(arg0: string) {
    throw new Error('Function not implemented.');
}
