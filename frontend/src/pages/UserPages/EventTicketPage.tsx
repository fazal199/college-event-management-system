import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useInternet } from '@/contexts/InterStatusWrapper';
import { getData } from '@/lib/react-query/apiFunctions';
import { checkForErrors, formatDate } from '@/lib/utils';
import { CalendarIcon, Clock, Globe, Mail, MapPin, Tag, User } from 'lucide-react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom'

const EventTicketPage = () => {

    const {eventId} = useParams();
    const { isInterConnected } = useInternet()
  

     //react query code to get the ticket data
     const { data: ticketData } = useQuery({
      queryKey: ['ticketdata'],
      queryFn: () => getData({ endpoint: `/api/events/event/ticket/${eventId}` }),
      onError: (error: any) => {
          checkForErrors(error?.response?.data, isInterConnected, "Something went wrong while fetching ticket data of the event! place:EventTicketPage", error.message);
      }
  })

  console.log(ticketData);
  
  
    
  return (
    
    <>
        <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="w-full max-w-md overflow-hidden border-0 shadow-lg shadow-secondary-foreground">
          {/* Ticket header */}
          <div className="bg-primary p-6 text-primary-foreground">
            <h1 className="text-2xl font-bold text-primary-foreground">{ticketData?.data?.name}</h1>
            <div className="flex items-center mt-2">
              <CalendarIcon className="h-4 w-4 mr-2 " />
              <span className='text-primary-foreground'>{formatDate(ticketData?.data?.date) || "Error"}</span>
            </div>
            <div className="flex items-center mt-1">
              <Clock className="h-4 w-4 mr-2 " />
              <span className='text-primary-foreground'>{formatDate(ticketData?.data?.date) || "Error"}</span>
            </div>
          </div>
  
          {/* Ticket body */}
          <div className="p-6 bg-card text-card-foreground">
            {/* Location info */}
            <div className="mb-4">
              <div className="flex items-start">
                <MapPin className="h-5 w-5 mr-2 mt-0.5 text-primary" />
                <div>
                  <p className="font-medium">{ticketData?.data?.location}</p>
                  <p className="text-muted-foreground text-sm">{ticketData?.data?.address}</p>
                </div>
              </div>
            </div>
  
            {/* Divider with scissors icon */}
            <div className="relative py-4">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border border-dashed"></div>
              </div>
              <div className="relative flex justify-center">
                <span className="bg-card px-2 text-sm text-muted-foreground">Event Details</span>
              </div>
            </div>
  
            {/* Event details */}
            <div className="grid grid-cols-2 gap-3 mb-4">
              <div className="flex items-center">
                <Tag className="h-4 w-4 mr-2 text-primary" />
                <span className="text-sm">
                  <span className="text-muted-foreground">Category:</span> {ticketData?.data?.categoryname}
                </span>
              </div>
              <div className="flex items-center">
                <Globe className="h-4 w-4 mr-2 text-primary" />
                <span className="text-sm">
                  <span className="text-muted-foreground">Language:</span> {ticketData?.data?.languagename}
                </span>
              </div>
            </div>
  
            {/* Speaker */}
            <div className="mb-4">
              <h3 className="text-sm font-medium text-muted-foreground mb-1">Speaker</h3>
              <p className="font-medium">{ticketData?.data?.speakers}</p>
            </div>
  
            {/* Ticket price */}
            <div className="mb-4">
              <h3 className="text-sm font-medium text-muted-foreground mb-1">Ticket Price</h3>
              <p className="font-medium">{ticketData?.data?.ticketPrice === 0 ? "Free" : `₹${ticketData?.data?.ticketprice}`}</p>
            </div>
  
            {/* Divider */}
            <div className="relative py-4">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border border-dashed"></div>
              </div>
              <div className="relative flex justify-center">
                <span className="bg-card px-2 text-sm text-muted-foreground">Attendee</span>
              </div>
            </div>
  
            {/* Attendee info */}
            <div className="mb-4">
              <div className="flex items-center mb-2">
                <User className="h-4 w-4 mr-2 text-primary" />
                <span className="text-sm">
                  <span className="text-muted-foreground">Name:</span> {ticketData?.data?.username}
                </span>
              </div>
              <div className="flex items-center">
                <Mail className="h-4 w-4 mr-2 text-primary" />
                <span className="text-sm">
                  <span className="text-muted-foreground">Email:</span> {ticketData?.data?.useremail}
                </span>
              </div>
            </div>
            <div >
        <Button onClick={() => window.print()} className="font-semibold mt-4 w-9/12 mx-auto block">
          Download!
        </Button>
      </div>
          </div>
        </Card>
      </div>
      
    </>
  
  )
}

export default EventTicketPage
