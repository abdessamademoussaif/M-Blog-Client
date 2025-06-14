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
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { RouteIndex } from "@/helpers/RouteName";
import { RouteNewPassword } from "@/helpers/RouteName";
import { getEvn } from "@/helpers/getEnv";

const ResetCode = () => {
  const [loading, setLoading] = useState(false);
  const [sendAgainLoading, setSendAgainLoading] = useState(false);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [email , setEmail] = useState(searchParams.get("email")); 
 
  const formSchema = z.object({
    code: z.string().min(4, "Reset code required"),
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: { code: "" },
  });

  const onSubmit = async(values) => {
    setLoading(true);
    try{
        const res = await fetch(`${getEvn("VITE_API_BASE_URL")}/auth/verifyResetCode`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, resetCode: values.code }),
        });
        if(!res.ok){
            throw new Error('something not ok');
        }
         navigate(`${RouteNewPassword}?email=${encodeURIComponent(email)}`);
    }catch(error){
        console.log('error:', error);
    }finally{
        setLoading(false);
    }
    setTimeout(() => {
      setLoading(false);
      console.log("Reset code submitted:", values);
     
    }, 1000);
  };

  const sendAgain = async () => {
      setSendAgainLoading(true);
      try {
        const res = await fetch(`${getEvn("VITE_API_BASE_URL")}/auth/forgotPassword`, {
          method: "post",
          headers: { "Content-type": "application/json" },
          body: JSON.stringify({ email }),
        });
        if(!res.ok){
          throw new Error('something not ok')
        }
      } catch (error) {
      } finally {
           setSendAgainLoading(false);
      }
    };
  

  return (
    <>
      <Helmet>
        <title>Reset Code</title>
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
            Enter Reset Code
          </h1>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="code"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Reset Code</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter the code sent to your email"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="text-sm">
                <p className="ml-4 mt-3">
                  we send to your email a reset code:{" "}
                  <Link className="text-blue-600 hover:underline" onClick={sendAgain}>
                    {sendAgainLoading ? "Sending..." : "send again"}
                  </Link>
                </p>
              </div>
              <Button type="submit" className="w-full mt-5">
                {loading ? "Verifying..." : "Verify Code"}
              </Button>
            </form>
          </Form>
        </Card>
      </div>
    </>
  );
};

export default ResetCode;
