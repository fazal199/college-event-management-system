import { Calendar, Ticket, Users, Shield, Search, MapPin, Clock, ArrowRight, Sparkles, TrendingUp, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';

function HomePage() {
  return (
    <div className="min-h-screen bg-[hsl(var(--background))]">
     

      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[hsl(var(--primary))]/5 via-transparent to-[hsl(var(--primary))]/10"></div>
        <div className="max-w-7xl mx-auto relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-[hsl(var(--primary))]/10 rounded-full">
                <Sparkles className="w-4 h-4 text-[hsl(var(--primary))]" />
                <span className="text-sm font-medium text-[hsl(var(--primary))]">Your Gateway to Unforgettable Experiences</span>
              </div>
              <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
                Discover Events That{' '}
                <span className="text-[hsl(var(--primary))]">Inspire</span>
              </h1>
              <p className="text-lg text-[hsl(var(--muted-foreground))] leading-relaxed">
                From concerts to conferences, workshops to festivals. Find, book, and attend amazing events near you. Join thousands of attendees creating memorable experiences.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/events">
                  <button className="px-8 py-4 bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))] rounded-xl font-medium hover:opacity-90 transition-all hover:scale-105 shadow-lg shadow-[hsl(var(--primary))]/20 flex items-center justify-center gap-2">
                    Browse Events
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </Link>
                <Link to={"/auth/signup"}>
                  <button className="px-8 py-4 border-2 border-[hsl(var(--border))] rounded-xl font-medium hover:bg-[hsl(var(--accent))] transition-colors flex items-center justify-center gap-2">
                    <Users className="w-5 h-5" />
                    Become an Organizer
                  </button>
                </Link>
              </div>
              <div className="flex items-center gap-8 pt-4">
                <div>
                  <div className="text-3xl font-bold text-[hsl(var(--primary))]">10K+</div>
                  <div className="text-sm text-[hsl(var(--muted-foreground))]">Active Events</div>
                </div>
                <div className="h-12 w-px bg-[hsl(var(--border))]"></div>
                <div>
                  <div className="text-3xl font-bold text-[hsl(var(--primary))]">500K+</div>
                  <div className="text-sm text-[hsl(var(--muted-foreground))]">Happy Attendees</div>
                </div>
                <div className="h-12 w-px bg-[hsl(var(--border))]"></div>
                <div>
                  <div className="text-3xl font-bold text-[hsl(var(--primary))]">2K+</div>
                  <div className="text-sm text-[hsl(var(--muted-foreground))]">Organizers</div>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-[hsl(var(--primary))] to-pink-500 rounded-3xl opacity-20 blur-3xl"></div>
              <div className="relative bg-white rounded-2xl shadow-2xl p-6 space-y-4">
               
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { icon: Calendar, label: 'Concerts', count: '1,234' },
                    { icon: Users, label: 'Conferences', count: '856' },
                    { icon: Sparkles, label: 'Festivals', count: '423' },
                    { icon: TrendingUp, label: 'Workshops', count: '678' }
                  ].map((category, index) => (
                    <div
                      key={index}
                      className="p-4 bg-[hsl(var(--accent))] rounded-xl hover:shadow-lg transition-all hover:scale-105 cursor-pointer"
                    >
                      <category.icon className="w-8 h-8 text-[hsl(var(--primary))] mb-2" />
                      <div className="font-semibold">{category.label}</div>
                      <div className="text-sm text-[hsl(var(--muted-foreground))]">{category.count} events</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="how-it-works" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">How It Works?</h2>
            <p className="text-lg text-[hsl(var(--muted-foreground))]">
              Get started in three simple steps
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: '01',
                icon: Search,
                title: 'Discover Events',
                description: 'Browse through thousands of events across various categories. Filter by location, date, price, and interests to find your perfect match.'
              },
              {
                step: '02',
                icon: Ticket,
                title: 'Book Your Tickets',
                description: 'Secure your spot with our quick and easy booking process. Choose from free or paid events with instant confirmation and e-tickets.'
              },
              {
                step: '03',
                icon: Sparkles,
                title: 'Enjoy the Experience',
                description: 'Show your e-ticket at the venue and immerse yourself in amazing experiences. Rate and review events to help others discover great ones.'
              }
            ].map((item, index) => (
              <div key={index} className="relative">
                <div className="text-center space-y-6">
                  <div className="relative inline-block">
                    <div className="absolute inset-0 bg-[hsl(var(--primary))]/20 rounded-full blur-xl"></div>
                    <div className="relative w-20 h-20 mx-auto bg-gradient-to-br from-[hsl(var(--primary))] to-pink-500 rounded-2xl flex items-center justify-center shadow-lg">
                      <item.icon className="w-10 h-10 text-white" />
                    </div>
                  </div>
                  <div className="absolute -top-6 right-1/2 translate-x-1/2 text-7xl font-bold text-[hsl(var(--primary))]/10">
                    {item.step}
                  </div>
                  <h3 className="text-2xl font-bold relative z-10">{item.title}</h3>
                  <p className="text-[hsl(var(--muted-foreground))] leading-relaxed">
                    {item.description}
                  </p>
                </div>
                {index < 2 && (
                  <div className="hidden md:block absolute top-10 left-full w-full h-px bg-gradient-to-r from-[hsl(var(--primary))] to-transparent -z-10"></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="organizers" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-[hsl(var(--primary))]/5 to-pink-500/5">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <h2 className="text-4xl font-bold">
                Host Your Next <span className="text-[hsl(var(--primary))]">Amazing Event</span>
              </h2>
              <p className="text-lg text-[hsl(var(--muted-foreground))] leading-relaxed">
                Join our community of successful event organizers. Whether you're planning a small workshop or a large conference, we provide all the tools you need to create, manage, and promote your events.
              </p>
              <div className="space-y-4">
                {[
                  'Easy event creation and management dashboard',
                  'Flexible ticketing options - free, paid, or tiered',
                  'Built-in payment processing and analytics',
                  'Real-time attendee tracking and check-in',
                  'Dedicated admin support and insights'
                ].map((feature, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-[hsl(var(--primary))] flex-shrink-0 mt-0.5" />
                    <span className="text-[hsl(var(--muted-foreground))]">{feature}</span>
                  </div>
                ))}
              </div>
              <button className="px-8 py-4 bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))] rounded-xl font-medium hover:opacity-90 transition-all hover:scale-105 shadow-lg shadow-[hsl(var(--primary))]/20 flex items-center gap-2">
                Register as Organizer
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-[hsl(var(--primary))] to-pink-500 rounded-3xl opacity-20 blur-3xl"></div>
              <div className="relative bg-white rounded-2xl shadow-2xl p-8 space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-[hsl(var(--primary))]/10 rounded-xl flex items-center justify-center">
                    <Users className="w-6 h-6 text-[hsl(var(--primary))]" />
                  </div>
                  <div>
                    <div className="font-bold">2,000+</div>
                    <div className="text-sm text-[hsl(var(--muted-foreground))]">Active Organizers</div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-[hsl(var(--primary))]/10 rounded-xl flex items-center justify-center">
                    <TrendingUp className="w-6 h-6 text-[hsl(var(--primary))]" />
                  </div>
                  <div>
                    <div className="font-bold">98% Success Rate</div>
                    <div className="text-sm text-[hsl(var(--muted-foreground))]">Event Completion</div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-[hsl(var(--primary))]/10 rounded-xl flex items-center justify-center">
                    <Shield className="w-6 h-6 text-[hsl(var(--primary))]" />
                  </div>
                  <div>
                    <div className="font-bold">Secure Platform</div>
                    <div className="text-sm text-[hsl(var(--muted-foreground))]">Trusted by Thousands</div>
                  </div>
                </div>
                <div className="pt-4 border-t border-[hsl(var(--border))]">
                  <div className="text-sm text-[hsl(var(--muted-foreground))] mb-3">Recent Success Story</div>
                  <div className="p-4 bg-[hsl(var(--accent))] rounded-xl">
                    <p className="text-sm italic mb-2">
                      "EventHub transformed how we manage our tech conferences. The platform is intuitive and our attendees love it!"
                    </p>
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-[hsl(var(--primary))] rounded-full"></div>
                      <div>
                        <div className="text-sm font-semibold">Sarah Johnson</div>
                        <div className="text-xs text-[hsl(var(--muted-foreground))]">TechEvents Inc.</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-[hsl(var(--secondary))] py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Ticket className="w-8 h-8 text-[hsl(var(--primary))]" />
                <span className="text-xl font-bold">EventHub</span>
              </div>
              <p className="text-sm text-[hsl(var(--muted-foreground))]">
                Your gateway to unforgettable experiences. Discover, book, and attend amazing events.
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-4">For Attendees</h4>
              <ul className="space-y-2 text-sm text-[hsl(var(--muted-foreground))]">
                <li><a href="#" className="hover:text-[hsl(var(--primary))] transition-colors">Browse Events</a></li>
                <li><a href="#" className="hover:text-[hsl(var(--primary))] transition-colors">My Tickets</a></li>
                <li><a href="#" className="hover:text-[hsl(var(--primary))] transition-colors">Categories</a></li>
                <li><a href="#" className="hover:text-[hsl(var(--primary))] transition-colors">Help Center</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">For Organizers</h4>
              <ul className="space-y-2 text-sm text-[hsl(var(--muted-foreground))]">
                <li><a href="#" className="hover:text-[hsl(var(--primary))] transition-colors">Create Event</a></li>
                <li><a href="#" className="hover:text-[hsl(var(--primary))] transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-[hsl(var(--primary))] transition-colors">Resources</a></li>
                <li><a href="#" className="hover:text-[hsl(var(--primary))] transition-colors">Success Stories</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-[hsl(var(--muted-foreground))]">
                <li><a href="#" className="hover:text-[hsl(var(--primary))] transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-[hsl(var(--primary))] transition-colors">Contact</a></li>
                <li><a href="#" className="hover:text-[hsl(var(--primary))] transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-[hsl(var(--primary))] transition-colors">Terms of Service</a></li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-[hsl(var(--border))] flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-[hsl(var(--muted-foreground))]">
              © 2026 EventHub. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <a href="#" className="text-sm text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--primary))] transition-colors">
                Twitter
              </a>
              <a href="#" className="text-sm text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--primary))] transition-colors">
                Facebook
              </a>
              <a href="#" className="text-sm text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--primary))] transition-colors">
                Instagram
              </a>
              <a href="#" className="text-sm text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--primary))] transition-colors">
                LinkedIn
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default HomePage;
