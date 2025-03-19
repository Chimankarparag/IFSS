"use client";

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
  X
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

// News items data
const newsItems = [
  {
    id: 1,
    title: "Income tax deadline: Only 1 day left to pay last instalment of advance tax",
    description: "The final instalment of advance tax for FY 2024-25 must be paid by March 15, 2025.",
    date: "March 15, 2025",
    urgent: true
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
  }
];

export default function HomePage() {
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      {/* Navigation */}
      <header className="border-b border-gray-800 sticky top-0 z-40 w-full bg-black/90 backdrop-blur supports-[backdrop-filter]:bg-black/60">
        <div className="container flex h-16 items-center justify-between px-4 py-4">
          <div className="flex items-center gap-2">
            <span className="text-xl text-white font-bold bg-clip-text bg-gradient-to-r from-primary to-primary/70">IFSS</span>
          </div>

          <nav className="hidden md:flex items-center space-x-6">
            <a href="#about" className="text-sm font-medium text-gray-400 hover:text-white transition-colors">About</a>
            <a href="#features" className="text-sm font-medium text-gray-400 hover:text-white transition-colors">Features</a>
            <a href="#news" className="text-sm font-medium text-gray-400 hover:text-white transition-colors">Tax Updates</a>
            <a href="#ca-portal" className="text-sm font-medium text-gray-400 hover:text-white transition-colors">CA Portal</a>
            <a href="#faq" className="text-sm font-medium text-gray-400 hover:text-white transition-colors">FAQ</a>
          </nav>

          <div className="flex items-center gap-3">
            <div className="hidden md:flex gap-2">
              <Button
                onClick={() => router.push('/auth/login')}
                variant="ghost"
                className="text-sm font-medium text-gray-400 hover:text-black"
              >
                Login
              </Button>
              <Button
                onClick={() => router.push('/auth/signup')}
                className="text-sm font-medium bg-primary hover:bg-primary/90"
              >
                Sign Up
              </Button>
            </div>

            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild className="md:hidden">
                <Button variant="ghost" size="icon" className="text-gray-400">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px] bg-black border-gray-800">
                <div className="flex justify-between items-center p-4 mb-8">
                  <div className="flex items-center gap-2">
                    <span className="text-xl font-bold bg-clip-text text-white bg-gradient-to-r from-primary to-primary/70">IFSS</span>
                  </div>
                  <Button variant="ghost" size="icon" onClick={() => setMobileMenuOpen(false)}>
                    <X className="h-5 w-5 text-white" />
                  </Button>
                </div>
                <nav className="flex flex-col gap-4 px-4">
                  <a
                    href="#about"
                    className="text-sm font-medium text-gray-400 hover:text-white transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    About
                  </a>
                  <a
                    href="#features"
                    className="text-sm font-medium text-gray-400 hover:text-white transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Features
                  </a>
                  <a
                    href="#news"
                    className="text-sm font-medium text-gray-400 hover:text-white transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Tax Updates
                  </a>
                  <a
                    href="#ca-portal"
                    className="text-sm font-medium text-gray-400 hover:text-white transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    CA Portal
                  </a>
                  <a
                    href="#faq"
                    className="text-sm font-medium text-gray-400 hover:text-white transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    FAQ
                  </a>
                  <div className="h-px bg-gray-800 my-4" />
                  <div className="flex flex-col gap-2">
                    <Button
                      onClick={() => {
                        router.push('/auth/login');
                        setMobileMenuOpen(false);
                      }}

                      className="w-full justify-start bg-primary hover:bg-primary/90"
                    >
                      Login
                    </Button>
                    <Button
                      onClick={() => {
                        router.push('/auth/signup');
                        setMobileMenuOpen(false);
                      }}
                      className="w-full justify-start bg-primary hover:bg-primary/90"
                    >
                      Sign Up
                    </Button>
                  </div>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      {/* About Section */}
      <section id="about" className="container px-4 py-16 md:py-24">
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-16 items-center">
          <div>
            <h2 className="text-3xl font-bold tracking-tight scroll-m-20 mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-500">About IFSS</h2>
            <p className="text-gray-400 mb-6 leading-7">
              The Integrated Financial Security System (IFSS) is designed to streamline tax filing processes, connect taxpayers with certified professionals, and ensure secure management of financial documents.
            </p>
            <p className="text-gray-400 mb-6 leading-7">
              Our platform provides end-to-end encryption for all your sensitive financial data, while making it easy to collaborate with tax professionals and stay compliant with regulations.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button variant="outline" className="gap-2 bg-primary text-gray-400 hover:text-black ">
                Learn More <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Card className="bg-black/40 border border-gray-800">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg text-white">Security</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-400">
                  End-to-end encryption and multi-factor authentication for all your data.
                </p>
              </CardContent>
            </Card>
            <Card className="bg-black/40 border border-gray-800">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg text-white">Compliance</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-400">
                  Stay updated with tax regulations and never miss a deadline.
                </p>
              </CardContent>
            </Card>
            <Card className="bg-black/40 border border-gray-800">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg text-white">Expertise</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-400">
                  Connect with verified CAs for professional guidance.
                </p>
              </CardContent>
            </Card>
            <Card className="bg-black/40 border border-gray-800">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg text-white">Efficiency</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-400">
                  Streamlined workflows to save time and reduce errors.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
      {/* Features Section */}
      <section id="features" className="bg-gradient-to-b from-black to-gray-900 py-16 md:py-24">
        <div className="container px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight scroll-m-20 mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-500">Key Features</h2>
            <p className="text-gray-400 max-w-[750px] mx-auto">
              IFSS combines document management, professional assistance, and secure authentication to create a seamless financial management experience.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            <Card className="bg-black/40 border border-gray-800 hover:border-gray-700 transition-all">
              <CardHeader>
                <FileText className="h-10 w-10 mb-4 text-primary" />
                <CardTitle className="text-white">Document Management</CardTitle>
                <CardDescription className="text-gray-400">
                  Securely store and organize all your financial documents
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5 text-primary" />
                    <span className="text-gray-300">End-to-end encrypted document storage</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5 text-primary" />
                    <span className="text-gray-300">Intelligent categorization and tagging</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5 text-primary" />
                    <span className="text-gray-300">Secure sharing with professionals</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5 text-primary" />
                    <span className="text-gray-300">Secure sharing with authorized professionals</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-black/40 border border-gray-800 hover:border-gray-700 transition-all">
              <CardHeader>
                <Users className="h-10 w-10 mb-4 text-primary" />
                <CardTitle className="text-white">Professional Assistance</CardTitle>
                <CardDescription className="text-gray-400">
                  Connect with certified CAs for expert guidance
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5 text-primary" />
                    <span className="text-gray-300">Network of verified chartered accountants</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5 text-primary" />
                    <span className="text-gray-300">Personalized tax filing assistance</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5 text-primary" />
                    <span className="text-gray-300">Secure messaging and consultation</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-black/40 border border-gray-800 hover:border-gray-700 transition-all">
              <CardHeader>
                <Calendar className="h-10 w-10 mb-4 text-primary" />
                <CardTitle className="text-white">Tax Compliance</CardTitle>
                <CardDescription className="text-gray-400">
                  Stay on top of deadlines and requirements
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5 text-primary" />
                    <span className="text-gray-300">Automated tax deadline reminders</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5 text-primary" />
                    <span className="text-gray-300">Compliance status monitoring</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5 text-primary" />
                    <span className="text-gray-300">Historical filing records and analytics</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
      {/* Latest News Section */}
      <section id="news" className="container px-4 py-16 md:py-24">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-4">
          <div>
            <h2 className="text-3xl font-bold tracking-tight scroll-m-20 mb-2 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-500">Latest Tax Updates</h2>
            <p className="text-gray-400">Stay informed with the latest news from the Income Tax Department</p>
          </div>
          <Button variant="outline" className="shrink-0 border-gray-800 bg-primary text-gray-400 hover:text-black hover:border-gray-700">
            View All <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {newsItems.map((item) => (
            <Card key={item.id} className="bg-black/40 border border-gray-800 hover:border-gray-700 transition-all">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <CardTitle className="text-xl text-white">{item.title}</CardTitle>
                  {item.urgent && (
                    <Badge variant="destructive" className="bg-red-500/20 text-red-400 hover:bg-red-500/30 border-none">Urgent</Badge>
                  )}
                </div>
                <CardDescription className="text-gray-500">{item.date}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-400">{item.description}</p>
              </CardContent>
              <CardFooter>
                <Button variant="ghost" className="p-0 text-white bg-primary/60 hover:text-primary/90">
                  Read More <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>
      {/* CA Portal Section */}
      <section id="ca-portal" className="bg-gradient-to-b from-gray-900 to-black py-16 md:py-24">
        <div className="container px-4">
          <div className="grid gap-12 lg:grid-cols-2 items-center">
            <div>
              <h2 className="text-3xl font-bold tracking-tight scroll-m-20 mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-500">For Chartered Accountants</h2>
              <p className="text-gray-400 mb-6 leading-7">
                IFSS provides a platform for Chartered Accountants to expand their client base, streamline their practice, and offer digital services to taxpayers nationwide.
              </p>

              <ul className="space-y-4 mb-8">
                <li className="flex items-start">
                  <div className="mr-3 mt-1">
                    <CheckCircle className="h-5 w-5 text-primary" />
                  </div>
                  <span className="text-gray-300">Access a growing pool of clients seeking tax assistance</span>
                </li>
                <li className="flex items-start">
                  <div className="mr-3 mt-1">
                    <CheckCircle className="h-5 w-5 text-primary" />
                  </div>
                  <span className="text-gray-300">Utilize our secure platform for document exchange and client communication</span>
                </li>
                <li className="flex items-start">
                  <div className="mr-3 mt-1">
                    <CheckCircle className="h-5 w-5 text-primary" />
                  </div>
                  <span className="text-gray-300">Expand your practice beyond geographical limitations</span>
                </li>
              </ul>

              <Button
                onClick={() => router.push('/ca/register')}
                className="gap-2 bg-primary hover:bg-primary/90"
              >
                Apply as a CA <ExternalLink className="h-4 w-4" />
              </Button>
            </div>

            <Card className="bg-black/60 border border-gray-800">
              <CardHeader>
                <CardTitle className="text-white">Join Our Network of Tax Professionals</CardTitle>
                <CardDescription className="text-gray-400">
                  Complete the application to become a verified CA on our platform
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 gap-4">
                    <div className="space-y-2">
                      <h4 className="font-medium text-white">Benefits for CAs</h4>
                      <ul className="list-disc pl-5 space-y-2 text-sm text-gray-400">
                        <li>Increased client acquisition</li>
                        <li>Digital practice management</li>
                        <li>Secure client communication</li>
                        <li>Automated document collection</li>
                        <li>Streamlined workflow</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full bg-primary hover:bg-primary/90">
                  Register Now
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </section>
      {/* FAQ Section */}
      <section id="faq" className="container px-4 py-16 md:py-24">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight scroll-m-20 mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-500">Frequently Asked Questions</h2>
          <p className="text-gray-400 max-w-[750px] mx-auto">
            Find answers to common questions about IFSS and our services
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1" className="border-gray-800">
              <AccordionTrigger className="text-white hover:text-gray-200">How secure is my financial data on IFSS?</AccordionTrigger>
              <AccordionContent className="text-gray-400">
                IFSS employs end-to-end encryption for all data storage and transmission. We use industry-standard security protocols and regular security audits to ensure your financial information remains protected. Additionally, our platform implements multi-factor authentication and role-based access controls.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2" className="border-gray-800">
              <AccordionTrigger className="text-white hover:text-gray-200">How do I connect with a CA on the platform?</AccordionTrigger>
              <AccordionContent className="text-gray-400">
                After creating your account, you can browse our network of verified CAs, view their profiles, specializations, and ratings. You can then send connection requests to CAs who match your requirements. Once a CA accepts your request, you can securely share documents and communicate through our platform.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3" className="border-gray-800">
              <AccordionTrigger className="text-white hover:text-gray-200">What types of documents can I store on IFSS?</AccordionTrigger>
              <AccordionContent className="text-gray-400">
                IFSS supports all common document formats including PDFs, images (JPG, PNG), spreadsheets (Excel, CSV), and text documents (Word, TXT). You can store tax returns, financial statements, receipts, invoices, and any other documents relevant to your financial and tax management.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-4" className="border-gray-800">
              <AccordionTrigger className="text-white hover:text-gray-200">How does the tax deadline reminder system work?</AccordionTrigger>
              <AccordionContent className="text-gray-400">
                Our system automatically tracks important tax deadlines based on your profile and tax category. You'll receive notifications via email and in-app alerts before upcoming deadlines. You can also customize reminder settings to specify how far in advance you'd like to be notified.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-5" className="border-gray-800">
              <AccordionTrigger className="text-white hover:text-gray-200">What are the requirements to register as a CA?</AccordionTrigger>
              <AccordionContent className="text-gray-400">
                To register as a CA on our platform, you must have a valid CA certification from ICAI, provide professional references, and complete our verification process. We'll verify your credentials, professional standing, and conduct background checks to ensure the quality of professionals on our platform.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-b from-black to-gray-900 py-16 md:py-24">
        <div className="container px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold tracking-tight scroll-m-20 mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-500">Ready to Secure Your Financial Future?</h2>
            <p className="text-gray-400 mb-8">
              Join thousands of users who trust IFSS for their financial document management and tax filing needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={() => router.push('/auth/signup')}
                size="lg"
                className="px-8 bg-primary hover:bg-primary/90"
              >
                Create Free Account
              </Button>
              <Button
                onClick={() => router.push('/demo')}
                variant="outline"
                size="lg"
                className="px-8 border-gray-800 text-gray-900 hover:text-black hover:border-gray-700"
              >
                Request Demo
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}

      <footer className="border-t border-gray-800 py-12 md:py-16 bg-black">
        <div className="container px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">
            <div className="col-span-2 lg:col-span-1">
              <div className="flex items-center gap-2 mb-4">
                <Shield className="h-6 w-6 text-primary" />
                <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">IFSS</span>
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                Integrated Financial Security System - Secure document management and tax filing platform.
              </p>
              <div className="flex gap-4">
                <Button variant="ghost" size="icon" className="hover:bg-gray-900">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
                  <span className="sr-only">Facebook</span>
                </Button>
                <Button variant="ghost" size="icon" className="hover:bg-gray-900">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg>
                  <span className="sr-only">Twitter</span>
                </Button>
                <Button variant="ghost" size="icon" className="hover:bg-gray-900">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line></svg>
                  <span className="sr-only">Instagram</span>
                </Button>
                <Button variant="ghost" size="icon" className="hover:bg-gray-900">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect width="4" height="12" x="2" y="9"></rect><circle cx="4" cy="4" r="2"></circle></svg>
                  <span className="sr-only">LinkedIn</span>
                </Button>
              </div>
            </div>
            <div>
              <h3 className="font-medium text-sm mb-4 text-gray-300">Platform</h3>
              <ul className="space-y-3 text-sm">
                <li><a href="#" className="text-muted-foreground hover:text-gray-300 transition-colors">Features</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-gray-300 transition-colors">Security</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-gray-300 transition-colors">Pricing</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-gray-300 transition-colors">FAQ</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-medium text-sm mb-4 text-gray-300">Resources</h3>
              <ul className="space-y-3 text-sm">
                <li><a href="#" className="text-muted-foreground hover:text-gray-300 transition-colors">Tax Guides</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-gray-300 transition-colors">Documentation</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-gray-300 transition-colors">Blog</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-gray-300 transition-colors">Webinars</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-medium text-sm mb-4 text-gray-300">Company</h3>
              <ul className="space-y-3 text-sm">
                <li><a href="#" className="text-muted-foreground hover:text-gray-300 transition-colors">About Us</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-gray-300 transition-colors">Careers</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-gray-300 transition-colors">Contact</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-gray-300 transition-colors">Partners</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-medium text-sm mb-4 text-gray-300">Legal</h3>
              <ul className="space-y-3 text-sm">
                <li><a href="#" className="text-muted-foreground hover:text-gray-300 transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-gray-300 transition-colors">Terms of Service</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-gray-300 transition-colors">Cookie Policy</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-gray-300 transition-colors">Compliance</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} IFSS. All rights reserved.
            </p>
            <div className="flex gap-4 text-sm text-muted-foreground">
              <a href="#" className="hover:text-gray-300 transition-colors">Privacy</a>
              <a href="#" className="hover:text-gray-300 transition-colors">Terms</a>
              <a href="#" className="hover:text-gray-300 transition-colors">Cookies</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}