"use client";

import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
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
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import toast from 'react-hot-toast';

const formSchema = z.object({
    caId: z.string().min(6, { message: "CA ID must be at least 6 characters" })
        .regex(/^[A-Z0-9]+$/, {
            message: "CA ID must contain only uppercase letters and numbers"
        }),
    lastName: z.string().min(2, {
        message: "Last name must be at least 2 characters.",
    }),
    middleName: z.string().min(2, {
        message: "Middle name must be at least 2 characters.",
    }),
    firstName: z.string().min(2, {
        message: "First name must be at least 2 characters.",
    }),
    dateOfBirth: z.date({
        required_error: "Date of Birth is required.",
        invalid_type_error: "Invalid date format.",
    }),
    gender: z.enum(["Male", "Female", "Transgender"], {
        message: "Gender is required.",
    }),
    email: z.string().email({ message: "Please enter a valid email address" }),
    address: z.string(),
});

export default function CARegistrationPortal() {
    const router = useRouter();
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            caId: "",
            lastName: "",
            middleName: "",
            firstName: "",
            dateOfBirth: undefined,
            gender: undefined,
            email: "",
            address: "",
        },
        mode: "onChange",
    });

    const onSignup = async (data: z.infer<typeof formSchema>) => {
        try {
            setError('');
            setSuccess('');
            const response = await axios.post('/api/auth/ca-register', data);
            if (response.data.success) {
                setSuccess('Fetched details successfully!');
                toast.success('Registration successful! You will recieve an email with further instructions.');
                setTimeout(() => {
                    router.push('/');
                }, 2000);
            } else {
                console.error("Registration failed:", response.data.message);
            }
        } catch (error: any) {
            if (error.response?.status === 400) {
                setError(error.response?.data.message || "Invalid input.");
            } else if (error.response?.status === 500) {
                setError("Server error occurred. Please try again later.");
            } else {
                setError('An unexpected error occurred. Please try again.');
            }
            console.error("Error during registration:", error);
        }
    };

    return (
        <div className='flex flex-col items-center justify-center min-h-screen bg-[#0F0F0F] p-6'>
            <div className='w-full max-w-2xl p-8 bg-[#1C1C1C] text-[#EAEAEA] border-2 border-[#333333] rounded-lg shadow-lg'>
                {error && <div className="bg-red-900/30 border border-red-800 text-red-200 p-3 rounded-md mb-4">{error}</div>}
                {success && <div className="bg-green-900/30 border border-green-800 text-green-200 p-3 rounded-md mb-4">{success}</div>}
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSignup)} className="space-y-6">
                        <FormField
                            control={form.control}
                            name="caId"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>CA ID<span className="text-red-500">*</span></FormLabel>
                                    <FormControl>
                                        <Input {...field} placeholder='CA ID' className="bg-[#2A2A2A] border-[#333333]" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <div className='flex flex-col md:flex-row gap-6'>
                            <FormField
                                control={form.control}
                                name="lastName"
                                render={({ field }) => (
                                    <FormItem className='flex-1'>
                                        <FormLabel>Last Name<span className="text-red-500">*</span></FormLabel>
                                        <FormControl>
                                            <Input placeholder="Last Name" {...field} className="bg-[#2A2A2A] border-[#333333]" />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="middleName"
                                render={({ field }) => (
                                    <FormItem className='flex-1'>
                                        <FormLabel>Middle Name<span className="text-red-500">*</span></FormLabel>
                                        <FormControl>
                                            <Input placeholder="Middle Name" {...field} className="bg-[#2A2A2A] border-[#333333]" />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="firstName"
                                render={({ field }) => (
                                    <FormItem className='flex-1'>
                                        <FormLabel>First Name<span className="text-red-500">*</span></FormLabel>
                                        <FormControl>
                                            <Input placeholder="First Name" {...field} className="bg-[#2A2A2A] border-[#333333]" />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <div className='flex flex-col md:flex-row gap-6'>
                            <FormField
                                control={form.control}
                                name="dateOfBirth"
                                render={({ field }) => (
                                    <FormItem className='flex-1'>
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
                                                    disabled={(date) => date > new Date()}
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
                                    <FormItem className='flex-1'>
                                        <FormLabel>Gender<span className="text-red-500">*</span></FormLabel>
                                        <FormControl>
                                            <RadioGroup className='flex max-md:flex-col' onValueChange={field.onChange} defaultValue={field.value}>
                                                <FormItem className="flex items-center space-x-2">
                                                    <RadioGroupItem value="Male" id="male" className='data-[state=checked]:bg-white' />
                                                    <FormLabel htmlFor="male">Male</FormLabel>
                                                </FormItem>
                                                <FormItem className="flex items-center space-x-2">
                                                    <RadioGroupItem value="Female" id="female" className='data-[state=checked]:bg-white' />
                                                    <FormLabel htmlFor="female">Female</FormLabel>
                                                </FormItem>
                                                <FormItem className="flex items-center space-x-2">
                                                    <RadioGroupItem value="Transgender" id="transgender" className='data-[state=checked]:bg-white' />
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
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email Address<span className="text-red-500">*</span></FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="your.email@example.com"
                                            className="bg-[#2A2A2A] border-[#333333]"
                                            type="email"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormDescription>
                                        We'll send a verification procedure to this email
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="address"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Address</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Address" {...field} className="bg-[#2A2A2A] border-[#333333]" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <Button type="submit" className='bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:from-blue-600 hover:to-purple-600 rounded-lg px-6 py-3 mt-6'>
                            Register
                        </Button>
                    </form>
                </Form>
            </div>
        </div>
    );
}
