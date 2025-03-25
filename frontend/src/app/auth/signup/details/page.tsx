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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@radix-ui/react-select';

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
    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear() - 30);
    const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());


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

    // Generate years for the dropdown (from 1900 to current year)
    const years = Array.from(
        { length: new Date().getFullYear() - 1899 },
        (_, i) => new Date().getFullYear() - i
    );

    // Generate months for the dropdown
    const months = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];


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
                                        <FormItem className='flex flex-col'>
                                            <FormLabel>Date of Birth<span className="text-red-500">*</span></FormLabel>
                                            <Popover>
                                                <PopoverTrigger asChild>
                                                    <FormControl>
                                                        <Button
                                                            variant="outline"
                                                            className={cn(
                                                                "w-full pl-3 text-left font-normal border-gray-300 dark:border-zinc-700",
                                                                !field.value && "text-muted-foreground"
                                                            )}
                                                        >
                                                            {field.value ? (
                                                                format(field.value, "dd MMM yyyy")
                                                            ) : (
                                                                <span>Pick a date</span>
                                                            )}
                                                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                        </Button>
                                                    </FormControl>
                                                </PopoverTrigger>
                                                <PopoverContent className="w-auto p-0 max-w-[95vw] sm:max-w-none" align="start">
                                                    <div className="p-3 border-b border-border/50 dark:border-zinc-800 flex flex-col sm:flex-row gap-2 sm:gap-0 sm:justify-between sm:items-center">
                                                        <Select
                                                            value={selectedMonth.toString()}
                                                            onValueChange={(value) => setSelectedMonth(parseInt(value))}
                                                        >
                                                            <SelectTrigger className="w-full sm:w-[120px] border-none focus:ring-0">
                                                                <SelectValue placeholder="Month" />
                                                            </SelectTrigger>
                                                            <SelectContent>
                                                                {months.map((month, index) => (
                                                                    <SelectItem key={month} value={index.toString()}>
                                                                        {month}
                                                                    </SelectItem>
                                                                ))}
                                                            </SelectContent>
                                                        </Select>

                                                        <Select
                                                            value={selectedYear.toString()}
                                                            onValueChange={(value) => setSelectedYear(parseInt(value))}
                                                        >
                                                            <SelectTrigger className="w-full sm:w-[100px] border-none focus:ring-0">
                                                                <SelectValue placeholder="Year" />
                                                            </SelectTrigger>
                                                            <SelectContent className="max-h-[200px]">
                                                                {years.map((year) => (
                                                                    <SelectItem key={year} value={year.toString()}>
                                                                        {year}
                                                                    </SelectItem>
                                                                ))}
                                                            </SelectContent>
                                                        </Select>
                                                    </div>
                                                    <Calendar
                                                        mode="single"
                                                        selected={field.value}
                                                        onSelect={(date) => {
                                                            field.onChange(date);
                                                            if (date) {
                                                                setSelectedYear(date.getFullYear());
                                                                setSelectedMonth(date.getMonth());
                                                            }
                                                        }}
                                                        month={new Date(selectedYear, selectedMonth)}
                                                        onMonthChange={(date) => {
                                                            setSelectedMonth(date.getMonth());
                                                            setSelectedYear(date.getFullYear());
                                                        }}
                                                        disabled={(date) =>
                                                            date > new Date() ||
                                                            date < new Date("1900-01-01")
                                                        }
                                                        initialFocus
                                                        className="bg-background"
                                                        classNames={{
                                                            root: "bg-background border-none",
                                                            head: "text-foreground",
                                                            nav: "space-x-1",
                                                            nav_button: "border-none bg-primary/10 text-foreground hover:bg-primary/20",
                                                            caption: "flex justify-center pt-1 relative items-center",
                                                            caption_label: "text-foreground text-sm font-medium",
                                                            cell: "text-foreground hover:bg-primary/10 rounded-md",
                                                            day: "h-9 w-9 p-0 font-normal aria-selected:opacity-100",
                                                            day_selected: "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
                                                            day_today: "bg-accent text-accent-foreground",
                                                            day_outside: "text-muted-foreground opacity-50",
                                                            day_disabled: "text-muted-foreground opacity-50",
                                                        }}
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
                                                        <RadioGroupItem value="Female" id="female" />
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
