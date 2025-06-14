import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Helmet } from "react-helmet-async";
import { useState , } from "react";
import logo from "@/assets/images/logo.png";
import dark_logo from "@/assets/images/dark-logo.png";
import { Link, useNavigate , useSearchParams } from "react-router-dom";
import { RouteIndex } from "@/helpers/RouteName";
import { RouteResetCode } from "@/helpers/RouteName";
import { getEvn } from "@/helpers/getEnv";


const ForgetPassword = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const formSchema = z.object({
    email: z.string().email("Invalid email address"),
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: { email: "" },
  });

  const onSubmit = async (values) => {
    setLoading(true);
    try {
      const res = await fetch(`${getEvn("VITE_API_BASE_URL")}/auth/forgotPassword`, {
        method: "post",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(values),
      });
      if(!res.ok){
        throw new Error('something not ok')
      }
      navigate(`${RouteResetCode}?email=${encodeURIComponent(values.email)}`);
    } catch (error) {
    } finally {
         setLoading(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Forgot Password</title>
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
            Forgot Password
          </h1>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full mt-5">
                {loading ? "Sending..." : "Send Reset Code"}
              </Button>
            </form>
          </Form>
        </Card>
      </div>
    </>
  );
};

export default ForgetPassword;
