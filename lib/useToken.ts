import { useState, useEffect } from "react";

export default function useToken() {
  const [token, setToken] = useState('');

  useEffect(() => {
    const userToken = sessionStorage.getItem('token');
    if (userToken)
      setToken(userToken);
  }, []);
  
  const saveToken = (userToken: string) => {
    sessionStorage.setItem('token', userToken);
    setToken(userToken);
  };

  return { token, setToken: saveToken }
}
