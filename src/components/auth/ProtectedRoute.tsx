"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface ProtectedRouteProps {
  children: React.ReactNode;
  role: "ROLE_ADMIN" | "ROLE_USER";
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, role }) => {
  const route = useRouter();
  const [authorized, setAuthorized] = useState<boolean>(false);
  const [mount, setMount] = useState<boolean>(false);

  useEffect(() => setMount(true), []);

  useEffect(() => {
    if (!mount) return;
    const token = localStorage.getItem("token");
    console.log("protectedRoute", token);

    const userRole = localStorage.getItem("role");
   console.log("protected",userRole);
   
    if (!token || userRole !== role) {
        console.log("token",token);
         console.log(" role",role);
        
      route.replace("/");
      console.log("work this 1");
      
    } else {
      setAuthorized(true);
      console.log("work this 2");
      
    }
  }, [mount, route, role]);

  if (!authorized) return <div>Loading...</div>;

  return <div>{children}</div>;
};

export default ProtectedRoute;
