"use client"
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import {
  Shield,
  ChevronRight,
  FileText,
  Users,
  Calendar,
  ArrowRight,
  Bell,
  ExternalLink,
  CheckCircle,
  Menu,
  X,
  Smartphone,
  CreditCard,
  DollarSign,
  BarChart,
  Lock,
  AlertTriangle,
  Wallet,
  Mic,
  PieChart,
  Brain
} from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import CARegistrationForm from './auth/ca-register/page';

// News items data
const newsItems = [
  {
    id: 1,
    title: "Income tax deadline: Only 1 day left to pay last instalment of advance tax",
    description: "The final instalment of advance tax for FY 2024-25 must be paid by March 15, 2025.",
    date: "March 15, 2025",
    urgent: false
  },
  {
    id: 2,
    title: "Taxpayers under presumptive taxation scheme must pay full advance tax",
    description: "March 15 is the deadline for taxpayers under Section 44AD/44ADA to pay their full advance tax.",
    date: "March 13, 2025",
    urgent: false
  },
  {
    id: 3,
    title: "Government offices must submit Form 24G by March 15",
    description: "Offices deducting TDS/TCS for February 2025 must submit Form 24G by this date.",
    date: "March 13, 2025",
    urgent: false
  },
  {
    id: 4,
    title: "IT Department launches mobile app for viewing and correcting AIS",
    description: "New mobile app allows taxpayers to view and correct discrepancies in Annual Information Statement (AIS).",
    date: "March 22, 2023",
    urgent: false
  }
];

// Features data
const featuresData = [
  { 
    icon: FileText, 
    title: "Document Management", 
    description: "Securely store and organize financial documents with end-to-end encryption."
  },
  { 
    icon: Users, 
    title: "Professional Network", 
    description: "Connect with verified Chartered Accountants for expert tax guidance."
  },
  { 
    icon: Calendar, 
    title: "Compliance Tracking", 
    description: "Never miss a deadline with automated tax and filing reminders."
  },
  { 
    icon: Smartphone, 
    title: "Mobile App Access", 
    description: "View and correct your Annual Information Statement (AIS) on the go."
  },
  { 
    icon: Bell, 
    title: "Alerts & Notifications", 
    description: "Receive timely alerts for transactions, account activities, and security updates."
  },
  { 
    icon: Lock, 
    title: "Enhanced Security", 
    description: "Biometric authentication, two-factor verification, and data encryption."
  }
];

// Banking features data
const bankingFeatures = [
  {
    icon: CreditCard,
    title: "Bill Payments",
    description: "Manage and pay recurring bills directly from the app with reminders and payment history tracking."
  },
  {
    icon: Wallet,
    title: "Digital Wallets",
    description: "Store payment information securely and make swift transactions within the app."
  },
  {
    icon: DollarSign,
    title: "P2P Lending Integration",
    description: "Connect with peer-to-peer lending networks to borrow from or lend to other users directly."
  },
  {
    icon: PieChart,
    title: "Personal Financial Management",
    description: "Analyze spending patterns, get personalized financial advice, and improve financial habits."
  },
  {
    icon: Brain,
    title: "AI-Powered Insights",
    description: "Get personalized financial insights and automated fraud detection powered by artificial intelligence."
  },
  {
    icon: Mic,
    title: "Voice Assistant",
    description: "Perform transactions and access account information hands-free with voice commands."
  }
];

