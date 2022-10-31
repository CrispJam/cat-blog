import React, { useContext } from "react";
import Link from "next/link";
import { TokenContext } from "./Layout";

export default function Navbar() {
  const { token, logout } = useContext(TokenContext);

  const priviligedLinks = (
    <>
      <div>
        <Link href="/articles" className="btn btn-ghost normal-case text-l">My Articles</Link>
      </div>
      <div>
        <Link href="/articles/create" className="btn btn-ghost normal-case text-l">Create Article</Link>
      </div>
      <div>
        <button
          className="btn btn-ghost normal-case text-l"
          onClick={() => logout()}
        >
          Log out
        </button>
      </div>
    </>
  )

  const loginLink = (
    <div className="flex-none">
      <Link href="/login" className="btn btn-ghost normal-case text-l">Log in</Link>
    </div>
  )

  return (
    <div className="navbar bg-base-300">
      <div className="flex-none">
        <Link href="/articles" className="btn btn-ghost normal-case text-l">Recent Articles</Link>
      </div>
      <div className="flex-1">
        <Link href="/" className="btn btn-ghost normal-case text-l">About</Link>
      </div>
      { token ? priviligedLinks : loginLink }
    </div>
  )
}
