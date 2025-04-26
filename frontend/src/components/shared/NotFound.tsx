import React from 'react'
import { Link } from 'react-router-dom'

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-background text-foreground text-center">
    <h1 className="text-6xl font-bold">404</h1>
    <h2 className="text-2xl font-semibold mt-2">Page Not Found</h2>
    <p className="text-muted-foreground mt-4">
      The page you are looking for does not exist or has been moved.
    </p>
    <Link
      to="/"
      className="mt-6 px-6 py-2 bg-primary text-primary-foreground rounded-md hover:opacity-80 transition"
    >
      Go to Home
    </Link>
  </div>
  )
}

export default NotFound
