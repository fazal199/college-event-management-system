import { Calendar, Users, Shield, Zap, Award, Star, ChevronRight, MapPin, Mail, Phone } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Link } from "react-router-dom"

const AboutPage = () => {

    const storySteps = [
        {
          title: "The Problem We Saw",
          description: "Event registration was fragmented, complex, and frustrating for both organizers and attendees.",
          icon: <Zap className="h-6 w-6 text-primary" />,
        },
        {
          title: "The Solution We Built",
          description: "A unified platform that simplifies every aspect of event management from creation to attendance.",
          icon: <Award className="h-6 w-6 text-primary" />,
        },
        {
          title: "Where We Are Now",
          description: "Connecting thousands of events with attendees while continuously improving our platform.",
          icon: <ChevronRight className="h-6 w-6 text-primary" />,
        },
      ]
      
      const teamMembers = [
        {
          name: "Alex Johnson",
          role: "Founder & CEO",
          bio: "Passionate about creating meaningful connections through events.",
          avatar: "/placeholder.svg?height=96&width=96",
        },
        {
          name: "Samantha Lee",
          role: "CTO",
          bio: "Tech enthusiast focused on building intuitive user experiences.",
          avatar: "/placeholder.svg?height=96&width=96",
        },
        {
          name: "Marcus Chen",
          role: "Design Lead",
          bio: "Believes in the power of clean, purposeful design.",
          avatar: "/placeholder.svg?height=96&width=96",
        },
        {
          name: "Priya Patel",
          role: "Marketing Director",
          bio: "Dedicated to helping events reach their perfect audience.",
          avatar: "/placeholder.svg?height=96&width=96",
        },
      ]
      
      const features = [
        {
          title: "Easy Event Registration",
          description: "One-click sign-ups and seamless registration process for attendees.",
          icon: <Users className="h-6 w-6 text-primary" />,
        },
        {
          title: "Organizer-Friendly Tools",
          description: "Comprehensive dashboard to manage events, track attendance, and measure success.",
          icon: <Calendar className="h-6 w-6 text-primary" />,
        },
        {
          title: "Secure Payments",
          description: "Powered by Razorpay with end-to-end encryption for safe transactions.",
          icon: <Shield className="h-6 w-6 text-primary" />,
        },
      ]
      
      const testimonials = [
        {
          name: "Sarah Johnson",
          role: "Event Organizer",
          rating: 5,
          avatar: "/placeholder.svg?height=40&width=40",
          content:
            "Eventify transformed how I manage my conferences. The platform is intuitive and the analytics help me understand my audience better.",
        },
        {
          name: "Michael Chen",
          role: "Regular Attendee",
          rating: 5,
          avatar: "/placeholder.svg?height=40&width=40",
          content:
            "I've discovered amazing events through this platform. The registration process is seamless and I love getting reminders before events.",
        },
        {
          name: "Emily Rodriguez",
          role: "Corporate Event Manager",
          rating: 4,
          avatar: "/placeholder.svg?height=40&width=40",
          content:
            "The platform has helped us streamline our corporate events. The team is responsive and always ready to help with any questions.",
        },
      ]
      

  return (
    <div className="flex min-h-screen flex-col">
    
      <div className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-40 bg-muted/30">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                    Who We Are & What We Do
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    Empowering event organizers and attendees by simplifying event registration and management.
                  </p>
                </div>
                <div className=" pt-4">
                 <Link className="block" to="/events">
                      <Button  className="w-9/12  block" size="lg">
                        Browse Events
                      </Button>
                 </Link>
                  
                </div>
              </div>
              <div className="relative h-[400px] overflow-hidden rounded-xl bg-muted">
                <div className="absolute inset-0 bg-primary/5 flex items-center justify-center">
                  <Users className="h-32 w-32 text-primary/30" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Our Mission Section */}
        <section className="w-full py-12 md:py-24">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center text-center space-y-4 max-w-3xl mx-auto">
              <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary">Our Mission</div>
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                We aim to revolutionize event management
              </h2>
              <p className="text-muted-foreground md:text-xl max-w-[800px]">
                By providing a seamless, user-friendly platform where organizers can create, manage, and promote events
                while attendees can easily discover and register for them.
              </p>
              <div className="w-16 h-1 bg-primary/30 rounded-full mt-6"></div>
            </div>
          </div>
        </section>

        {/* Our Story Section */}
        <section className="w-full py-12 md:py-24 bg-muted/30">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center text-center space-y-4 mb-10">
              <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary">Our Story</div>
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">The Journey of Our Platform</h2>
              <p className="text-muted-foreground md:text-lg max-w-[700px]">
                From identifying a problem to building a comprehensive solution
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-3">
              {storySteps.map((step, index) => (
                <div key={index} className="relative">
                 

                  <div className="relative z-10 flex flex-col items-center text-center">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 mb-4">
                      {step.icon}
                    </div>
                    <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                    <p className="text-muted-foreground">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Meet the Team Section */}
        <section className="w-full py-12 md:py-24">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center text-center space-y-4 mb-10">
              <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary">Our Team</div>
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Meet the Minds Behind Eventify</h2>
              <p className="text-muted-foreground md:text-lg max-w-[700px]">
                A passionate team dedicated to transforming the event management landscape
              </p>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {teamMembers.map((member, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center text-center p-6 rounded-lg hover:bg-muted/50 transition-colors"
                >
                
                  <h3 className="text-xl font-bold">{member.name}</h3>
                  <p className="text-sm text-primary mb-2">{member.role}</p>
                  <p className="text-sm text-muted-foreground">{member.bio}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Why Choose Us Section */}
        <section className="w-full py-12 md:py-24 bg-muted/30">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center text-center space-y-4 mb-10">
              <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary">Why Choose Us</div>
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">What Sets Us Apart</h2>
              <p className="text-muted-foreground md:text-lg max-w-[700px]">
                Key advantages that make our platform the preferred choice
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-3">
              {features.map((feature, index) => (
                <Card key={index} className="bg-background border-none shadow-sm">
                  <CardContent className="p-6">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 mb-4">
                      {feature.icon}
                    </div>
                    <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="w-full py-12 md:py-24">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center text-center space-y-4 mb-10">
              <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary">Testimonials</div>
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">What Our Users Say</h2>
              <p className="text-muted-foreground md:text-lg max-w-[700px]">
                Hear from people who have transformed their event experience with us
              </p>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {testimonials.map((testimonial, index) => (
                <Card key={index} className="bg-background border-none shadow-sm">
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-4 mb-4">
                      <div>
                        <p className="bg-primary/10 text-primary">
                          {testimonial.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </p>
                      </div>
                      <div>
                        <h3 className="font-semibold">{testimonial.name}</h3>
                        <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                      </div>
                    </div>
                    <div className="flex mb-2">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${i < testimonial.rating ? "text-primary" : "text-muted"}`}
                          fill={i < testimonial.rating ? "currentColor" : "none"}
                        />
                      ))}
                    </div>
                    <p className="text-muted-foreground">{testimonial.content}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

     

        {/* Contact Information */}
        <section className="w-full py-12 md:py-24">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
              <div className="space-y-4">
                <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary">Get In Touch</div>
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Contact Us</h2>
                <p className="text-muted-foreground md:text-lg">
                  Have questions or want to learn more about Eventify? We'd love to hear from you!
                </p>
                <div className="space-y-2 pt-4">
                  <div className="flex items-center">
                    <MapPin className="h-5 w-5 mr-2 text-primary" />
                    <span>123 Event Street, San Francisco, CA 94103</span>
                  </div>
                  <div className="flex items-center">
                    <Mail className="h-5 w-5 mr-2 text-primary" />
                    <span>contact@Eventify.com</span>
                  </div>
                  <div className="flex items-center">
                    <Phone className="h-5 w-5 mr-2 text-primary" />
                    <span>(123) 456-7890</span>
                  </div>
                </div>
              </div>
              <div className="relative h-[300px] overflow-hidden rounded-xl bg-muted">
                <div className="absolute inset-0 bg-primary/5 flex items-center justify-center">
                  <Mail className="h-24 w-24 text-primary/30" />
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

    
    </div>
  )
}



export default AboutPage