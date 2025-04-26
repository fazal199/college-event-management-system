import React from 'react'
import { Link } from 'react-router-dom'

const Error500 = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-background text-foreground text-center">
      <h1 className="text-6xl text-red-600 font-bold">500</h1>
      <h2 className="text-2xl font-semibold mt-2">Something Went Wrong!</h2>
      <p className="text-muted-foreground mt-4">
       Looks like, something went wrong! Plzz try later.
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

export default Error500
