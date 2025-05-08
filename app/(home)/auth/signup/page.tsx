"use client";
import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { addUser } from "../_actions/auth_actions";
import { MagicCard } from "@/components/magicui/magic-card";
import { useTheme } from "next-themes";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

const SignUpPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { theme } = useTheme();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    const loadingToast = toast.loading("Adding user...");

    const formData = new FormData(event.currentTarget);
    const username = formData.get("username") as string;
    const password = formData.get("password") as string;
    const firstName = formData.get("firstName") as string;
    const lastName = formData.get("lastName") as string;
    const email = formData.get("email") as string;

    try {
      const isUsernameValid = (username: string) => /^[^\s]+$/.test(username);
      if (!isUsernameValid(username)) {
        throw new Error("Username must not contain spaces");
      }
      const result = await addUser({
        username,
        password,
        firstName,
        lastName,
        email,
      });

      if (result.success) {
        toast.success("User added successfully", {
          id: loadingToast,
          description:
            "Account created successfully, please login to continue.",
        });
        router.push("/auth/login");
      } else {
        toast.error(result.error || "Failed to add user", {
          id: loadingToast,
        });
      }
    } catch (error) {
      console.error(error);
      toast.error(`An unexpected error occurred: ${error}`, {
        id: loadingToast,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center ">
      <Card className="w-full max-w-md shadow-none border-none bg-transparent mx-2">
        <MagicCard
          gradientColor={theme === "dark" ? "#262626" : "#D9D9D955"}
          className="p-0"
        >
          <CardHeader className="border-b border-border p-4 [.border-b]:pb-4">
            <CardTitle>Create an Account</CardTitle>
            <CardDescription>
              Sign up to become an account manager
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="p-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input
                    id="firstName"
                    name="firstName"
                    type="text"
                    required
                    autoComplete="given-name"
                    placeholder="John"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input
                    id="lastName"
                    name="lastName"
                    type="text"
                    required
                    autoComplete="family-name"
                    placeholder="Doe"
                  />
                </div>
              </div>

              <div className="grid gap-4 pt-4">
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    required
                    placeholder="john@example.com"
                  />
                </div>

                <div className="grid gap-2 ">
                  <Label htmlFor="username">Username</Label>
                  <Input
                    id="username"
                    name="username"
                    type="text"
                    required
                    placeholder="johndoe"
                    autoComplete="username"
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      required
                      placeholder="••••••••"
                      autoComplete="new-password"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute right-2 top-1/2 -translate-y-1/2 hover:bg-transparent"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col  justify-center p-4 border-t border-border [.border-t]:pt-4 gap-3  ">
              <Button
                type="submit"
                disabled={loading}
                className="w-full  cursor-pointer"
              >
                {loading ? "Creating Account..." : "Create Account"}
              </Button>

              <p className="text-sm text-gray-500">
                Already have an account?{" "}
                <a
                  href="/auth/login"
                  className="text-primary hover:text-primary/80 font-medium"
                >
                  Sign in
                </a>
              </p>
            </CardFooter>
          </form>
        </MagicCard>
      </Card>
    </div>
  );
};

export default SignUpPage;
