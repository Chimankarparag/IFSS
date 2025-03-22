"use client";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
    Mail,
    LogOut,
    Search,
    Menu,
    X,
    PlusCircle,
    Trash2,
    RefreshCw,
    Users,
    BarChart3,
    FileText,
    Settings,
    Filter
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
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { toast } from "react-hot-toast";
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter,
} from "@/components/ui/dialog";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function AdminDashboardPage() {
    const router = useRouter();
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [isLoading, setIsLoading] = useState(true);
    const [adminData, setAdminData] = useState<{ name: string; adminId: string } | null>(null);
    const [messages, setMessages] = useState<Array<{
        id: number;
        to: { id: number; name: string; caId: string };
        subject: string;
        content: string;
        date: string;
        isRead?: boolean;
        status: string;
    }>>([]);
    const [selectedMessage, setSelectedMessage] = useState<{
        id: number;
        to: { id: number; name: string; caId: string };
        subject: string;
        content: string;
        date: string;
        isRead?: boolean;
        status: string;
    } | null>(null);
    const [newMessageOpen, setNewMessageOpen] = useState(false);
    const [newMessageSubject, setNewMessageSubject] = useState('');
    const [newMessageContent, setNewMessageContent] = useState('');
    const [newMessageRecipient, setNewMessageRecipient] = useState('');
    const [caUsers, setCAUsers] = useState<Array<{
        id: number;
        _id: string;
        name: string;
        caId: string;
        email: string;
        status: string;
    }>>([]);
    const [activeSection, setActiveSection] = useState('messages');
    const [activeTab, setActiveTab] = useState('all');
    const [dashboardStats, setDashboardStats] = useState({
        totalCAs: 0,
        activeCAs: 0,
        pendingCAs: 0,
        totalMessages: 0,
        unreadMessages: 0,
    });

    const fetchData = async () => {
        try {
            setIsLoading(true);

            const response = await fetch('/api/admin/dashboard');
            const data = await response.json();

            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }

            setAdminData({
                name: data.name,
                adminId: data.adminId,
            });

            // Mock messages data
            const mockMessages = [
                {
                    id: 1,
                    to: { id: 1, name: "Rahul Sharma", caId: "CA12345" },
                    subject: "Account Verification Update",
                    content: "Dear Rahul,\n\nWe have reviewed your documentation and verified your CA credentials. Your account has been fully approved.\n\nPlease let us know if you have any questions.\n\nRegards,\nAdmin Team",
                    date: "2025-03-15T10:30:00",
                    status: "delivered",
                },
                {
                    id: 2,
                    to: { id: 2, name: "Priya Patel", caId: "CA12346" },
                    subject: "New Feature Announcement",
                    content: "Hello Priya,\n\nWe're excited to announce that we've rolled out a new tax calculation feature that is now available on your dashboard. This feature will help you streamline your client's tax filings.\n\nFor any assistance, feel free to reach out.\n\nBest regards,\nAdmin Team",
                    date: "2025-03-16T14:45:00",
                    status: "delivered",
                },
                {
                    id: 3,
                    to: { id: 3, name: "Ajay Verma", caId: "CA12347" },
                    subject: "Action Required: Additional Documents Needed",
                    content: "Dear Ajay,\n\nWe need additional documentation to complete your CA verification process. Please upload your recent practice certificate and professional indemnity insurance details.\n\nThank you for your cooperation.\n\nRegards,\nAdmin Team",
                    date: "2025-03-18T09:15:00",
                    status: "unread",
                },
                {
                    id: 4,
                    to: { id: 4, name: "Neha Singh", caId: "CA12348" },
                    subject: "Quarterly Compliance Update",
                    content: "Hello Neha,\n\nThis is a reminder about the upcoming quarterly compliance updates. Please ensure all client filings are up to date by the end of this month.\n\nLet us know if you need any assistance.\n\nBest regards,\nAdmin Team",
                    date: "2025-03-19T16:20:00",
                    status: "unread",
                },
            ];

            setMessages(mockMessages);

            // Dashboard statistics
            setDashboardStats({
                totalCAs: 5,
                activeCAs: 3,
                pendingCAs: 1,
                totalMessages: 4,
                unreadMessages: 2,
            });

        } catch (error) {
            toast.error('Failed to load data');
            router.push('/auth/admin-login');
        } finally {
            setIsLoading(false);
        }
    };

    const fetchCAUsers = async () => {
        try {
            const regCAUsers = await fetch('/api/admin/ca/ca-reg',
                {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );
            const caUsersData = await regCAUsers.json();

            const formattedCAUsers = caUsersData.map((user: any, index: number) => ({
                id: index + 1, 
                _id: user._id,
                name:  user.name || user.firstName + " " + user.lastName || "Unknown", // Default to "Unknown" if name is missing
                caId: user.caId || user.caid || "N/A", // Default to "N/A" if caId is missing
                email: user.email || "N/A", // Default to "N/A" if email is missing
                status: user.status || "pending", // Default to "pending" if status is missing
            }));

            setCAUsers(formattedCAUsers);
        } catch (error) {
            console.error('Error fetching CA users:', error);
            toast.error('Failed to load CA users');
        }
    };

    const caApprove = async (id: string) => {
        try {
            const user = caUsers.find(u => u._id == id);

            if (!user) {
                toast.error('User not found');
                return;
            }

            const response = await fetch('/api/admin/ca/ca-reg',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ id: user._id }),
                }
            );

            if (!response.ok) {
                toast.error('Failed to approve CA user');
                return;
            }

            const updatedUsers = caUsers.map(u => {
                if (u._id === id) {
                    return { ...u, status: 'approved', isApproved: true };
                }
                return u;
            });

            setCAUsers(updatedUsers);
            toast.success('CA user approved successfully');
        } catch (error) {
            toast.error('An error occurred during approval');
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        fetchCAUsers();
    }, []);

    const handleSendMessage = () => {
        if (!newMessageSubject.trim() || !newMessageContent.trim() || !newMessageRecipient) {
            toast.error('Please fill all fields');
            return;
        }

        const recipient = caUsers.find(user => user.id === parseInt(newMessageRecipient));

        if (!recipient) {
            toast.error('Please select a valid recipient');
            return;
        }

        const newMsg = {
            id: messages.length + 1,
            to: { id: recipient.id, name: recipient.name, caId: recipient.caId },
            subject: newMessageSubject,
            content: newMessageContent,
            date: new Date().toISOString(),
            status: "sent"
        };

        setMessages([newMsg, ...messages]);
        setNewMessageOpen(false);
        setNewMessageSubject('');
        setNewMessageContent('');
        setNewMessageRecipient('');
        toast.success('Message sent successfully');
    };

    const handleDeleteMessage = (id: number) => {
        setMessages(messages.filter(msg => msg.id !== id));

        if (selectedMessage?.id === id) {
            setSelectedMessage(null);
        }

        toast.success('Message deleted');
    };

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleString('en-US', {
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const filteredMessages = activeTab === 'all'
        ? messages
        : messages.filter(msg =>
            activeTab === 'unread'
                ? msg.status === 'unread'
                : msg.status === activeTab
        );

        // Filter CA users based on the active tab
    const filteredCAUsers = activeTab === "all" ? caUsers : caUsers.filter(user => user.status === activeTab);
    
    const handleLogout = async () => {
        try {
            sessionStorage.clear();
            router.push('/');
            toast.success('Logged out successfully');
        } catch (error) {
            toast.error('An error occurred during logout');
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

    return (
        <div className="flex flex-col md:flex-row min-h-screen bg-[#0F0F0F] text-slate-100">
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

            <div
                className={`${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 transition-transform duration-300 fixed md:static top-0 left-0 h-full w-64 bg-[#1A1A1A] p-4 border-r border-[#333333] overflow-y-auto z-40`}
            >
                <div className="flex items-center justify-center mb-8 p-4">
                    <h1 className="text-xl font-bold text-green-400">Admin Portal</h1>
                </div>

                <div className="mb-6 px-3">
                    <div className="flex items-center gap-3 mb-3">
                        <Avatar>
                            <AvatarFallback className="bg-green-500/20 text-green-400">
                                {adminData && adminData.name?.split(" ").map(n => n[0]).join("")}
                            </AvatarFallback>
                        </Avatar>
                        <div className="overflow-hidden">
                            <p className="font-medium truncate">{adminData?.name}</p>
                            <p className="text-sm text-slate-400 truncate">{adminData?.adminId}</p>
                        </div>
                    </div>
                </div>

                <Separator className="my-4 bg-[#333333]" />

                <nav className="space-y-1">
                    <div
                        className={`flex items-center justify-between px-3 py-2 rounded-md cursor-pointer transition-colors ${activeSection === 'dashboard' ? 'bg-[#2A2A2A] text-green-400' : 'text-slate-300 hover:bg-[#232323]'}`}
                        onClick={() => setActiveSection('dashboard')}
                    >
                        <div className="flex items-center gap-3">
                            <BarChart3 size={18} />
                            <span>Dashboard</span>
                        </div>
                    </div>

                    <div
                        className={`flex items-center justify-between px-3 py-2 rounded-md cursor-pointer transition-colors ${activeSection === 'messages' ? 'bg-[#2A2A2A] text-green-400' : 'text-slate-300 hover:bg-[#232323]'}`}
                        onClick={() => setActiveSection('messages')}
                    >
                        <div className="flex items-center gap-3">
                            <Mail size={18} />
                            <span>Messages</span>
                        </div>
                        <Badge className="text-xs bg-green-900/60 text-green-200">
                            {messages.filter(m => m.status === 'unread').length}
                        </Badge>
                    </div>

                    <div
                        className={`flex items-center justify-between px-3 py-2 rounded-md cursor-pointer transition-colors ${activeSection === 'users' ? 'bg-[#2A2A2A] text-green-400' : 'text-slate-300 hover:bg-[#232323]'}`}
                        onClick={() => setActiveSection('users')}
                    >
                        <div className="flex items-center gap-3">
                            <Users size={18} />
                            <span>CA Users</span>
                        </div>
                        <Badge className="text-xs bg-yellow-900/60 text-yellow-200">
                            {caUsers.filter(u => u.status === 'pending').length}
                        </Badge>
                    </div>

                    <div
                        className={`flex items-center justify-between px-3 py-2 rounded-md cursor-pointer transition-colors ${activeSection === 'reports' ? 'bg-[#2A2A2A] text-green-400' : 'text-slate-300 hover:bg-[#232323]'}`}
                        onClick={() => setActiveSection('reports')}
                    >
                        <div className="flex items-center gap-3">
                            <FileText size={18} />
                            <span>Reports</span>
                        </div>
                    </div>

                    <div
                        className={`flex items-center justify-between px-3 py-2 rounded-md cursor-pointer transition-colors ${activeSection === 'settings' ? 'bg-[#2A2A2A] text-green-400' : 'text-slate-300 hover:bg-[#232323]'}`}
                        onClick={() => setActiveSection('settings')}
                    >
                        <div className="flex items-center gap-3">
                            <Settings size={18} />
                            <span>Settings</span>
                        </div>
                    </div>

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

            <div className="flex-1 p-4 md:p-8 overflow-y-auto mt-12 md:mt-0">
                {activeSection === 'dashboard' && (
                    <>
                        <header className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
                            <div>
                                <h1 className="text-2xl font-bold">Dashboard</h1>
                                <p className="text-slate-400 mt-1">Overview of system status</p>
                            </div>
                        </header>

                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
                            <Card className="bg-[#1A1A1A] border-[#333333]">
                                <CardContent className="pt-6">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="text-sm text-slate-400">Total CA Users</p>
                                            <p className="text-2xl font-bold mt-1">{dashboardStats.totalCAs}</p>
                                        </div>
                                        <Users className="h-8 w-8 text-green-400 opacity-80" />
                                    </div>
                                </CardContent>
                            </Card>
                            <Card className="bg-[#1A1A1A] border-[#333333]">
                                <CardContent className="pt-6">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="text-sm text-slate-400">Active CAs</p>
                                            <p className="text-2xl font-bold mt-1">{dashboardStats.activeCAs}</p>
                                        </div>
                                        <Users className="h-8 w-8 text-blue-400 opacity-80" />
                                    </div>
                                </CardContent>
                            </Card>
                            <Card className="bg-[#1A1A1A] border-[#333333]">
                                <CardContent className="pt-6">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="text-sm text-slate-400">Pending Approvals</p>
                                            <p className="text-2xl font-bold mt-1">{dashboardStats.pendingCAs}</p>
                                        </div>
                                        <Users className="h-8 w-8 text-yellow-400 opacity-80" />
                                    </div>
                                </CardContent>
                            </Card>
                            <Card className="bg-[#1A1A1A] border-[#333333]">
                                <CardContent className="pt-6">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="text-sm text-slate-400">Unread Messages</p>
                                            <p className="text-2xl font-bold mt-1">{dashboardStats.unreadMessages}</p>
                                        </div>
                                        <Mail className="h-8 w-8 text-red-400 opacity-80" />
                                    </div>
                                </CardContent>
                            </Card>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <Card className="bg-[#1A1A1A] border-[#333333]">
                                <CardHeader>
                                    <CardTitle>Recent Activities</CardTitle>
                                    <CardDescription>Latest actions in the system</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-4">
                                        <div className="flex items-start gap-4">
                                            <div className="h-2 w-2 mt-2 rounded-full bg-blue-400"></div>
                                            <div>
                                                <p className="text-sm font-medium">New CA registration</p>
                                                <p className="text-xs text-slate-400">Ajay Verma (CA12347) registered</p>
                                                <p className="text-xs text-slate-500 mt-1">Today, 9:15 AM</p>
                                            </div>
                                        </div>
                                        <div className="flex items-start gap-4">
                                            <div className="h-2 w-2 mt-2 rounded-full bg-green-400"></div>
                                            <div>
                                                <p className="text-sm font-medium">CA account approved</p>
                                                <p className="text-xs text-slate-400">Rahul Sharma (CA12345) approved</p>
                                                <p className="text-xs text-slate-500 mt-1">Yesterday, 2:30 PM</p>
                                            </div>
                                        </div>
                                        <div className="flex items-start gap-4">
                                            <div className="h-2 w-2 mt-2 rounded-full bg-yellow-400"></div>
                                            <div>
                                                <p className="text-sm font-medium">Document requested</p>
                                                <p className="text-xs text-slate-400">Additional documents requested from Neha Singh</p>
                                                <p className="text-xs text-slate-500 mt-1">Mar 20, 4:45 PM</p>
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card className="bg-[#1A1A1A] border-[#333333]">
                                <CardHeader>
                                    <CardTitle>System Status</CardTitle>
                                    <CardDescription>Current system performance</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-4">
                                        <div>
                                            <div className="flex justify-between mb-1">
                                                <span className="text-xs text-slate-400">Server Load</span>
                                                <span className="text-xs text-green-400">Normal</span>
                                            </div>
                                            <div className="w-full bg-[#333333] rounded-full h-2">
                                                <div className="bg-green-500 h-2 rounded-full" style={{ width: '30%' }}></div>
                                            </div>
                                        </div>
                                        <div>
                                            <div className="flex justify-between mb-1">
                                                <span className="text-xs text-slate-400">Database Usage</span>
                                                <span className="text-xs text-green-400">58%</span>
                                            </div>
                                            <div className="w-full bg-[#333333] rounded-full h-2">
                                                <div className="bg-green-500 h-2 rounded-full" style={{ width: '58%' }}></div>
                                            </div>
                                        </div>
                                        <div>
                                            <div className="flex justify-between mb-1">
                                                <span className="text-xs text-slate-400">API Response Time</span>
                                                <span className="text-xs text-green-400">120ms</span>
                                            </div>
                                            <div className="w-full bg-[#333333] rounded-full h-2">
                                                <div className="bg-green-500 h-2 rounded-full" style={{ width: '20%' }}></div>
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </>
                )}

                {activeSection === 'messages' && (
                    <>
                        <header className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
                            <div>
                                <h1 className="text-2xl font-bold">Messages</h1>
                                <p className="text-slate-400 mt-1">Communicate with CA users</p>
                            </div>

                            <div className="flex gap-3">
                                <div className="relative w-full md:w-64">
                                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-500" size={18} />
                                    <Input
                                        type="text"
                                        placeholder="Search messages..."
                                        className="pl-10 pr-4 py-2 w-full bg-[#1A1A1A] border-[#333333] focus:border-green-600 focus:ring-green-600"
                                    />
                                </div>
                                <Dialog open={newMessageOpen} onOpenChange={setNewMessageOpen}>
                                    <DialogTrigger asChild>
                                        <Button className="flex items-center gap-2 bg-green-700 hover:bg-green-600">
                                            <PlusCircle size={16} />
                                            <span>New Message</span>
                                        </Button>
                                    </DialogTrigger>
                                    <DialogContent className="bg-[#1A1A1A] border-[#333333] text-slate-100 sm:max-w-[525px]">
                                        <DialogHeader>
                                            <DialogTitle>New Message</DialogTitle>
                                            <DialogDescription className="text-slate-400">
                                                Send a message to a CA user
                                            </DialogDescription>
                                        </DialogHeader>
                                        <div className="grid gap-4 py-4">
                                            <div className="grid grid-cols-4 items-center gap-4">
                                                <label htmlFor="recipient" className="text-sm font-medium col-span-1">
                                                    To:
                                                </label>
                                                <Select onValueChange={setNewMessageRecipient} value={newMessageRecipient}>
                                                    <SelectTrigger className="col-span-3 bg-[#232323] border-[#333333]">
                                                        <SelectValue placeholder="Select CA" />
                                                    </SelectTrigger>
                                                    <SelectContent className="bg-[#232323] border-[#333333]">
                                                        {caUsers.map(user => (
                                                            <SelectItem key={user.id} value={user.id.toString()}>
                                                                {user.name} ({user.caId})
                                                            </SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                            <div className="grid grid-cols-4 items-center gap-4">
                                                <label htmlFor="subject" className="text-sm font-medium col-span-1">
                                                    Subject:
                                                </label>
                                                <Input
                                                    id="subject"
                                                    value={newMessageSubject}
                                                    onChange={(e) => setNewMessageSubject(e.target.value)}
                                                    className="col-span-3 bg-[#232323] border-[#333333]"
                                                />
                                            </div>
                                            <div className="grid grid-cols-4 items-start gap-4">
                                                <label htmlFor="message" className="text-sm font-medium col-span-1 pt-2">
                                                    Message:
                                                </label>
                                                <Textarea
                                                    id="message"
                                                    value={newMessageContent}
                                                    onChange={(e) => setNewMessageContent(e.target.value)}
                                                    className="col-span-3 bg-[#232323] border-[#333333] min-h-[150px]"
                                                />
                                            </div>
                                        </div>
                                        <DialogFooter>
                                            <Button type="submit" onClick={handleSendMessage}>
                                                Send Message
                                            </Button>
                                        </DialogFooter>
                                    </DialogContent>
                                </Dialog>
                            </div>
                        </header>

                        <Card className="bg-[#1A1A1A] border-[#333333] mb-8">
                            <CardHeader>
                                <div className="flex items-center justify-between">
                                    <div>
                                        <CardTitle className='text-white'>Message Center</CardTitle>
                                        <CardDescription className="text-slate-400">
                                            Manage all communications with CA users
                                        </CardDescription>
                                    </div>
                                    <div className="flex gap-2">
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="outline" size="sm" className="bg-[#232323] border-[#333333] hover:bg-[#2A2A2A]">
                                                    <Filter className="mr-2 h-4 w-4" />
                                                    Filter
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent className="bg-[#232323] border-[#333333]">
                                                <DropdownMenuItem onClick={() => setActiveTab('all')}>
                                                    All Messages
                                                </DropdownMenuItem>
                                                <DropdownMenuItem onClick={() => setActiveTab('unread')}>
                                                    Unread
                                                </DropdownMenuItem>
                                                <DropdownMenuItem onClick={() => setActiveTab('sent')}>
                                                    Sent
                                                </DropdownMenuItem>
                                                <DropdownMenuItem onClick={() => setActiveTab('delivered')}>
                                                    Delivered
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                        <Button
                                            variant="outline"
                                            size="icon"
                                            className="bg-[#232323] border-[#333333] hover:bg-[#2A2A2A]"
                                            onClick={() => {
                                                fetchData();
                                                setSelectedMessage(null);
                                            }}
                                        >
                                            <RefreshCw className='text-white' size={16} />
                                        </Button>
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <div className="md:col-span-1 border border-[#333333] rounded-md overflow-hidden">
                                        {filteredMessages.length === 0 ? (
                                            <div className="flex flex-col items-center justify-center h-64 text-slate-400">
                                                <Mail size={48} className="mb-2 opacity-20" />
                                                <p>No messages found</p>
                                            </div>
                                        ) : (
                                            <div className="max-h-96 overflow-y-auto">
                                                {filteredMessages.map((message) => (
                                                    <div
                                                        key={message.id}
                                                        onClick={() => setSelectedMessage(message)}
                                                        className={`p-4 border-b border-[#333333] cursor-pointer hover:bg-[#232323] transition-colors ${selectedMessage?.id === message.id ? 'bg-[#232323]' : ''
                                                            } ${message.status === 'unread' ? 'border-l-4 border-l-green-500' : ''}`}
                                                    >
                                                        <div className="flex justify-between items-start mb-2">
                                                            <p className={`font-medium ${message.status === 'unread' ? 'text-white' : 'text-slate-300'}`}>
                                                                {message.to.name}
                                                            </p>
                                                            <p className="text-xs text-slate-400">
                                                                {formatDate(message.date)}
                                                            </p>
                                                        </div>
                                                        <p className={`text-sm truncate mb-1 ${message.status === 'unread' ? 'font-medium text-slate-200' : 'text-slate-400'}`}>
                                                            {message.subject}
                                                        </p>
                                                        <p className="text-xs text-slate-500 truncate">
                                                            {message.content.substring(0, 50)}...
                                                        </p>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>

                                    <div className="md:col-span-2 border border-[#333333] rounded-md overflow-hidden">
                                        {selectedMessage ? (
                                            <div className="h-full flex flex-col">
                                                <div className="p-4 bg-[#232323] border-b border-[#333333] flex justify-between items-center">
                                                    <div>
                                                        <h3 className="font-medium text-white">{selectedMessage.subject}</h3>
                                                        <p className="text-sm text-slate-400">
                                                            To: {selectedMessage.to.name} ({selectedMessage.to.caId})
                                                        </p>
                                                    </div>
                                                    <div className="flex gap-2">
                                                        <Button
                                                            variant="outline"
                                                            size="icon"
                                                            className="bg-[#1A1A1A] border-[#333333] hover:bg-red-900/30 hover:text-red-300"
                                                            onClick={() => handleDeleteMessage(selectedMessage.id)}
                                                        >
                                                            <Trash2 size={16} />
                                                        </Button>
                                                    </div>
                                                </div>
                                                <div className="p-4 overflow-y-auto flex-1 whitespace-pre-line">
                                                    {selectedMessage.content}
                                                </div>
                                                <div className="p-4 bg-[#232323] border-t border-[#333333] text-xs text-slate-400">
                                                    Sent: {formatDate(selectedMessage.date)} • Status: {selectedMessage.status.charAt(0).toUpperCase() + selectedMessage.status.slice(1)}
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="flex flex-col items-center justify-center h-96 text-slate-400">
                                                <Mail size={64} className="mb-3 opacity-20" />
                                                <p className="mb-2">Select a message to view</p>
                                                <Button
                                                    variant="outline"
                                                    className="mt-2 bg-[#232323] border-[#333333] hover:bg-[#2A2A2A]"
                                                    onClick={() => setNewMessageOpen(true)}
                                                >
                                                    <PlusCircle size={16} className="mr-2" />
                                                    New Message
                                                </Button>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </>
                )}

                {activeSection === 'users' && (
                    <>
                        <header className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
                            <div>
                                <h1 className="text-2xl font-bold">CA Users</h1>
                                <p className="text-slate-400 mt-1">Manage chartered accountant accounts</p>
                            </div>

                            <div className="flex gap-3">
                                <div className="relative w-full md:w-64">
                                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-500" size={18} />
                                    <Input
                                        type="text"
                                        placeholder="Search users..."
                                        className="pl-10 pr-4 py-2 w-full bg-[#1A1A1A] border-[#333333] focus:border-green-600 focus:ring-green-600"
                                    />
                                </div>

                                <Button variant="outline" size="icon" className="bg-[#232323] border-[#333333] hover:bg-[#2A2A2A]">
                                    <RefreshCw size={16} />
                                </Button>
                            </div>
                        </header>

                        <Card className="bg-[#1A1A1A] border-[#333333]">
                            <CardHeader>
                                <div className="flex items-center justify-between">
                                    <div>
                                        <CardTitle>Registered CA Users</CardTitle>
                                        <CardDescription>
                                            View and manage chartered accountant accounts
                                        </CardDescription>
                                    </div>
                                    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-[400px]">
                                        <TabsList className="bg-[#232323]">
                                            <TabsTrigger value="all">All</TabsTrigger>
                                            <TabsTrigger value="active">Active</TabsTrigger>
                                            <TabsTrigger value="pending">Pending</TabsTrigger>
                                            <TabsTrigger value="inactive">Inactive</TabsTrigger>
                                        </TabsList>
                                    </Tabs>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="rounded-md border border-[#333333] overflow-hidden">
                                    <table className="w-full text-left">
                                        <thead className="bg-[#232323] text-xs uppercase">
                                            <tr>
                                                <th className="px-4 py-3 font-medium">ID</th>
                                                <th className="px-4 py-3 font-medium">Name</th>
                                                <th className="px-4 py-3 font-medium">CA ID</th>
                                                <th className="px-4 py-3 font-medium">Email</th>
                                                <th className="px-4 py-3 font-medium">Status</th>
                                                <th className="px-4 py-3 font-medium text-right">Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-[#333333]">
                                            {filteredCAUsers.map((user) => (
                                                <tr key={user.id} className="bg-[#1A1A1A] hover:bg-[#232323] transition-colors">
                                                    <td className="px-4 py-3 text-sm">{user.id}</td>
                                                    <td className="px-4 py-3">
                                                        <div className="flex items-center">
                                                            <Avatar className="h-8 w-8 mr-3">
                                                                <AvatarFallback className="bg-green-500/20 text-green-400 text-xs">
                                                                    {user.name.split(" ").map(n => n[0]).join("")}
                                                                </AvatarFallback>
                                                            </Avatar>
                                                            <div>
                                                                <p className="font-medium text-sm">{user.name}</p>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="px-4 py-3 text-sm">{user.caId}</td>
                                                    <td className="px-4 py-3 text-sm">{user.email}</td>
                                                    <td className="px-4 py-3">
                                                        <Badge className={`
                                                            ${user.status === 'active' ? 'bg-green-900/40 text-green-400 hover:bg-green-900/60' : ''}
                                                            ${user.status === 'pending' ? 'bg-yellow-900/40 text-yellow-400 hover:bg-yellow-900/60' : ''}
                                                            ${user.status === 'inactive' ? 'bg-slate-800 text-slate-400 hover:bg-slate-700' : ''}
                                                        `}>
                                                            {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                                                        </Badge>
                                                    </td>
                                                    <td className="px-4 py-3 text-right">
                                                        <DropdownMenu>
                                                            <DropdownMenuTrigger asChild>
                                                                <Button variant="ghost" className="h-8 w-8 p-0">
                                                                    <span className="sr-only">Open menu</span>
                                                                    <svg
                                                                        xmlns="http://www.w3.org/2000/svg"
                                                                        viewBox="0 0 24 24"
                                                                        fill="none"
                                                                        stroke="currentColor"
                                                                        strokeWidth="2"
                                                                        strokeLinecap="round"
                                                                        strokeLinejoin="round"
                                                                        className="h-4 w-4"
                                                                    >
                                                                        <circle cx="12" cy="12" r="1" />
                                                                        <circle cx="12" cy="5" r="1" />
                                                                        <circle cx="12" cy="19" r="1" />
                                                                    </svg>
                                                                </Button>
                                                            </DropdownMenuTrigger>
                                                            <DropdownMenuContent className="bg-[#232323] border-[#333333]">
                                                                <DropdownMenuItem className="cursor-pointer">View Profile</DropdownMenuItem>
                                                                <DropdownMenuItem className="cursor-pointer">Edit Details</DropdownMenuItem>
                                                                <DropdownMenuItem className="cursor-pointer">Send Message</DropdownMenuItem>
                                                                {user.status === 'pending' && (
                                                                    <DropdownMenuItem onClick={()=>{caApprove(user._id)}} className="cursor-pointer text-green-400">Approve</DropdownMenuItem>
                                                                )}
                                                                {user.status === 'active' && (
                                                                    <DropdownMenuItem className="cursor-pointer text-red-400">Deactivate</DropdownMenuItem>
                                                                )}
                                                                {user.status === 'inactive' && (
                                                                    <DropdownMenuItem className="cursor-pointer text-green-400">Reactivate</DropdownMenuItem>
                                                                )}
                                                            </DropdownMenuContent>
                                                        </DropdownMenu>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </CardContent>
                            <CardFooter className="flex items-center justify-between">
                                <p className="text-sm text-slate-400">Showing {caUsers.length} of {caUsers.length} entries</p>
                                <div className="flex gap-1">
                                    <Button variant="outline" size="sm" className="bg-[#232323] border-[#333333] hover:bg-[#2A2A2A]">
                                        Previous
                                    </Button>
                                    <Button variant="outline" size="sm" className="bg-[#232323] border-[#333333] hover:bg-[#2A2A2A]">
                                        Next
                                    </Button>
                                </div>
                            </CardFooter>
                        </Card>
                    </>
                )}

                {activeSection === 'reports' && (
                    <>
                        <header className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
                            <div>
                                <h1 className="text-2xl font-bold">Reports</h1>
                                <p className="text-slate-400 mt-1">System analytics and statistics</p>
                            </div>
                        </header>

                        <Card className="bg-[#1A1A1A] border-[#333333] mb-8">
                            <CardHeader>
                                <CardTitle>System Usage Reports</CardTitle>
                                <CardDescription>
                                    Analytics and usage statistics
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="flex flex-col items-center justify-center py-12 text-slate-400">
                                    <FileText size={64} className="mb-4 opacity-20" />
                                    <p className="text-lg mb-2">Report Generation Coming Soon</p>
                                    <p className="text-sm max-w-md text-center">
                                        This feature is currently under development. You'll soon be able to generate detailed reports of system usage and CA activities.
                                    </p>
                                </div>
                            </CardContent>
                        </Card>
                    </>
                )}

                {activeSection === 'settings' && (
                    <>
                        <header className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
                            <div>
                                <h1 className="text-2xl font-bold">Settings</h1>
                                <p className="text-slate-400 mt-1">Configure system preferences</p>
                            </div>
                        </header>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <Card className="bg-[#1A1A1A] border-[#333333] md:col-span-2">
                                <CardHeader>
                                    <CardTitle>Admin Settings</CardTitle>
                                    <CardDescription>
                                        Manage your account and preferences
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-6">
                                        <div className="space-y-2">
                                            <label htmlFor="name" className="text-sm font-medium">
                                                Admin Name
                                            </label>
                                            <Input
                                                id="name"
                                                defaultValue={adminData?.name}
                                                className="bg-[#232323] border-[#333333]"
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <label htmlFor="email" className="text-sm font-medium">
                                                Email Address
                                            </label>
                                            <Input
                                                id="email"
                                                defaultValue="admin@example.com"
                                                className="bg-[#232323] border-[#333333]"
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <label htmlFor="currentPw" className="text-sm font-medium">
                                                Current Password
                                            </label>
                                            <Input
                                                id="currentPw"
                                                type="password"
                                                className="bg-[#232323] border-[#333333]"
                                            />
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div className="space-y-2">
                                                <label htmlFor="newPw" className="text-sm font-medium">
                                                    New Password
                                                </label>
                                                <Input
                                                    id="newPw"
                                                    type="password"
                                                    className="bg-[#232323] border-[#333333]"
                                                />
                                            </div>

                                            <div className="space-y-2">
                                                <label htmlFor="confirmPw" className="text-sm font-medium">
                                                    Confirm New Password
                                                </label>
                                                <Input
                                                    id="confirmPw"
                                                    type="password"
                                                    className="bg-[#232323] border-[#333333]"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                                <CardFooter>
                                    <Button className="bg-green-700 hover:bg-green-600">
                                        Save Changes
                                    </Button>
                                </CardFooter>
                            </Card>

                            <Card className="bg-[#1A1A1A] border-[#333333]">
                                <CardHeader>
                                    <CardTitle>System Preferences</CardTitle>
                                    <CardDescription>
                                        Configure system behavior
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-4">
                                        <div className="flex items-center justify-between">
                                            <div className="space-y-0.5">
                                                <label className="text-sm font-medium">Email Notifications</label>
                                                <p className="text-xs text-slate-400">Receive email alerts</p>
                                            </div>
                                            <div className="h-6 w-11 cursor-pointer bg-green-900 rounded-full relative">
                                                <div className="h-5 w-5 bg-white rounded-full absolute right-0.5 top-0.5"></div>
                                            </div>
                                        </div>

                                        <div className="flex items-center justify-between">
                                            <div className="space-y-0.5">
                                                <label className="text-sm font-medium">Auto-Approve CAs</label>
                                                <p className="text-xs text-slate-400">Automatically approve registrations</p>
                                            </div>
                                            <div className="h-6 w-11 cursor-pointer bg-[#333333] rounded-full relative">
                                                <div className="h-5 w-5 bg-white rounded-full absolute left-0.5 top-0.5"></div>
                                            </div>
                                        </div>

                                        <div className="flex items-center justify-between">
                                            <div className="space-y-0.5">
                                                <label className="text-sm font-medium">Dark Mode</label>
                                                <p className="text-xs text-slate-400">Use dark color scheme</p>
                                            </div>
                                            <div className="h-6 w-11 cursor-pointer bg-green-900 rounded-full relative">
                                                <div className="h-5 w-5 bg-white rounded-full absolute right-0.5 top-0.5"></div>
                                            </div>
                                        </div>

                                        <div className="space-y-2 pt-4">
                                            <label htmlFor="timeout" className="text-sm font-medium">
                                                Session Timeout (minutes)
                                            </label>
                                            <Select defaultValue="30">
                                                <SelectTrigger className="bg-[#232323] border-[#333333]">
                                                    <SelectValue placeholder="Select timeout" />
                                                </SelectTrigger>
                                                <SelectContent className="bg-[#232323] border-[#333333]">
                                                    <SelectItem value="15">15 minutes</SelectItem>
                                                    <SelectItem value="30">30 minutes</SelectItem>
                                                    <SelectItem value="60">60 minutes</SelectItem>
                                                    <SelectItem value="120">120 minutes</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                    </div>
                                </CardContent>
                                <CardFooter>
                                    <Button className="w-full bg-green-700 hover:bg-green-600">
                                        Apply Settings
                                    </Button>
                                </CardFooter>
                            </Card>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}