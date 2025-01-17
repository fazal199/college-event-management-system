import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { BarChart, Calendar, Settings, Users } from "lucide-react"
import { Link } from "react-router-dom"

const HomePage = () => {



  return (
    <>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-6">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                  Simplify Your Event Management
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                  Eventify helps you plan, organize, and execute successful events with ease. From small gatherings to
                  large conferences, we've got you covered.
                </p>
              </div>
              <div className="space-x-4">
                <Button>Get Started</Button>
                <Button variant="outline">Learn More</Button>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">Key Features</h2>
            <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-4">
              <div className="flex flex-col items-center space-y-2 border-gray-800 p-4 rounded-lg">
                <Calendar className="h-8 w-8 mb-2" />
                <h3 className="text-xl font-bold">Event Planning</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
                  Easily create and manage events with our intuitive planning tools.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 border-gray-800 p-4 rounded-lg">
                <Users className="h-8 w-8 mb-2" />
                <h3 className="text-xl font-bold">Attendee Management</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
                  Streamline registration and track attendees effortlessly.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 border-gray-800 p-4 rounded-lg">
                <BarChart className="h-8 w-8 mb-2" />
                <h3 className="text-xl font-bold">Analytics</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
                  Gain valuable insights with comprehensive event analytics.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 border-gray-800 p-4 rounded-lg">
                <Settings className="h-8 w-8 mb-2" />
                <h3 className="text-xl font-bold">Customization</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
                  Tailor the platform to fit your specific event needs.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-6">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Ready to Elevate Your Events?</h2>
                <p className="mx-auto max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                  Join thousands of successful event organizers. Start your journey with EventPro today.
                </p>
              </div>
              <div className="w-full max-w-sm space-y-2">
                <form className="flex space-x-2">
                  <Input className="max-w-lg flex-1" placeholder="Enter your email" type="email" />
                  <Button type="submit">Sign Up</Button>
                </form>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  By signing up, you agree to our{" "}
                  <Link className="underline underline-offset-2" to={"/auth/signup"}>
                    Terms & Conditions
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}

export default HomePage