export default function HomePage() {
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("individual");

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col dark:bg-zinc-950">
      {/* Navigation */}
      <header className="sticky top-0 z-50 w-full border-b border-border/50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container max-w-7xl mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-4">
            <Shield className="h-6 w-6 text-primary" />
            <span className="text-lg font-semibold">IFSS</span>
          </div>

          <nav className="hidden md:flex items-center space-x-8">
            <a href="#about" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">About</a>
            <a href="#features" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">Features</a>
            <a href="#news" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">Tax Updates</a>
            <a href="#ca-portal" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">CA Portal</a>
            <a href="#faq" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">FAQ</a>
          </nav>

          <div className="flex items-center space-x-2">
            <div className="hidden md:flex space-x-2">
              <Button variant="ghost" onClick={() => router.push('/auth/login')}>
                Login
              </Button>
              <Button onClick={() => router.push('/auth/signup')} className="bg-primary hover:bg-primary/90 text-primary-foreground dark:hover:bg-primary/80">
                Sign Up
              </Button>
            </div>

            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild className="md:hidden">
                <Button variant="outline" size="icon">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent>
                <div className="grid gap-4 py-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Shield className="h-6 w-6 text-primary" />
                      <span className="text-lg font-semibold">IFSS</span>
                    </div>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <X className="h-5 w-5" />
                    </Button>
                  </div>
                  <Separator />
                  <nav className="grid gap-4">
                    {['About', 'Features', 'Tax Updates', 'CA Portal', 'FAQ'].map((item) => (
                      <a 
                        key={item} 
                        href={`#${item.toLowerCase().replace(' ', '-')}`}
                        className="text-sm font-medium hover:text-primary"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {item}
                      </a>
                    ))}
                  </nav>
                  <Separator />
                  <div className="grid gap-2">
                    <Button variant="outline" onClick={() => router.push('/auth/login')}>
                      Login
                    </Button>
                    <Button onClick={() => router.push('/auth/signup')} className="bg-primary hover:bg-primary/90 text-primary-foreground dark:hover:bg-primary/80">
                      Sign Up
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        {/* Hero Section */}
        <section className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 space-y-12">
          <div className="text-center space-y-6 md:space-y-8">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent pb-1">
              Secure Your Financial Future
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
              Integrated Financial Security System: Streamline tax filing, connect with professionals, and manage your financial documents with ease.
            </p>
            <div className="flex justify-center gap-4">
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground dark:hover:bg-primary/80">Get Started</Button>
              <Button variant="outline" size="lg">Learn More</Button>
            </div>
          </div>

          {/* User Type Tabs */}
          <div className="max-w-3xl mx-auto">
            <Tabs defaultValue="individual" className="w-full" onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="individual">Individual</TabsTrigger>
                <TabsTrigger value="ca">Chartered Accountant</TabsTrigger>
                <TabsTrigger value="business">Business</TabsTrigger>
              </TabsList>
              <TabsContent value="individual" className="mt-6">
                <Card className="border-border dark:border-zinc-800 dark:bg-zinc-900/50">
                  <CardHeader>
                    <CardTitle>For Individual Taxpayers</CardTitle>
                    <CardDescription>
                      Simplify your tax filing process and manage your financial documents securely.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div className="flex items-start space-x-3">
                        <CheckCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                        <span className="text-sm">Easy ITR filing with pre-filled data</span>
                      </div>
                      <div className="flex items-start space-x-3">
                        <CheckCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                        <span className="text-sm">Secure document storage</span>
                      </div>
                      <div className="flex items-start space-x-3">
                        <CheckCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                        <span className="text-sm">Tax deadline reminders</span>
                      </div>
                      <div className="flex items-start space-x-3">
                        <CheckCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                        <span className="text-sm">Mobile app for on-the-go access</span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground dark:hover:bg-primary/80">
                      Register as Individual
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>
              <TabsContent value="ca" className="mt-6">
                <Card className="border-border dark:border-zinc-800 dark:bg-zinc-900/50">
                  <CardHeader>
                    <CardTitle>For Chartered Accountants</CardTitle>
                    <CardDescription>
                      Streamline your practice with our specialized CA tools and client management features.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div className="flex items-start space-x-3">
                        <CheckCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                        <span className="text-sm">Bulk client management</span>
                      </div>
                      <div className="flex items-start space-x-3">
                        <CheckCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                        <span className="text-sm">Multiple team member logins</span>
                      </div>
                      <div className="flex items-start space-x-3">
                        <CheckCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                        <span className="text-sm">Pre and post-filing summaries</span>
                      </div>
                      <div className="flex items-start space-x-3">
                        <CheckCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                        <span className="text-sm">Auto-populated forms</span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground dark:hover:bg-primary/80">
                      Register as CA
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>
              <TabsContent value="business" className="mt-6">
                <Card className="border-border dark:border-zinc-800 dark:bg-zinc-900/50">
                  <CardHeader>
                    <CardTitle>For Businesses</CardTitle>
                    <CardDescription>
                      Comprehensive financial management tools for your business needs.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div className="flex items-start space-x-3">
                        <CheckCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                        <span className="text-sm">Business expense tracking</span>
                      </div>
                      <div className="flex items-start space-x-3">
                        <CheckCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                        <span className="text-sm">Financial reporting</span>
                      </div>
                      <div className="flex items-start space-x-3">
                        <CheckCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                        <span className="text-sm">Tax compliance tools</span>
                      </div>
                      <div className="flex items-start space-x-3">
                        <CheckCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                        <span className="text-sm">Multi-user access</span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground dark:hover:bg-primary/80">
                      Register as Business
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Features Overview */}
          <div id="features" className="pt-8">
            <h2 className="text-3xl font-bold text-center mb-10">Key Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
              {featuresData.map(({ icon: Icon, title, description }) => (
                <Card key={title} className="border-border dark:border-zinc-800 dark:bg-zinc-900/50 hover:dark:border-primary/40 hover:shadow-md hover:border-primary/50 transition-all duration-300">
                  <CardHeader className="pb-2">
                    <Icon className="h-8 w-8 text-primary mb-3" />
                    <CardTitle className="text-xl">{title}</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-2">
                    <p className="text-muted-foreground text-sm leading-relaxed">{description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CA Registration Section */}
        <section id="ca-portal" className="bg-muted/30 dark:bg-zinc-900/30 py-12 md:py-20">
          <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
            <div className="text-center space-y-4">
              <h2 className="text-3xl font-bold">Chartered Accountant Portal</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Streamline your practice with our specialized tools for CAs. Manage clients, file returns, and grow your business.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8 items-center mt-12">
              <div className="space-y-6">
                <h3 className="text-2xl font-semibold">CA Registration Process</h3>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="flex h-7 w-7 items-center justify-center rounded-full border border-primary text-primary font-medium">1</div>
                    <div className="space-y-1">
                      <h4 className="font-medium">Verify Credentials</h4>
                      <p className="text-sm text-muted-foreground">Submit your CA registration number and supporting documents for verification.</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="flex h-7 w-7 items-center justify-center rounded-full border border-primary text-primary font-medium">2</div>
                    <div className="space-y-1">
                      <h4 className="font-medium">Complete Profile</h4>
                      <p className="text-sm text-muted-foreground">Add your professional details, areas of expertise, and practice information.</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="flex h-7 w-7 items-center justify-center rounded-full border border-primary text-primary font-medium">3</div>
                    <div className="space-y-1">
                      <h4 className="font-medium">Start Using Platform</h4>
                      <p className="text-sm text-muted-foreground">Begin managing clients, filing returns, and growing your practice.</p>
                    </div>
                  </div>
                </div>
                <Button className="mt-4 bg-primary hover:bg-primary/90 text-primary-foreground dark:hover:bg-primary/80">
                  Register as CA <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
              <CARegistrationForm/>
            </div>
          </div>
        </section>

        {/* News Section */}
        <section id="news" className="py-12 md:py-20">
          <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
            <div className="text-center space-y-4">
              <h2 className="text-3xl font-bold">Latest Tax Updates</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Stay informed with the latest tax news, deadlines, and regulatory changes.
              </p>
            </div>
            
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {newsItems.map((item) => (
                <Card key={item.id} className="border-border dark:border-zinc-800 dark:bg-zinc-900/50 hover:shadow-md transition-all duration-300">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-lg">{item.title}</CardTitle>
                      {item.urgent && <Badge variant="destructive">Urgent</Badge>}
                    </div>
                    <CardDescription>{item.date}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                  </CardContent>
                  <CardFooter>
                    <Button variant="link" className="p-0">
                      Read more <ChevronRight className="h-4 w-4 ml-1" />
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
            
            <div className="flex justify-center mt-8">
              <Button variant="outline">
                View All Tax Updates <ExternalLink className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </section>
        
        {/* Banking Features Section */}
        <section className="bg-muted/30 dark:bg-zinc-900/30 py-12 md:py-20">
          <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
            <div className="text-center space-y-4">
              <h2 className="text-3xl font-bold">Integrated Banking Features</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Manage all your financial needs in one secure platform with our integrated banking features.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
              {bankingFeatures.map(({ icon: Icon, title, description }) => (
                <Card key={title} className="border-border dark:border-zinc-800 dark:bg-zinc-900/50 hover:shadow-md hover:border-primary/50 transition-all duration-300">
                  <CardHeader className="pb-2">
                    <Icon className="h-8 w-8 text-primary mb-3" />
                    <CardTitle className="text-xl">{title}</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-2">
                    <p className="text-muted-foreground text-sm leading-relaxed">{description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section id="faq" className="py-12 md:py-20">
          <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
            <h2 className="text-3xl font-bold text-center mb-8">Frequently Asked Questions</h2>
            <Accordion type="single" collapsible className="w-full max-w-3xl mx-auto">
              <AccordionItem value="item-1">
                <AccordionTrigger>How secure is my financial data?</AccordionTrigger>
                <AccordionContent>
                  Your financial data is protected with state-of-the-art encryption and security measures. We use end-to-end encryption to ensure that only you and your authorized accountant can access your sensitive information.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>Can I connect with my existing CA?</AccordionTrigger>
                <AccordionContent>
                  Yes, you can invite your existing Chartered Accountant to join the platform. If they're already on our network, you can easily connect and share necessary documents securely.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger>How does the tax filing reminder system work?</AccordionTrigger>
                <AccordionContent>
                  Our system automatically tracks important tax deadlines and sends you timely reminders via email and push notifications. You can customize the frequency and type of reminders in your account settings.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-4">
                <AccordionTrigger>What documents can I store on the platform?</AccordionTrigger>
                <AccordionContent>
                  You can store all types of financial documents including income statements, investment proofs, property documents, tax returns, and more. Our platform supports various file formats including PDF, JPG, PNG, and Excel files.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-5">
                <AccordionTrigger>Is there a mobile app available?</AccordionTrigger>
                <AccordionContent>
                  Yes, we offer mobile apps for both iOS and Android platforms. The mobile app allows you to access your documents, receive notifications, and even scan and upload documents directly from your phone.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-6">
                <AccordionTrigger>How do I get started with the platform?</AccordionTrigger>
                <AccordionContent>
                  Getting started is simple. Just sign up for an account, verify your email, and complete your profile. You can then start uploading documents, connecting with professionals, and using our tax filing tools right away.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="bg-primary/5 dark:bg-primary/10 py-16 md:py-24">
          <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold">Ready to secure your financial future?</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Join thousands of individuals and businesses who trust our platform for their financial security needs.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4 mt-6">
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground dark:hover:bg-primary/80">
                Create Free Account
              </Button>
              <Button variant="outline" size="lg">
                Schedule a Demo
              </Button>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-border bg-muted/50 dark:bg-zinc-900/50">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Shield className="h-6 w-6 text-primary" />
                <span className="text-lg font-semibold">IFSS</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Integrated Financial Security System - Secure document management and tax filing platform.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">About Us</a></li>
                <li><a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">Features</a></li>
                <li><a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">Pricing</a></li>
                <li><a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">Contact</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Legal</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">Terms of Service</a></li>
                <li><a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">Cookie Policy</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Connect</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">Twitter</a></li>
                <li><a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">LinkedIn</a></li>
                <li><a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">Facebook</a></li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-border text-center text-sm text-muted-foreground">
            © 2025 IFSS. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}

