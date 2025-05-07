
import { ArrowRight, Calendar, MapPin, Search, Users } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Link } from "react-router-dom"
import FetchUserData from "../NoUiComponents/FetchUserData"

export default function HomePage() {

  const steps = [
    {
      title: "Browse Events",
      description: "Find events that match your interest from our curated collection.",
      icon: <Search className="h-8 w-8 text-primary" />,
    },
    {
      title: "Register Easily",
      description: "Sign up with one click and secure your spot at the event.",
      icon: <Calendar className="h-8 w-8 text-primary" />,
    },
    {
      title: "Enjoy & Network",
      description: "Attend and connect with like-minded people at the event.",
      icon: <Users className="h-8 w-8 text-primary" />,
    },
  ]

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Marketing Director",
      avatar: "/placeholder.svg?height=40&width=40",
      content:
        "EventHub has completely transformed how our company discovers industry events. The platform is intuitive and the event recommendations are spot on!",
    },
    {
      name: "Michael Chen",
      role: "Software Engineer",
      avatar: "/placeholder.svg?height=40&width=40",
      content:
        "I've found some of the best tech meetups through this platform. The registration process is seamless and I love getting reminders before events.",
    },
    {
      name: "Emily Rodriguez",
      role: "Event Organizer",
      avatar: "/placeholder.svg?height=40&width=40",
      content:
        "As someone who organizes events, I can say that this platform has helped us reach the right audience. Our attendance has increased by 40% since we started listing here.",
    },
  ]


  return (
    <div className="flex min-h-screen flex-col">

      <FetchUserData />
      <section className="flex-1">
        {/* Hero Section */}
        <div className="w-full bg-muted py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container px-4 md:px-6 text-center">
            <div className="flex flex-col justify-center space-y-8">
              <div className="space-y-8">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                  Discover & Register for Exciting Events!
                </h1>
                <p className=" text-muted-foreground md:text-xl">
                  Find the best events near you. From tech meetups to music festivals, we have it all!
                </p>
              </div>
              <div className="flex justify-center sm:flex-row gap-2 sm:gap-4">
                <Link to={"/events"}>
                  <Button  className="w-full sm:w-auto" size="lg">
                    Browse Events
                  </Button>
                </Link>
               <Link to={"/about"} >
                  <Button variant={"outline"} className="w-full sm:w-auto" size="lg">
                    About
                  </Button>
               </Link>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="w-full py-12 md:py-24">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">How It Works</h2>
              <p className="max-w-[700px] text-muted-foreground md:text-xl">
                Three simple steps to discover, register and enjoy events
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-8 mt-12 md:grid-cols-3">
            {steps.map((step, index) => (
              <div key={index} className="flex flex-col items-center text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 mb-4">
                  {step.icon}
                </div>
                <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                <p className="text-muted-foreground">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="w-full py-12 md:py-24 bg-muted/50">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">What Our Users Say</h2>
              <p className="max-w-[700px] text-muted-foreground md:text-xl">
                Hear from people who have found amazing events through our platform
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-6 mt-8 md:grid-cols-2 lg:grid-cols-3">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="overflow-hidden">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-4">
                    <div>
                   
                      <p>{testimonial.name.charAt(0)}</p>
                    </div>
                    <div>
                      <h3 className="font-semibold">{testimonial.name}</h3>
                      <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                    </div>
                  </div>
                  <p className="mt-4 text-muted-foreground">{testimonial.content}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>




    </div>
  )
}





