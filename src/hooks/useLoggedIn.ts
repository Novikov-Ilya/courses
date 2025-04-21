import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export const useLoggedIn = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null);
  const [userName, setUserName] = useState<string | null>(null);

  useEffect(() => {
    const checkAuthorization = () => {
      const token = localStorage.getItem('token');
      const userNameFromLS = localStorage.getItem('userName');
  
      if (!token) {
        setIsAuthorized(false);
        setUserName(null)
      } else {
        setIsAuthorized(true);
        setUserName(userNameFromLS);
      }
    }

    checkAuthorization();

    const handleStorageChange = () => {
      checkAuthorization();
    }

    window.addEventListener('storage', () => {
      handleStorageChange();
    })
    
  }, [navigate, location.pathname]);
  return {
    isAuthorized,
    userName
  };
}