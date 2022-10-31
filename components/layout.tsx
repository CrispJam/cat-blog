import React from "react";

export default function Layout({ children }) {
  return (
    <div>
      <h1 className="text-3xl font-bold underline">HEADER</h1>
      {children}
    </div>
  )
}
