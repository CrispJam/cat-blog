import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";

interface Props {
  children: React.ReactNode
}

export const TokenContext = React.createContext({
  token: '',
  setToken: (_: string) => {},
  logout: () => {},
});

export default function Layout({ children }: Props) {
  const [token, setToken] = useState('');
  const saveToken = (userToken: string) => {
    setToken(userToken);
    if (sessionStorage)
      sessionStorage.setItem('token', userToken);
  }
  const logout = () => {
    setToken('');
    if (sessionStorage)
      sessionStorage.clear();
  }

  const value = { token, setToken: saveToken, logout };

  useEffect(() => {
    const userToken = sessionStorage.getItem('token');
    if (userToken)
      setToken(userToken);
  }, [])

  return (
    <div>
      <TokenContext.Provider value={value}>
        <Navbar logout={logout}/>
        {children}
      </TokenContext.Provider>
    </div>
  )
}
