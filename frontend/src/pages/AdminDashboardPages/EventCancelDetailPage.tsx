
const EventCancelDetailPage = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
    <div className="grid grid-cols-1 gap-8">
      <div className="space-y-8">
       <div>
          <h1 className="text-3xl font-bold">Sustainable Fashion Showcase</h1>
          <p className="mt-2">Organized By Hello wold</p>
       </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm font-medium text-muted-foreground">Location</p>
            <p>San Francisco, CA</p>
          </div>
         
          <div>
            <p className="text-sm font-medium text-muted-foreground">Category</p>
            <p>Fashion</p>
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">Organizer</p>
            <p>Eco Fashion Alliance</p>
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">Date & Time</p>
            <p>June 15, 2023 - 9:00 AM to 5:00 PM</p>
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">Language</p>
            <p>English</p>
          </div>
        </div>
        <div className=" max-w-none">
          <h2 className='text-3xl font-semibold mb-4'>Event Cancellation Reason!</h2>
          <p>
            Join us for a celebration of sustainable fashion at our annual Sustainable Fashion Showcase. Discover the
            latest eco-friendly designs, learn from industry experts, and connect with like-minded individuals who are
            passionate about making a positive impact on the environment.
          </p>
          <p>
            This event is organized by the Eco Fashion Alliance, a non-profit dedicated to promoting sustainable
            practices in the fashion industry. Attendees will have the opportunity to explore a curated selection of
            sustainable fashion brands, attend educational workshops, and participate in interactive activities.
          </p>
        </div>
        <div>
          <h2 className='text-3xl font-semibold mb-4'>About the Event</h2>
          <p>
            Join us for a celebration of sustainable fashion at our annual Sustainable Fashion Showcase. Discover the
            latest eco-friendly designs, learn from industry experts, and connect with like-minded individuals who are
            passionate about making a positive impact on the environment.
          </p>
       
        </div>
      </div>
      <div className="grid grid-cols-2 gap-y-7 gap-x-4">
        <div>
          <p className="text-sm font-medium text-muted-foreground">Address</p>
          <p>123 Main Street, San Francisco, CA 94101</p>
        </div>
        <div>
          <p className="text-sm font-medium text-muted-foreground">Capacity</p>
          <p>500 people</p>
        </div>
        <div>
          <p className="text-sm font-medium text-muted-foreground">Ticket Price</p>
          <p>$25</p>
        </div>
        <div>
          <p className="text-sm font-medium text-muted-foreground">People Joined</p>
          <p>320</p>
        </div>
      </div>
    </div>
  </div>
  )
}

export default EventCancelDetailPage
