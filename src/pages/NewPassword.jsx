// NewPassword.jsx
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import logo from "@/assets/images/logo.png";
import dark_logo from "@/assets/images/dark-logo.png";
import { Link, Navigate, useNavigate, useSearchParams } from "react-router-dom";
import { RouteIndex, RouteSignIn } from "@/helpers/RouteName";
import { getEvn } from "@/helpers/getEnv";

const NewPassword = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const email = searchParams.get("email");

  const formSchema = z
    .object({
      password: z.string().min(6, "Password must be at least 6 characters"),
      confirmPassword: z.string(),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: "Passwords do not match",
      path: ["confirmPassword"],
    });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: { password: "", confirmPassword: "" },
  });

  const onSubmit = async (values) => {
    setLoading(true);
    try {
      const res = await fetch(
        `${getEvn("VITE_API_BASE_URL")}/auth/resetPassword`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, newPassword: values.password }),
        }
      );
      if (!res.ok) {
        throw new Error("Failed to set new password");
      }
      navigate(RouteSignIn);
      const data = await res.json();
      if (data.success) {
        showToast("success", "Password reset successfully");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>New Password</title>
      </Helmet>
      <div className="flex justify-center items-center h-screen w-screen">
        <Card className="w-[400px] p-5">
          <div className="flex justify-center items-center mb-2">
            <Link to={RouteIndex}>
              <img src={dark_logo} alt="logo" className="hidden dark:block" />
              <img src={logo} alt="logo" className="block dark:hidden" />
            </Link>
          </div>
          <h1 className="text-2xl font-bold text-center mb-5">
            Set New Password
          </h1>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>New Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Enter new password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Confirm your password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full mt-5">
                {loading ? "Resetting..." : "Reset Password"}
              </Button>
            </form>
          </Form>
        </Card>
      </div>
    </>
  );
};

export default NewPassword;
