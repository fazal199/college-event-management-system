import { Ticket, Users, Zap, Globe, Award, Target, Heart, Lightbulb, TrendingUp, ArrowRight, CheckCircle2, BarChart3 } from 'lucide-react';
import { Link } from 'react-router-dom';



export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[hsl(var(--background))]">
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[hsl(var(--primary))]/5 via-transparent to-[hsl(var(--primary))]/10"></div>
        <div className="max-w-7xl mx-auto relative">
          <div className="text-center space-y-8 max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-[hsl(var(--primary))]/10 rounded-full">
              <Heart className="w-4 h-4 text-[hsl(var(--primary))]" />
              <span className="text-sm font-medium text-[hsl(var(--primary))]">About EventHub</span>
            </div>
            <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
              Connecting People to <span className="text-[hsl(var(--primary))]">Extraordinary Moments</span>
            </h1>
            <p className="text-lg text-[hsl(var(--muted-foreground))] leading-relaxed">
              Since 2020, EventHub has been revolutionizing how people discover and organize events worldwide. We believe every moment shared is an opportunity for connection, growth, and unforgettable memories.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Link to={"/events"}>
                <button className="px-8 py-4 bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))] rounded-xl font-medium hover:opacity-90 transition-all hover:scale-105 shadow-lg shadow-[hsl(var(--primary))]/20 flex items-center justify-center gap-2">
                  Explore Events
                  <ArrowRight className="w-5 h-5" />
                </button>
              </Link>
             
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[hsl(var(--accent))]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Our Mission & Vision</h2>
            <p className="text-lg text-[hsl(var(--muted-foreground))]">
              Driven by passion to transform the way people experience events
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-12">
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all">
              <div className="w-16 h-16 bg-gradient-to-br from-[hsl(var(--primary))] to-pink-500 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
                <Target className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Our Mission</h3>
              <p className="text-[hsl(var(--muted-foreground))] leading-relaxed mb-4">
                To create a seamless, inclusive platform that empowers event organizers and enables attendees to discover, experience, and celebrate moments that matter.
              </p>
              <ul className="space-y-3">
                {[
                  'Making event discovery effortless for everyone',
                  'Empowering organizers with powerful tools',
                  'Building a trusted global community'
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-[hsl(var(--primary))] flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-[hsl(var(--muted-foreground))]">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all">
              <div className="w-16 h-16 bg-gradient-to-br from-[hsl(var(--primary))] to-pink-500 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
                <Lightbulb className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Our Vision</h3>
              <p className="text-[hsl(var(--muted-foreground))] leading-relaxed mb-4">
                To become the world's leading event marketplace where meaningful connections happen, communities thrive, and every event becomes a gateway to extraordinary experiences.
              </p>
              <ul className="space-y-3">
                {[
                  'Innovative technology for event management',
                  'Global reach with local relevance',
                  'Sustainable growth for all stakeholders'
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-[hsl(var(--primary))] flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-[hsl(var(--muted-foreground))]">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Why Choose EventHub?</h2>
            <p className="text-lg text-[hsl(var(--muted-foreground))]">
              What sets us apart from the rest
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Zap,
                title: 'Lightning Fast',
                description: 'Instant event discovery and booking with blazing-fast search and checkout experience designed for modern users.'
              },
              {
                icon: Globe,
                title: 'Global Reach',
                description: 'Access to millions of events worldwide in 50+ countries with multi-language and multi-currency support.'
              },
              {
                icon: Award,
                title: 'Industry Trust',
                description: 'Trusted by leading organizers and 500K+ attendees with secure payments and world-class customer support.'
              },
              {
                icon: Lightbulb,
                title: 'Smart Features',
                description: 'AI-powered event recommendations, personalized feeds, and intelligent filters tailored to your preferences.'
              },
              {
                icon: Heart,
                title: 'Community First',
                description: 'Vibrant community of event enthusiasts with ratings, reviews, and social sharing features.'
              },
              {
                icon: TrendingUp,
                title: 'Growth Analytics',
                description: 'Powerful insights and analytics for organizers to track performance and optimize their events.'
              }
            ].map((feature, index) => (
              <div key={index} className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl hover:-translate-y-2 transition-all duration-300">
                <div className="w-14 h-14 bg-gradient-to-br from-[hsl(var(--primary))]/20 to-pink-500/20 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <feature.icon className="w-7 h-7 text-[hsl(var(--primary))]" />
                </div>
                <h3 className="text-xl font-bold mb-3 group-hover:text-[hsl(var(--primary))] transition-colors">
                  {feature.title}
                </h3>
                <p className="text-[hsl(var(--muted-foreground))] leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-[hsl(var(--primary))]/5 to-pink-500/5">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">By The Numbers</h2>
            <p className="text-lg text-[hsl(var(--muted-foreground))]">
              Our impact and growth over the years
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Ticket,
                number: '10K+',
                label: 'Active Events',
                description: 'From intimate gatherings to large-scale conferences'
              },
              {
                icon: Users,
                number: '500K+',
                label: 'Happy Attendees',
                description: 'Creating memories across the globe'
              },
              {
                icon: BarChart3,
                number: '2K+',
                label: 'Event Organizers',
                description: 'Trusted partners in success'
              },
              {
                icon: Globe,
                number: '50+',
                label: 'Countries',
                description: 'Serving communities worldwide'
              }
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                  <stat.icon className="w-8 h-8 text-[hsl(var(--primary))]" />
                </div>
                <div className="text-4xl font-bold text-[hsl(var(--primary))] mb-2">
                  {stat.number}
                </div>
                <h3 className="text-xl font-bold mb-2">{stat.label}</h3>
                <p className="text-sm text-[hsl(var(--muted-foreground))]">
                  {stat.description}
                </p>
              </div>
            ))}
          </div>
          <div className="mt-16 bg-white rounded-2xl p-12 shadow-lg">
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  title: 'Founded',
                  value: '2020',
                  description: 'Started with a vision to revolutionize event discovery'
                },
                {
                  title: 'Growth',
                  value: '300%',
                  description: 'Year-over-year growth in attendees and organizers'
                },
                {
                  title: 'Satisfaction',
                  value: '98%',
                  description: 'Customer satisfaction rating from our community'
                }
              ].map((item, index) => (
                <div key={index} className="text-center">
                  <div className="text-5xl font-bold text-[hsl(var(--primary))] mb-2">
                    {item.value}
                  </div>
                  <h4 className="text-xl font-bold mb-2">{item.title}</h4>
                  <p className="text-[hsl(var(--muted-foreground))]">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="bg-gradient-to-br from-[hsl(var(--primary))] to-pink-500 rounded-3xl p-12 md:p-16 text-white shadow-2xl">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="space-y-8">
                <h2 className="text-4xl font-bold">
                  Ready to Be Part of Our Story?
                </h2>
                <p className="text-lg leading-relaxed opacity-90">
                  Whether you're looking to discover your next favorite event or share your passion with the world as an organizer, EventHub is here to make it happen.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link to={"/events"}>
                    <button className="px-8 py-4 bg-white text-[hsl(var(--primary))] rounded-xl font-medium hover:shadow-lg transition-all hover:scale-105 flex items-center justify-center gap-2">
                      Browse Events Now
                      <ArrowRight className="w-5 h-5" />
                    </button>
                  </Link>
                  <Link to={"/auth/signup"}>
                    <button className="px-8 py-4 border-2 border-white rounded-xl font-medium text-white hover:bg-white hover:text-[hsl(var(--primary))] transition-all">
                      Become an Organizer
                    </button>
                  </Link>
                </div>
              </div>
              <div className="relative">
                <div className="absolute inset-0 bg-white/10 rounded-2xl blur-xl"></div>
                <div className="relative bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Heart className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-bold mb-1">Passionate Community</h4>
                      <p className="text-sm opacity-90">Join millions who are already discovering amazing events</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Zap className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-bold mb-1">Cutting-Edge Technology</h4>
                      <p className="text-sm opacity-90">Experience seamless, intuitive event management and discovery</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Award className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-bold mb-1">Industry Leading Support</h4>
                      <p className="text-sm opacity-90">24/7 customer service dedicated to your success</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
