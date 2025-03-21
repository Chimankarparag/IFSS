"use client";

import { useState, useEffect } from 'react';
import { Mail, MailOpen, Trash2, RefreshCw, Filter } from 'lucide-react';
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "react-hot-toast";
import { ScrollArea } from "@/components/ui/scroll-area"


interface Message {
    _id: string;
    sender: {
        name: string;
        caid: string;
    };
    subject: string;
    content: string;
    isRead: boolean;
    category: string;
    createdAt: string;
}

export default function Inbox(params:any) {

    const user = params.user;
    const [messages, setMessages] = useState<Message[]>([]);
    const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [filter, setFilter] = useState('all');

    const fetchMessages = async () => {
        try {
            setIsLoading(true);
            console.log(user)
            const response = await fetch(`/api/user/messages`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email: user.email }),
            });
            
            if (!response.ok) {
                throw new Error('Failed to fetch messages');
            }
            
            const data = await response.json();
            console.log(data);
            setMessages(data);
        } catch (error) {
            console.error('Error fetching messages:', error);
            toast.error('Failed to load messages');
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchMessages();
    }, [filter]);

    const markAsRead = async (id: string) => {
        try {
            const response = await fetch(`/api/user/messages/${id}`, {
                method: 'PUT'
            });
            
            if (!response.ok) {
                throw new Error('Failed to mark message as read');
            }
            
            setMessages(messages.map(msg => 
                msg._id === id ? { ...msg, isRead: true } : msg
            ));
        } catch (error) {
            console.error('Error marking message as read:', error);
            toast.error('Failed to update message');
        }
    };

    const deleteMessage = async (id: string) => {
        try {
            const response = await fetch(`/api/user/messages/${id}`, {
                method: 'DELETE'
            });
            
            if (!response.ok) {
                throw new Error('Failed to delete message');
            }
            
            setMessages(messages.filter(msg => msg._id !== id));
            if (selectedMessage?._id === id) {
                setSelectedMessage(null);
            }
            toast.success('Message deleted');
        } catch (error) {
            console.error('Error deleting message:', error);
            toast.error('Failed to delete message');
        }
    };

    const handleMessageClick = async (message: Message) => {
        setSelectedMessage(message);
        if (!message.isRead) {
            await markAsRead(message._id);
        }
    };

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'short', 
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    return (
        <Card className="bg-[#1A1A1A] border-[#333333]">
            <CardHeader>
                <div className="flex items-center justify-between">
                    <div>
                        <CardTitle className='text-white'>Inbox</CardTitle>
                        <CardDescription className="text-slate-400">
                            Messages from your CA
                        </CardDescription>
                    </div>
                    <div className="flex gap-2">
                        <Button 
                            variant="outline" 
                            size="icon" 
                            onClick={fetchMessages}
                            className="bg-[#232323] text-white border-[#333333] hover:bg-[#2A2A2A]"
                        >
                            <RefreshCw size={16} />
                        </Button>
                        <Button 
                            variant="outline" 
                            size="icon"
                            className="bg-[#232323] text-white border-[#333333] hover:bg-[#2A2A2A]"
                        >
                            <Filter size={16} />
                        </Button>
                    </div>
                </div>
            </CardHeader>
            <CardContent>
                <Tabs defaultValue="all" onValueChange={setFilter}>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="md:col-span-1 border border-[#333333] rounded-md overflow-hidden">
                            {isLoading ? (
                                <div className="flex items-center justify-center h-64">
                                    <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
                                </div>
                            ) : messages.length === 0 ? (
                                <div className="flex flex-col items-center justify-center h-64 text-slate-400">
                                    <Mail size={48} className="mb-2 opacity-20" />
                                    <p>No messages found</p>
                                </div>
                            ) : (
                                <ScrollArea className="h-96">
                                    {messages.map((message) => (
                                        <div 
                                            key={message._id}
                                            onClick={() => handleMessageClick(message)}
                                            className={`p-3 border-b border-[#333333] cursor-pointer hover:bg-[#232323] transition-colors ${
                                                selectedMessage?._id === message._id ? 'bg-[#232323]' : ''
                                            } ${!message.isRead ? 'bg-blue-900/10' : ''}`}
                                        >
                                            <div className="flex items-start gap-3">
                                                <div className="mt-1">
                                                    {message.isRead ? (
                                                        <MailOpen size={16} className="text-slate-400" />
                                                    ) : (
                                                        <Mail size={16} className="text-blue-400" />
                                                    )}
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <div className="flex items-center justify-between">
                                                        <p className={`font-medium truncate ${!message.isRead ? 'text-white' : 'text-slate-300'}`}>
                                                            {message.sender.name}
                                                        </p>
                                                        <span className="text-xs text-slate-500">
                                                            {formatDate(message.createdAt).split(',')[0]}
                                                        </span>
                                                    </div>
                                                    <p className="text-sm truncate text-slate-300">{message.subject}</p>
                                                    <div className="flex items-center justify-between mt-1">
                                                        <p className="text-xs text-slate-500 truncate">
                                                            {message.content.substring(0, 30)}...
                                                        </p>
                                                        <Badge variant="outline" className="text-xs bg-blue-900/20 text-blue-400">
                                                            {message.category}
                                                        </Badge>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </ScrollArea>
                            )}
                        </div>
                        
                        <div className="md:col-span-2 border border-[#333333] rounded-md">
                            {selectedMessage ? (
                                <div className="p-4">
                                    <div className="flex items-center justify-between mb-4">
                                        <h3 className="text-xl text-slate-50 font-medium">{selectedMessage.subject}</h3>
                                        <Button 
                                            variant="destructive" 
                                            size="sm"
                                            onClick={() => deleteMessage(selectedMessage._id)}
                                            className="bg-red-900/30 hover:bg-red-900/50 text-red-300"
                                        >
                                            <Trash2 size={16} className="mr-1" />
                                            Delete
                                        </Button>
                                    </div>
                                    
                                    <div className="flex items-center justify-between mb-4 text-sm text-slate-400">
                                        <div>
                                            From: <span className="text-slate-300">{selectedMessage.sender.name} ({selectedMessage.sender.caid})</span>
                                        </div>
                                        <div>{formatDate(selectedMessage.createdAt)}</div>
                                    </div>
                                    
                                    <div className="border-t border-[#333333] pt-4 mt-2">
                                        <div className="text-slate-100 prose prose-invert max-w-none">
                                            {selectedMessage.content.split('\n').map((paragraph, i) => (
                                                <p key={i}>{paragraph}</p>
                                            ))}
                                        </div>
                                    </div>
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
    );
}
