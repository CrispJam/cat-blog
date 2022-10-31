import React from "react";

// taken from: https://tailwindui.com/components/application-ui/forms/sign-in-forms

export default function Login() {
  return (
    <div className="bg-base-200 flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="m-5 bg-base-100 w-full max-w-md space-y-8 shadow-xl">
        <div>
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
            Sign in to your account
          </h2>
        </div>
        <form className="mt-8 space-y-6" action="#" method="POST">
          <div className="-space-y-px rounded-md shadow-sm">
            <div>
              <input
                type="text"
                placeholder="Username"
                className="input input-primary w-full my-2"
              />
              <input
                type="password"
                placeholder="Password"
                className="input input-primary w-full my-2"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="btn btn-primary text-xl w-full"
            >
              Sign in
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}