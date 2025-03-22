import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function LoginForm({
    onSubmit,
  className,
  ...props
}: { onSubmit: (data: { adminId: string; password: string }) => void } & React.ComponentPropsWithoutRef<"div">) {

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
    
        const form = event.target as HTMLFormElement;
        const adminId = (form.elements.namedItem("adminId") as HTMLInputElement).value;
        const password = (form.elements.namedItem("password") as HTMLInputElement).value;
    
        // Pass the data to the parent via the onSubmit prop
        onSubmit({ adminId, password });
      };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Admin Login</CardTitle>
          <CardDescription>
            Enter your Admin ID below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email">Admin ID</Label>
                <Input
                  id="adminId"
                  type="text"
                  placeholder="AD123456"
                  required
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                </div>
                <Input id="password" type="password" required />
              </div>
              <Button type="submit" className="w-full">
                Login
              </Button>
            </div>
            <div className="mt-4 text-center text-sm text-gray-500">
              © {new Date().getFullYear()} IFSS Admin Panel. All rights reserved.
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
