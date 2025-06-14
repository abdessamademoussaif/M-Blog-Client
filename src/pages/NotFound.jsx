import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import dark_logo from "@/assets/images/dark-logo.png";
import logo from "@/assets/images/logo.png";
import {
  RouteIndex,
  RouteSignUp,
  RouteForgetPassword,
} from "@/helpers/RouteName";
import { Helmet } from "react-helmet-async";
import { useState } from "react";
import Topbar from "@/components/Topbar";

const NotFound = () => {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");

  const handleSearch = () => {
    navigate(RouteIndex);
  };

  return (
    <>
    
      <Helmet>
        <title>404 - Page Not Found</title>
        <meta name="description" content="404 Not Found" />
      </Helmet>
      <div className="flex justify-center items-center h-screen w-screen bg-background">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="w-[400px] p-6 text-center space-y-6">
            <Link to={RouteIndex} className="flex justify-center">
              <img
                src={dark_logo}
                alt="logo"
                className="h-10 hidden dark:block"
              />
              <img
                src={logo}
                alt="logo"
                className="h-10 block dark:hidden"
              />
            </Link>

            <h1 className="text-4xl font-bold text-red-600">404</h1>
            <p className="text-muted-foreground text-lg">
              Oops! We couldn’t find that page.
            </p>

            <div>
              <Input
                placeholder="Search for something..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="mb-3"
              />
              <Button onClick={handleSearch} className="w-full">
                Search
              </Button>
            </div>

            <div className="text-sm space-y-2">
              <Link to={RouteIndex} className="block text-blue-500 hover:underline">
                ← Back to Home
              </Link>
              <Link to={RouteSignUp} className="block text-blue-500 hover:underline">
                Create an Account
              </Link>
              <Link to={RouteForgetPassword} className="block text-blue-500 hover:underline">
                Forgot Password?
              </Link>
            </div>
          </Card>
        </motion.div>
      </div>
    </>
  );
};

export default NotFound;
