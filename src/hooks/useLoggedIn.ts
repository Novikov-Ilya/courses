import { useEffect, useState } from "react";

export const useLoggedIn = () => {
  const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null);
  const [userName, setUserName] = useState<string | null>(null);

  useEffect(() => {
    const checkAuthorization = () => {
      const token = localStorage.getItem('token');
      const userNameFromLS = localStorage.getItem('userName');
  
      setIsAuthorized(Boolean(token));
      setUserName(userNameFromLS ?? null);
    }

    checkAuthorization();

    window.addEventListener('storage', checkAuthorization);

    return () => {
      window.removeEventListener('storage', checkAuthorization)
    }
    
  }, []);

  return {
    isAuthorized,
    userName
  };
}