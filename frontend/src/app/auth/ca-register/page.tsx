"use client";

import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
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
import { CalendarIcon, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { toast } from "react-hot-toast";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

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
    address: z.string().optional(),
});

export function CARegistrationForm() {
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear() - 30);
    const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());

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
        setIsSubmitting(true);

        try {
            const response = await fetch('/api/auth/ca-register', {
                method:'POST',
                headers: {
                    "Content-Type": "application/json",
                  },
                body: JSON.stringify(data),
            });
            const responseData = await response.json();
            if (responseData.success) {
                toast.success('Registration successful! You will receive an email with further instructions.', {
                    duration: 3000,
                });
                setTimeout(() => {
                    router.push('/');
                }, 2000);
            } else {
                toast.error(responseData.message);
            }
        } catch (error: any) {
            const errorMessage = error.response?.data.message || 'An unexpected error occurred';
            toast.error('Registration Error' + errorMessage);
        } finally {
            setIsSubmitting(false);
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
        <Card className="w-full max-w-2xl mx-auto shadow-lg border-border dark:border-zinc-800 dark:bg-zinc-900/50">
            <CardContent className="px-4 sm:px-6">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSignup)} className="space-y-4 sm:space-y-6">
                        <FormField
                            control={form.control}
                            name="caId"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>CA ID<span className="text-red-500">*</span></FormLabel>
                                    <FormControl>
                                        <Input 
                                            {...field} 
                                            placeholder='Enter CA ID' 
                                            className="border-gray-300 dark:border-zinc-700 focus:border-primary focus:ring-primary"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <div className='grid grid-cols-1 sm:grid-cols-3 gap-4'>
                            <FormField
                                control={form.control}
                                name="lastName"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Last Name<span className="text-red-500">*</span></FormLabel>
                                        <FormControl>
                                            <Input 
                                                placeholder="Last Name" 
                                                {...field} 
                                                className="border-gray-300 dark:border-zinc-700 focus:border-primary focus:ring-primary"
                                            />
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
                                            <Input 
                                                placeholder="Middle Name" 
                                                {...field} 
                                                className="border-gray-300 dark:border-zinc-700 focus:border-primary focus:ring-primary"
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="firstName"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>First Name<span className="text-red-500">*</span></FormLabel>
                                        <FormControl>
                                            <Input 
                                                placeholder="First Name" 
                                                {...field} 
                                                className="border-gray-300 dark:border-zinc-700 focus:border-primary focus:ring-primary"
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
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
                                            <RadioGroup 
                                                className='flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4' 
                                                onValueChange={field.onChange} 
                                                defaultValue={field.value}
                                            >
                                                <div className="flex items-center space-x-2">
                                                    <RadioGroupItem value="Male" id="male" />
                                                    <FormLabel htmlFor="male" className="cursor-pointer">Male</FormLabel>
                                                </div>
                                                <div className="flex items-center space-x-2">
                                                    <RadioGroupItem value="Female" id="female" />
                                                    <FormLabel htmlFor="female" className="cursor-pointer">Female</FormLabel>
                                                </div>
                                                <div className="flex items-center space-x-2">
                                                    <RadioGroupItem value="Transgender" id="transgender" />
                                                    <FormLabel htmlFor="transgender" className="cursor-pointer">Transgender</FormLabel>
                                                </div>
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
                                            type="email"
                                            {...field}
                                            className="border-gray-300 dark:border-zinc-700 focus:border-primary focus:ring-primary"
                                        />
                                    </FormControl>
                                    <FormDescription className="text-xs sm:text-sm">
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
                                        <Input 
                                            placeholder="Optional Address" 
                                            {...field} 
                                            className="border-gray-300 dark:border-zinc-700 focus:border-primary focus:ring-primary"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <Button 
                            type="submit" 
                            className='w-full bg-primary hover:bg-primary/90 text-primary-foreground dark:hover:bg-primary/80 font-semibold py-2.5 sm:py-3 px-4 rounded-md transition duration-200 ease-in-out text-sm sm:text-base'
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? 'Registering...' : 'Register'}
                        </Button>
                    </form>
                </Form>
            </CardContent>
            <CardFooter className="bg-muted/30 dark:bg-zinc-900/30 border-t border-border/50 dark:border-zinc-800 px-4 sm:px-6 text-xs sm:text-sm text-muted-foreground">
                Already registered? <a href="/auth/ca-login" className="text-primary hover:underline ml-1">Login here</a>
            </CardFooter>
        </Card>
    );
}

export default CARegistrationForm;
