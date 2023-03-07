import { useEffect } from "react";
import { useAuth } from "@/context/auth/hooks";
import Router from "next/router";

const Home = () => {
  const {
    authState: { isAuthenticated },
  } = useAuth();

  useEffect(() => {
    if (!isAuthenticated) void Router.push("/auth/login");
    else void Router.push("/dashboard");
  }, [isAuthenticated]);

  return null;
};

export default Home;
