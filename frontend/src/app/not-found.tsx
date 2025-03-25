import Link from "next/link";
import { Shield, Home, Search, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background text-foreground dark:bg-zinc-950">
      <div className="container flex max-w-md flex-col items-center justify-center gap-4 text-center">
        <Shield className="h-16 w-16 text-primary opacity-80" />
        
        <h1 className="bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-6xl font-bold tracking-tighter text-transparent sm:text-8xl">
          404
        </h1>
        
        <h2 className="text-2xl font-semibold tracking-tight">Page not found</h2>
        
        <p className="text-muted-foreground">
          We couldn't locate the financial document you're looking for. It may have been moved, deleted, or never existed.
        </p>
        
        <div className="mt-6 flex flex-col gap-2 sm:flex-row sm:gap-4">
          <Button asChild size="lg">
            <Link href="/">
              <Home className="mr-2 h-4 w-4" />
              Back to Home
            </Link>
          </Button>
          
          <Button variant="outline" size="lg" asChild>
            <Link href="/contact">
              <Search className="mr-2 h-4 w-4" />
              Search Help
            </Link>
          </Button>
        </div>
      </div>
      
      <div className="mt-16 text-center text-sm text-muted-foreground">
        <p>Need assistance? <Link href="/contact" className="text-primary hover:underline">Contact our support team</Link></p>
      </div>
    </div>
  );
}
