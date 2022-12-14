import { useRouter } from "next/router";
import React, { useContext } from "react";
import { useState } from "react";
import { login } from "../lib/api";
import { TokenContext } from '../components/Layout';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { setToken } = useContext(TokenContext);
  const router = useRouter();
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const credentials = { username, password };
    try {
      const data = await login(credentials);
      setToken(data.access_token);
      router.push('/articles');
    } catch (error) {
      console.log(error);
    }
  }
  
  // taken from: https://tailwindui.com/components/application-ui/forms/sign-in-forms
  return (
    <div className="bg-base-100 flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="m-5 bg-base-100 w-full max-w-md space-y-8 shadow-xl">
        <div>
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-content">
            Log in to your account
          </h2>
        </div>
        <form className="form-control mt-8" onSubmit={handleSubmit}>
          <div className="mx-10">
            <input
              type="text"
              onChange={e => setUsername(e.target.value)}
              placeholder="Username"
              className="input input-primary w-full my-2"
            />
            <input
              type="password"
              onChange={e => setPassword(e.target.value)}
              placeholder="Password"
              className="input input-primary w-full my-2"
            />
          </div>
          <div className="mx-10 mb-10 mt-5">
            <button
              type="submit"
              className="btn btn-primary text-xl w-full"
            >
              Log in
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}