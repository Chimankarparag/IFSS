"use client";
import { useState, useEffect, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import Inbox from '@/components/inbox';
import {
    LayoutDashboard,
    Users,
    FileText,
    Settings,
    Bell,
    LogOut,
    Search,
    Menu,
    X,
    Upload,
    FileEdit,
    BarChart3
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
    CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge"; // Ensure correct import
import { Separator } from "@/components/ui/separator";
import { toast } from "react-hot-toast";
import { cn } from "@/lib/utils";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface UserData {
    firstName: string;
    lastName: string;
    middleName: string;
    email: string;
    panNumber: string;
    lastLogin: string;
    pendingActions: number;
    recentActivity: { id: number; action: string; date: string; status: string }[];
    stats: { title: string; value: number; icon: React.ReactNode }[];
    [x: string]: any;
}

export default function DashboardPage() {
    const router = useRouter();
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [isLoading, setIsLoading] = useState(true);
    const [user, setUser] = useState<UserData | null>(null);

    useEffect(() => {
        const fetchUserData = async () => {
            try {

                const response = await fetch('/api/user/profile', {
                    method: 'GET',
                });

                if (!response.ok) throw new Error('Failed to fetch user data');

                const userData = await response.json();
                setUser(userData);

            } catch (error) {
                console.error('Error fetching user data:', error);
                router.push('/auth/login');
            } finally {
                setIsLoading(false);
            }
        };

        fetchUserData();
    }, [router]);

    const handleLogout = async () => {
        try {
            sessionStorage.clear();
            const response = await fetch('/api/auth/logout/', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (response.ok) {
                const data = await response.json();
                toast.success(data.message || 'Logged out successfully');
                router.push('/');
            } else {
                toast.error('Logout failed');
            }
        } catch (error) {
            toast.error('An error occurred during logout');
            console.error('Logout error:', error);
        }
    };

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-[#0F0F0F]">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
            </div>
        );
    }

    if (!user) {
        return null; // or a loading state
    }

    return (
        <div className="flex flex-col md:flex-row min-h-screen bg-[#0F0F0F] text-slate-100">
            {/* Mobile menu button */}
            <div className="md:hidden fixed top-4 left-4 z-50">
                <Button
                    variant="outline"
                    size="icon"
                    onClick={toggleSidebar}
                    className="bg-[#1A1A1A] border-[#333333] hover:bg-[#2A2A2A]"
                >
                    {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
                </Button>
            </div>

            {/* Sidebar */}
            <div
                className={`${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 transition-transform duration-300 fixed md:static top-0 left-0 h-full w-64 bg-[#1A1A1A] p-4 border-r border-[#333333] overflow-y-auto z-40`}
            >
                <div className="flex items-center justify-center mb-8 p-4">
                    <h1 className="text-xl font-bold text-blue-400">IFSS</h1>
                </div>

                <div className="mb-6 px-3">
                    <div className="flex items-center gap-3 mb-3">
                        <Avatar>
                            <AvatarImage src="/placeholder-avatar.jpg" alt={user.name} />
                            <AvatarFallback className="bg-blue-500/20 text-blue-400">
                                {user?.firstName[0]}
                            </AvatarFallback>

                        </Avatar>
                        <div className="overflow-hidden">
                            <p className="font-medium truncate">{user.firstName}</p>
                            <p className="text-sm text-slate-400 truncate">{user.pan_number}</p>
                        </div>
                    </div>
                </div>

                <Separator className="my-4 bg-[#333333]" />

                <nav className="space-y-1">
                    <NavItem icon={<LayoutDashboard size={18} />} label="Dashboard" active />
                    <NavItem icon={<FileText size={18} />} label="Documents" />
                    <NavItem icon={<Users size={18} />} label="Account" />
                    <NavItem icon={<Bell size={18} />} label="Notifications" badge={user.pendingActions} />
                    <NavItem icon={<Settings size={18} />} label="Settings" />

                    <div className="pt-8">
                        <Button
                            variant="destructive"
                            className="w-full flex items-center justify-start gap-2 mt-auto bg-red-900/30 hover:bg-red-900/50 text-red-300"
                            onClick={handleLogout}
                        >
                            <LogOut size={18} />
                            <span>Logout</span>
                        </Button>
                    </div>
                </nav>
            </div>

            {/* Main content */}
            <div className="flex-1 p-4 md:p-8 overflow-y-auto mt-12 md:mt-0">
                <header className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
                    <div>
                        <h1 className="text-2xl font-bold">Dashboard</h1>
                        <p className="text-slate-400 mt-1">Welcome back, {user.name}</p>
                    </div>

                    <div className="flex gap-4 items-center">
                        <div className="relative w-full md:w-64">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-500" size={18} />
                            <Input
                                type="text"
                                placeholder="Search..."
                                className="pl-10 pr-4 py-2 w-full bg-[#1A1A1A] border-[#333333] focus:border-blue-600 focus:ring-blue-600"
                            />
                        </div>

                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="outline" size="icon" className="bg-[#1A1A1A] border-[#333333] hover:bg-[#2A2A2A]">
                                    <Bell size={18} />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-72 bg-[#1A1A1A] border-[#333333] text-slate-100">
                                <DropdownMenuLabel>Notifications</DropdownMenuLabel>
                                <DropdownMenuSeparator className="bg-[#333333]" />
                                <DropdownMenuItem className="focus:bg-[#2A2A2A] focus:text-slate-100">
                                    <span className="font-medium">Document approval pending</span>
                                </DropdownMenuItem>
                                <DropdownMenuItem className="focus:bg-[#2A2A2A] focus:text-slate-100">
                                    <span className="font-medium">Profile verification required</span>
                                </DropdownMenuItem>
                                <DropdownMenuSeparator className="bg-[#333333]" />
                                <DropdownMenuItem className="justify-center focus:bg-[#2A2A2A] focus:text-slate-100">
                                    <Button variant="ghost" className="w-full text-blue-400 hover:text-blue-300 hover:bg-blue-900/20">View all</Button>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </header>

                {/* Stats cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    {(user?.stats || []).map((stat, index) => (
                        <Card key={index} className="overflow-hidden bg-[#1A1A1A] border-[#333333]">
                            <CardHeader className="pb-2 flex flex-row items-center justify-between">
                                <CardTitle className="text-lg">{stat.title}</CardTitle>
                                <div className="p-2 bg-slate-800/50 rounded-full">
                                    {stat.icon}
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="text-3xl font-bold">{stat.value}</div>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                <div className="grid grid-cols-1 gap-6 mb-8">
                    <Inbox />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    {/* User info card */}
                    <Card className="md:col-span-1 bg-[#1A1A1A] border-[#333333]">
                        <CardHeader>
                            <CardTitle>Account Summary</CardTitle>
                            <CardDescription className="text-slate-400">Your PAN information</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                <div>
                                    <div className="text-sm text-slate-400">PAN Number</div>
                                    <div className="font-medium">{user.panNumber}</div>
                                </div>
                                <div>
                                    <div className="text-sm text-slate-400">Last Login</div>
                                    <div className="font-medium">{user.lastLogin}</div>
                                </div>
                                <div>
                                    <div className="text-sm text-slate-400">Pending Actions</div>
                                    <div className="font-medium text-amber-400">{user.pendingActions} actions require attention</div>
                                </div>
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Button variant="outline" className="w-full bg-[#232323] border-[#333333] hover:bg-[#2A2A2A] text-slate-100">
                                View Details
                            </Button>
                        </CardFooter>
                    </Card>

                    {/* Recent activity */}
                    <Card className="md:col-span-2 bg-[#1A1A1A] border-[#333333]">
                        <CardHeader>
                            <div className="flex items-center justify-between">
                                <div>
                                    <CardTitle>Recent Activity</CardTitle>
                                    <CardDescription className="text-slate-400">Your latest account activities</CardDescription>
                                </div>
                                <Button variant="ghost" size="sm" className="text-blue-400 hover:text-blue-300 hover:bg-blue-900/20">
                                    View All
                                </Button>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {(user?.recentActivity || []).map((activity) => (
                                    <div key={activity.id} className="flex items-center justify-between pb-4 border-b border-[#333333] last:border-b-0 last:pb-0">
                                        <div className="flex items-center gap-3">
                                            <div className={cn("w-2 h-2 rounded-full", {
                                                "bg-emerald-400": activity.status === "completed",
                                                "bg-amber-400": activity.status === "pending",
                                                "bg-blue-400": activity.status === "processing"
                                            })}></div>
                                            <div>
                                                <div className="font-medium">{activity.action}</div>
                                                <div className="text-sm text-slate-400">{activity.date}</div>
                                            </div>
                                        </div>
                                        <Badge variant={activity.status === "completed" ? "outline" : "secondary"}
                                            className={cn({
                                                "border-emerald-800 bg-emerald-900/20 text-emerald-400": activity.status === "completed",
                                                "bg-amber-900/20 text-amber-400": activity.status === "pending",
                                                "bg-blue-900/20 text-blue-400": activity.status === "processing"
                                            })}>
                                            {activity.status}
                                        </Badge>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Quick actions */}
                <Card className="bg-[#1A1A1A] border-[#333333]">
                    <CardHeader>
                        <CardTitle>Quick Actions</CardTitle>
                        <CardDescription className="text-slate-400">Common tasks you can perform</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                            <Button className="w-full flex items-center gap-2 justify-center bg-blue-600 hover:bg-blue-700">
                                <Upload size={18} />
                                <span>Upload Document</span>
                            </Button>
                            <Button variant="outline" className="w-full flex items-center gap-2 justify-center bg-[#232323] border-[#333333] hover:bg-[#2A2A2A] text-slate-100">
                                <FileEdit size={18} />
                                <span>Update Profile</span>
                            </Button>
                            <Button variant="outline" className="w-full flex items-center gap-2 justify-center bg-[#232323] border-[#333333] hover:bg-[#2A2A2A] text-slate-100">
                                <BarChart3 size={18} />
                                <span>View Reports</span>
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}

// Navigation Item Component
function NavItem({
    icon,
    label,
    active = false,
    badge
}: {
    icon: React.ReactNode;
    label: string;
    active?: boolean;
    badge?: number;
}) {
    return (
        <div
            className={`
        flex items-center justify-between px-3 py-2 rounded-md cursor-pointer transition-colors
        ${active
                    ? 'bg-[#2A2A2A] text-blue-400'
                    : 'text-slate-400 hover:bg-[#232323] hover:text-slate-200'
                }
      `}
        >
            <div className="flex items-center gap-3">
                {icon}
                <span>{label}</span>
            </div>
            {badge && (
                <Badge variant="destructive" className="text-xs bg-red-900/60 text-red-200 hover:bg-red-900/80">{badge}</Badge>
            )}
        </div>
    );
}
