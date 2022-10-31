import { useState } from "react";

export default function useToken() {
  // const getToken = (): string | null => {
  //   return sessionStorage.getItem('token');
  // }
  const [token, setToken] = useState('');

  const saveToken = (userToken: string) => {
    sessionStorage.setItem('token', userToken);
    setToken(userToken);
  };

  return { token, setToken: saveToken }
}
