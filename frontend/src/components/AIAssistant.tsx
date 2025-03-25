"use client"
import React, { useState, useRef, useEffect } from 'react';
import { Bot, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { OpenAI } from 'openai';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const AIAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: 'Hi, how can I help you today?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const openai = new OpenAI({
    apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
    dangerouslyAllowBrowser: true
  });

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(scrollToBottom, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const newMessages: Message[] = [...messages, { role: 'user', content: input }];
    setMessages(newMessages);
    setInput('');
    setIsLoading(true);

    try {
      const response = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        store: true,
        messages: [
          { 
            role: 'system', 
            content: `You are IFSS Chatbot, created by Sujal and Parag from IFSS. You are only allowed to provide information related to Income Tax and ITR. If a user asks anything unrelated, politely inform them that you can only assist with Income Tax and ITR topics.` 
          },
          ...newMessages.map(m => ({
            role: m.role as 'user' | 'assistant',
            content: m.content
          }))
        ]
      });

      const assistantReply = response.choices[0].message.content || 'Sorry, I could not process that.';
      
      setMessages(prev => [
        ...prev, 
        { role: 'assistant', content: assistantReply }
      ]);
    } catch (error) {
      console.error('AI Request Error:', error);
      setMessages(prev => [
        ...prev, 
        { role: 'assistant', content: 'I can\'t log in.' }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {isOpen ? (
        <Card className="fixed bottom-4 right-4 w-sm shadow-lg border rounded-lg overflow-hidden z-50 bg-black text-white">
          <CardHeader className="px-6 border-b border-gray-800 bg-black flex flex-row items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-full flex items-center justify-center">
                <Bot className="h-5 w-5 text-white" />
              </div>
              <div className="flex flex-col">
                <div className="text-sm font-medium">IFSS Chatbot</div>
                <div className="text-xs text-gray-400">ifsspro@gmail.com</div>
              </div>
            </div>
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-8 w-8 text-gray-400 hover:text-white" 
              onClick={() => setIsOpen(false)}
            >
              <span className="sr-only">Close</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            </Button>
          </CardHeader>
          <CardContent className="px-2">
            <ScrollArea className="h-72 w-full" type="always">
              <div className="p-3 space-y-4">
                {messages.map((msg, index) => (
                  <div 
                    key={index} 
                    className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div 
                      className={`rounded-lg px-3 py-2 max-w-[80%] ${
                        msg.role === 'user' 
                          ? 'bg-white text-black' 
                          : 'bg-gray-800 text-white'
                      }`}
                    >
                      {msg.content}
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>
            </ScrollArea>
          </CardContent>
          <CardFooter className="px-4 border-t border-gray-800 bg-black">
            <form onSubmit={handleSubmit} className="flex w-full gap-2">
              <Input 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your message..."
                disabled={isLoading}
                className="flex-1 bg-gray-900 border-gray-700 text-white placeholder:text-gray-500"
              />
              <Button type="submit" size="icon" disabled={isLoading} className="">
                <Send className="h-4 w-4" />
              </Button>
            </form>
          </CardFooter>
        </Card>
      ) : (
        <Button 
          variant="outline" 
          size="icon" 
          className="fixed bottom-4 right-4 rounded-full shadow-lg z-50 bg-blue-600 hover:bg-blue-700 text-white border-0 h-16 w-16"
          onClick={() => setIsOpen(true)}
        >
          <Bot className="h-6 w-6 scale-150" />
        </Button>
      )}
    </>
  );
};

export default AIAssistant;
