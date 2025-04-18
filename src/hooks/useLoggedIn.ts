import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { publicPaths } from "@constants";

export const useLoggedIn = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null)

  useEffect(() => {
    const token = localStorage.getItem('token');
    
    if(publicPaths.includes(location.pathname)) {
      return
    }

    if (!token) {
      setIsAuthorized(false)
      navigate('/login');
    } else {
      setIsAuthorized(true)
    }
  }, [navigate, location.pathname])
  return isAuthorized;
}