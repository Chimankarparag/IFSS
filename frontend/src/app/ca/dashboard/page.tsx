"use client";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
    Mail,
    LogOut,
    Search,
    Menu,
    X,
    Reply,
    Trash2,
    RefreshCw
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
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

export default function CADashboardPage() {
    const router = useRouter();
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [isLoading, setIsLoading] = useState(true);
    const [caData, setCAData] = useState<{ name: string; caId: string } | null>(null);
    const [messages, setMessages] = useState<Array<{
        id: number;
        from?: { id: number; name: string; panNumber: string };
        to?: { id: number; name: string; panNumber: string };
        subject: string;
        content: string;
        date: string;
        isRead?: boolean;
        folder: string;
    }>>([]);
    const [sentMessages, setSentMessages] = useState<Array<{
        id: number;
        from?: { id: number; name: string; panNumber: string };
        to?: { id: number; name: string; panNumber: string };
        subject: string;
        content: string;
        date: string;
        isRead?: boolean;
        folder: string;
    }>>([]);
    const [selectedMessage, setSelectedMessage] = useState<{
        id: number;
        from?: { id: number; name: string; panNumber: string };
        to?: { id: number; name: string; panNumber: string };
        subject: string;
        content: string;
        date: string;
        isRead?: boolean;
        folder: string;
    } | null>(null);
    const [replyContent, setReplyContent] = useState('');
    const [activeTab, setActiveTab] = useState('inbox');

    const fetchMessages = async () => {
        try {
            const response = await fetch('/api/ca/message', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ caId: caData?.caId }),
            });

            const data = await response.json();

            const formattedMessages = data.populatedMessages.map((msg: any) => ({
                id: msg._id,
                from: { id: msg.sender._id, name: msg.sender.name || msg.sender.firstName + " " + msg.sender.lastName, panNumber: msg.sender.pan_number },
                subject: msg.subject,
                content: msg.content,
                date: msg.createdAt,
                isRead: msg.isRead,
                folder: msg.category,
            }));

            const sentMessages = data.populatedSentMessages.map((msg: any) => ({
                id: msg._id,
                to: { id: msg.recipient._id, name: msg.recipient.firstName + " " + msg.recipient.lastName, panNumber: msg.recipient.pan_number },
                subject: msg.subject,
                content: msg.content,
                date: msg.createdAt,
                folder: msg.category,
            }));

            setSentMessages(sentMessages);
            setMessages(formattedMessages);
        } catch (error) {
            toast.error('Failed to load messages');
        }
    }

    const fetchData = async () => {
        try {
            setIsLoading(true);

            const response = await fetch('/api/ca', {
                method: 'GET',
            });

            if (response.ok) {
                const data = await response.json();
                setCAData(
                    {
                        name: data.name,
                        caId: data.caid,
                    }
                );
            } else {
                router.push('/auth/ca-login');
                throw new Error('Failed to fetch data');
            }

        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        if (caData) {
            fetchMessages();
        }
    }, [caData]);

    const handleReply = async () => {
        if (!selectedMessage || !replyContent) return;

        const replyMsg = {
            id: messages.length + 1,
            to: selectedMessage.from,
            subject: `Re: ${selectedMessage.subject}`,
            content: replyContent,
            date: new Date().toISOString(),
            folder: "sent"
        };

        try {
            // Send reply to the server
            const response = await fetch('/api/ca/reply', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    replyMsg,
                    caId: caData?.caId,
                }),
            });

            if (response.ok) {
                setReplyContent('');
                toast.success('Reply sent successfully');
                fetchData();
            } else {
                toast.error('Failed to send reply');
            }

        } catch (error) {
            toast.error('Failed to send reply');
        }


    };

    const handleDeleteMessage = async (id: number) => {

        try {
            const response = await fetch(`/api/ca/reply/${id}`, {
                method: 'DELETE'
            });
            
            if (!response.ok) {
                throw new Error('Failed to delete message');
            }
    
            setMessages(messages.filter(msg => msg.id !== id));
    
            if (selectedMessage?.id === id) {
                setSelectedMessage(null);
            }
            toast.success('Message deleted');
        } catch (error) {
            console.error('Error deleting message:', error);
            toast.error('Failed to delete message');
        } finally {
            fetchMessages();
        }

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

    const filteredMessages = activeTab === 'inbox' ? messages.filter(msg => !msg.isRead) : sentMessages;

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
                    <h1 className="text-xl font-bold text-blue-400">CA Portal</h1>
                </div>

                <div className="mb-6 px-3">
                    <div className="flex items-center gap-3 mb-3">
                        <Avatar>
                            <AvatarFallback className="bg-blue-500/20 text-blue-400">
                                {caData && caData.name.split(" ").map(n => n[0]).join("")}
                            </AvatarFallback>
                        </Avatar>
                        <div className="overflow-hidden">
                            <p className="font-medium truncate">{caData?.name}</p>
                            <p className="text-sm text-slate-400 truncate">{caData?.caId}</p>
                        </div>
                    </div>
                </div>

                <Separator className="my-4 bg-[#333333]" />

                <nav className="space-y-1">
                    <div className="flex items-center justify-between px-3 py-2 rounded-md cursor-pointer transition-colors bg-[#2A2A2A] text-blue-400">
                        <div className="flex items-center gap-3">
                            <Mail size={18} />
                            <span>Messages</span>
                        </div>
                        <Badge className="text-xs bg-red-900/60 text-red-200">
                            {messages.filter(m => m.folder === 'inbox' && !m.isRead).length}
                        </Badge>
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
                <header className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
                    <div>
                        <h1 className="text-2xl font-bold">Messages</h1>
                        <p className="text-slate-400 mt-1">Manage client communications</p>
                    </div>

                    <div className="relative w-full md:w-64">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-500" size={18} />
                        <Input
                            type="text"
                            placeholder="Search messages..."
                            className="pl-10 pr-4 py-2 w-full bg-[#1A1A1A] border-[#333333] focus:border-blue-600 focus:ring-blue-600"
                        />
                    </div>
                </header>

                <Card className="bg-[#1A1A1A] border-[#333333] mb-8">
                    <CardHeader>
                        <div className="flex items-center justify-between">
                            <div>
                                <CardTitle className='text-white'>Inbox</CardTitle>
                                <CardDescription className="text-slate-400">
                                    View and respond to client messages
                                </CardDescription>
                            </div>
                            <Button
                                variant="outline"
                                size="icon"
                                className="bg-[#232323] border-[#333333] hover:bg-[#2A2A2A]"
                                onClick={() => {
                                    fetchMessages();
                                    setSelectedMessage(null);
                                }}
                            >
                                <RefreshCw className='text-white' size={16} />
                            </Button>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <Tabs defaultValue={activeTab} onValueChange={setActiveTab}>
                            <TabsList className="bg-[#232323] mb-4">
                                <TabsTrigger value="inbox">Inbox</TabsTrigger>
                                <TabsTrigger value="sent">Sent</TabsTrigger>
                            </TabsList>

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
                                                    className={`p-3 border-b border-[#333333] cursor-pointer hover:bg-[#232323] transition-colors ${selectedMessage?.id === message.id ? 'bg-[#232323]' : ''
                                                        } ${message.folder === 'inbox' && !message.isRead ? 'bg-blue-900/10' : ''}`}
                                                >
                                                    <div className="flex items-start gap-3">
                                                        <div className="mt-1">
                                                            <Mail size={16} className={message.isRead ? "text-slate-400" : "text-blue-400"} />
                                                        </div>
                                                        <div className="flex-1 min-w-0">
                                                            <div className="flex items-center justify-between">
                                                                <p className="font-medium truncate text-white/90">
                                                                    {message.folder === 'inbox' ? message.from?.name : message.to?.name}
                                                                </p>
                                                                <span className="text-xs text-slate-500">
                                                                    {formatDate(message.date)}
                                                                </span>
                                                            </div>
                                                            <p className="text-sm truncate text-white/60">{message.subject}</p>
                                                            <p className="text-xs text-slate-400 truncate">
                                                                {message.content.substring(0, 30)}...
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>

                                <div className="md:col-span-2 border border-[#333333] rounded-md">
                                    {selectedMessage ? (
                                        <div className="p-4">
                                            <div className="flex items-center justify-between mb-4">
                                                <h3 className="text-xl font-medium text-white/80">{selectedMessage.subject}</h3>
                                                <Button
                                                    variant="destructive"
                                                    size="sm"
                                                    onClick={() => handleDeleteMessage(selectedMessage.id)}
                                                    className="bg-red-900/30 hover:bg-red-900/50 text-red-300"
                                                >
                                                    <Trash2 size={16} className="mr-1" />
                                                    Delete
                                                </Button>
                                            </div>

                                            <div className="flex items-center justify-between mb-4 text-sm text-slate-400">
                                                <div>
                                                    {selectedMessage.folder === 'inbox' ? (
                                                        <>From: <span className="text-slate-300">{selectedMessage.from?.name}</span></>
                                                    ) : (
                                                        <>To: <span className="text-slate-300">{selectedMessage.to?.name}</span></>
                                                    )}
                                                </div>
                                                <div>{formatDate(selectedMessage.date)}</div>
                                            </div>

                                            <div className="border-t border-[#333333] pt-4 mt-2 mb-6">
                                                <div className="prose prose-invert max-w-none text-white/60">
                                                    {selectedMessage.content.split('\n').map((paragraph, i) => (
                                                        <p key={i}>{paragraph}</p>
                                                    ))}
                                                </div>
                                            </div>

                                            {selectedMessage.folder === 'inbox' && selectedMessage.from?.panNumber && (
                                                <div className="border-t border-[#333333] pt-4">
                                                    <h4 className="text-sm font-medium mb-2 text-white/50">Reply</h4>
                                                    <div className="space-y-4">
                                                        <Textarea
                                                            className="bg-[#2A2A2A] border-[#333333] text-slate-100 min-h-[100px]"
                                                            placeholder="Type your reply here..."
                                                            value={replyContent}
                                                            onChange={(e) => setReplyContent(e.target.value)}
                                                        />
                                                        <div className="flex justify-end">
                                                            <Button
                                                                onClick={handleReply}
                                                                disabled={!replyContent.trim()}
                                                                className="flex items-center gap-2"
                                                            >
                                                                <Reply size={16} />
                                                                <span>Send Reply</span>
                                                            </Button>
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    ) : (
                                        <div className="flex flex-col items-center justify-center h-64 text-slate-400">
                                            <Mail size={48} className="mb-2 opacity-20" />
                                            <p>Select a message to view</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </Tabs>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}