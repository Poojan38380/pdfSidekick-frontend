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
import { MagicCard } from "@/components/magicui/magic-card";
import { useTheme } from "next-themes";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { signIn } from "next-auth/react";

const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  password: z.string().min(1, {
    message: "Password is required",
  }),
});

const LoginPage = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { theme } = useTheme();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    const loadingToast = toast.loading("Logging in...");

    try {
      const isUsernameValid = (username: string) => /^[^\s]+$/.test(username);
      if (!isUsernameValid(values.username)) {
        throw new Error("Username must not contain spaces");
      }
      const result = await signIn("credentials", {
        redirect: false,
        username: values.username,
        password: values.password,
      });

      if (result?.error) {
        toast.error("Login Failed. Try again.", {
          description: "Invalid username or password.",
          id: loadingToast,
        });
        setLoading(false);
        return;
      }

      router.push("/dashboard");
      toast.success("Login Successful", {
        description: "Welcome to PDF Sidekick!",
        id: loadingToast,
      });
    } catch (error) {
      console.error("Unexpected error during login:", error);
      toast.error(`An unexpected error occurred: ${error}`, {
        id: loadingToast,
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen  items-center justify-center ">
      <Card className="w-full max-w-md shadow-none border-none bg-transparent mx-2">
        <MagicCard
          gradientColor={theme === "dark" ? "#262626" : "#D9D9D955"}
          className="p-0"
        >
          <CardHeader className="border-b border-border p-4 [.border-b]:pb-4">
            <CardTitle>Login</CardTitle>
            <CardDescription>
              Enter your credentials to access your account
            </CardDescription>
          </CardHeader>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <CardContent className="p-4">
              <div className="grid gap-4">
                <div className="grid gap-2 ">
                  <Label htmlFor="username">Username</Label>
                  <Input
                    {...form.register("username")}
                    id="username"
                    type="text"
                    placeholder="johndoe"
                    autoComplete="username"
                  />
                  {form.formState.errors.username && (
                    <p className="text-sm text-destructive">
                      {form.formState.errors.username.message}
                    </p>
                  )}
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Input
                      {...form.register("password")}
                      id="password"
                      type={showPassword ? "text" : "password"}
                      autoComplete="current-password"
                      placeholder="••••••••"
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
                  {form.formState.errors.password && (
                    <p className="text-sm text-destructive">
                      {form.formState.errors.password.message}
                    </p>
                  )}
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col  justify-center p-4 border-t border-border [.border-t]:pt-4 gap-3  ">
              <Button
                type="submit"
                disabled={loading}
                className="w-full cursor-pointer"
              >
                {loading ? "Logging in..." : "Login"}
              </Button>

              <p className="text-sm text-gray-500">
                Do not have an account?{" "}
                <a
                  href="/auth/signup"
                  className="text-primary hover:text-primary/80 font-medium"
                >
                  Sign up
                </a>
              </p>
            </CardFooter>
          </form>
        </MagicCard>
      </Card>
    </div>
  );
};

export default LoginPage;
