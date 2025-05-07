import { useParams } from "react-router-dom"
import { useQuery } from "react-query"
import { checkForErrors } from "@/lib/utils"
import { useInternet } from "@/contexts/InterStatusWrapper"
import { getData } from "@/lib/react-query/apiFunctions"


const EventCancelDetailPage = () => {

  const { eventId } = useParams();
  
  const { isInterConnected } = useInternet();
  
  // fetching cancel event data
  const { data: cancelEventData } = useQuery({
    queryKey: 'canceleventdata',
    queryFn: () => getData({ endpoint: `/api/events/getcanceleventdata/${eventId}` }),
    onError: (error: any) => {
      checkForErrors(error?.response?.data, isInterConnected, "Something went wrong while fetching cancel event data! place:EventCancelDetailPage", error.message);
    }
  });

  

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid grid-cols-1 gap-8">
        <div className="space-y-8">
          <div>
            <h1 className="text-3xl font-bold">{cancelEventData?.data?.name}</h1>
            <p className="mt-2">Organized By {cancelEventData?.data?.organisername}</p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Location</p>
              <p>{cancelEventData?.data?.location}</p>
            </div>

            <div>
              <p className="text-sm font-medium text-muted-foreground">Category</p>
              <p>{cancelEventData?.data?.categoryname}</p>
            </div>

            <div>
              <p className="text-sm font-medium text-muted-foreground">Date & Time</p>
              <p>{cancelEventData?.data?.date} (24 Hours)</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Language</p>
              <p>{cancelEventData?.data?.languagename}</p>
            </div>
          </div>
          <div className=" max-w-none">
            <h2 className='text-3xl font-semibold mb-4'>Event Cancellation Reason!</h2>

            <p>
              {cancelEventData?.data?.reason}
            </p>
          </div>
          <div>
            <h2 className='text-3xl font-semibold mb-4'>About the Event</h2>
            <p>
              {cancelEventData?.data?.description}
            </p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-y-7 gap-x-4">
          <div>
            <p className="text-sm font-medium text-muted-foreground">Address</p>
            <p>{cancelEventData?.data?.address}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">Capacity</p>
            <p>{cancelEventData?.data?.capacity} people</p>
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">Ticket Price</p>
            <p>₹{cancelEventData?.data?.ticketprice}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">People Joined</p>
            <p>{cancelEventData?.data?.totalUsers}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EventCancelDetailPage
