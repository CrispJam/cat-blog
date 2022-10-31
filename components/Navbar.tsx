import React from "react";
import Link from "next/link";

export default function Navbar() {
  return (
    <div className="navbar bg-base-300">
      <div className="flex-none">
        <Link href="/articles" className="btn btn-ghost normal-case text-xl">Recent Articles</Link>
      </div>
      <div className="flex-1">
        <Link href="/" className="btn btn-ghost normal-case text-xl">About</Link>
      </div>
      <div className="flex-none">
        <Link href="/login" className="btn btn-ghost normal-case text-xl">Log in</Link>
      </div>
    </div>
  )
}
