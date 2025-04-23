import { useEffect, useState } from "react";

export const useLoggedIn = () => {
  const [isAuthorized, setIsAuthorized] = useState<boolean>(() => 
    Boolean(localStorage.getItem('token'))
  );
  const [userName, setUserName] = useState<string | null>(() => 
    localStorage.getItem('userName') ?? null
  );

  useEffect(() => {
    const checkAuthorization = () => {
      const token = localStorage.getItem('token');
      const userNameFromLS = localStorage.getItem('userName');
  
      setIsAuthorized(Boolean(token));
      setUserName(userNameFromLS ?? null);
    }

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