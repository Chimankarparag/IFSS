// app/dashboard/page.tsx
"use client";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { 
  LayoutDashboard, 
  Users, 
  FileText, 
  Settings, 
  Bell, 
  LogOut, 
  Search,
  Menu,
  X
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
import { toast } from "react-hot-toast";

export default function DashboardPage() {
  const router = useRouter();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [userData, setUserData] = useState({
    name: "John Doe",
    panNumber: "ABCDE1234F",
    lastLogin: "11 Mar 2025, 09:45 AM",
    pendingActions: 3,
    recentActivity: [
      { id: 1, action: "Profile updated", date: "10 Mar 2025" },
      { id: 2, action: "Password changed", date: "05 Mar 2025" },
      { id: 3, action: "Document uploaded", date: "28 Feb 2025" },
    ],
    stats: [
      { title: "Total Submissions", value: 24 },
      { title: "Pending Approvals", value: 5 },
      { title: "Completed", value: 19 },
    ]
  });

  // Check if user is authenticated
  useEffect(() => {
    // Simulate API call to verify authentication
    setTimeout(() => {
      setIsLoading(false);
      // In a real app, you would check if user is logged in
      // and redirect to login if not authenticated
      /*
      const isAuthenticated = checkAuthentication();
      if (!isAuthenticated) {
        router.push('/auth/login');
      }
      */
    }, 1000);
  }, [router]);

  const handleLogout = () => {
    // Simulate logout
    toast.success('Logged out successfully');
    router.push('/');
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#0F0F0F] text-[#EAEAEA]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#EAEAEA]"></div>
      </div>
    );
  }

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-[#0F0F0F] text-[#EAEAEA]">
      {/* Mobile menu button */}
      <div className="md:hidden fixed top-4 left-4 z-50">
        <Button 
          variant="outline" 
          size="icon" 
          onClick={toggleSidebar}
          className="bg-[#1C1C1C] border-[#333333]"
        >
          {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
        </Button>
      </div>

      {/* Sidebar */}
      <div 
        className={`${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } md:translate-x-0 transition-transform duration-300 fixed md:static top-0 left-0 h-full w-64 bg-[#1C1C1C] p-4 border-r border-[#333333] overflow-y-auto z-40`}
      >
        <div className="flex items-center justify-center mb-8 p-4">
          <h1 className="text-xl font-bold">PAN Portal</h1>
        </div>
        
        <nav className="space-y-2">
          <NavItem icon={<LayoutDashboard size={20} />} label="Dashboard" active />
          <NavItem icon={<FileText size={20} />} label="Documents" />
          <NavItem icon={<Users size={20} />} label="Account" />
          <NavItem icon={<Bell size={20} />} label="Notifications" />
          <NavItem icon={<Settings size={20} />} label="Settings" />
          
          <div className="pt-8">
            <Button 
              variant="outline" 
              className="w-full flex items-center justify-start gap-2 mt-auto bg-[#2A2A2A] border-[#333333] hover:bg-[#3A3A3A] text-[#D4D4D4]"
              onClick={handleLogout}
            >
              <LogOut size={20} />
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
            <p className="text-gray-400 mt-1">Welcome back, {userData.name}</p>
          </div>
          
          <div className="relative w-full md:w-64">
            <Input
              type="text"
              placeholder="Search..."
              className="bg-[#2A2A2A] border-[#333333] pl-10 pr-4 py-2 w-full"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={18} />
          </div>
        </header>

        {/* User info card */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-[#1C1C1C] border-[#333333] col-span-1">
            <CardHeader>
              <CardTitle>Account Summary</CardTitle>
              <CardDescription>Your PAN information</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div>
                  <div className="text-sm text-gray-400">PAN Number</div>
                  <div className="font-medium">{userData.panNumber}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-400">Last Login</div>
                  <div className="font-medium">{userData.lastLogin}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-400">Pending Actions</div>
                  <div className="font-medium text-yellow-500">{userData.pendingActions} actions require attention</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Stats cards */}
          {userData.stats.map((stat, index) => (
            <Card key={index} className="bg-[#1C1C1C] border-[#333333]">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">{stat.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{stat.value}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Recent activity */}
        <Card className="bg-[#1C1C1C] border-[#333333] mb-6">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Your latest account activities</CardDescription>
          </CardHeader>
          <CardContent>
            <table className="w-full">
              <thead>
                <tr className="text-left border-b border-[#333333]">
                  <th className="pb-2 font-medium">Action</th>
                  <th className="pb-2 font-medium">Date</th>
                </tr>
              </thead>
              <tbody>
                {userData.recentActivity.map((activity) => (
                  <tr key={activity.id} className="border-b border-[#333333]">
                    <td className="py-3">{activity.action}</td>
                    <td className="py-3 text-gray-400">{activity.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </CardContent>
        </Card>

        {/* Quick actions */}
        <Card className="bg-[#1C1C1C] border-[#333333]">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common tasks you can perform</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              <Button className="w-full">Upload Document</Button>
              <Button variant="outline" className="w-full bg-[#2A2A2A] border-[#333333] hover:bg-[#3A3A3A] text-[#D4D4D4]">
                Update Profile
              </Button>
              <Button variant="outline" className="w-full bg-[#2A2A2A] border-[#333333] hover:bg-[#3A3A3A] text-[#D4D4D4]">
                View Reports
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

// Navigation Item Component
function NavItem({ icon, label, active = false }: { icon: React.ReactNode; label: string; active?: boolean }) {
  return (
    <div 
      className={`
        flex items-center gap-3 px-3 py-2 rounded-md cursor-pointer transition-colors
        ${active 
          ? 'bg-[#333333] text-white' 
          : 'text-gray-400 hover:bg-[#2A2A2A] hover:text-white'
        }
      `}
    >
      {icon}
      <span>{label}</span>
    </div>
  );
}