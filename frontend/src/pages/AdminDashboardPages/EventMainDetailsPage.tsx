import { DataTable } from '@/components/shared/DataTable'

import { CardFooter } from '@/components/ui/card'
import { HandCoins, User } from 'lucide-react'
import { userColumns } from '../../components/shared/Columns/userColumns'
import { useParams } from 'react-router-dom'
import { useQuery } from 'react-query';
import { getData } from '@/lib/react-query/apiFunctions';
import { useInternet } from '@/contexts/InterStatusWrapper';
import { checkForErrors } from '@/lib/utils';


const EventMainDetailsPage = () => {

  const {eventId} = useParams();
  const { isInterConnected } = useInternet();


  //fetching events data
  const { data:eventData } = useQuery({
    queryKey: 'recenteventdetailforadmin',
    queryFn: () => getData({ endpoint: `/api/events/eventinsidedetail?eventId=${eventId}` }),
    onError: (error: any) => {
        checkForErrors(error?.response?.data, isInterConnected, "Something went wrong while fetching recent event data! place:EventMainDetailsPage", error.message);
    }
})

  return (
    <div className='px-8 pt-5'>
<h1 className='mt-10 text-4xl font-semibold text-center'>{eventData?.data?.eventName}</h1>
<h4 className=' text-xl mt-5 mb-10 font-semibold text-center'>Organised By {eventData?.data?.organiserName}</h4>
      
      <div className='flex gap-5 justify-center'>
        <div className='border-2 flex gap-3 item-center rounded-lg py-4 px-4 border-solid border-primary'>
          <div className='font-semibold'>
            <User size={60} />
          </div>
          <div className="text-xl font-semibold">
            <div>Total Users</div>
            <div className='mt-1'>{eventData?.data?.totalUsers || 0}/{eventData?.data?.capacity || 0}</div>
          </div>

          <CardFooter>
          </CardFooter>
        </div>
        <div className='border-2 flex gap-3 item-center rounded-lg py-4 px-4 border-solid border-primary'>
          <div className='font-semibold'>
            <HandCoins size={60} />
          </div>
          <div className="text-xl font-semibold">
            <div>Total Rupees</div>
            <div className='mt-1'>{eventData?.data?.totalRupees || 0}₹</div>
          </div>

          <CardFooter>
          </CardFooter>
        </div>

      </div>
      <h1 className='mb-5 mt-16 text-4xl font-semibold text-center'>Registered Users</h1>
      <DataTable columns={userColumns}  data={eventData?.data?.registeredUsers || []} messageForNoRecord='No Users Found!' />

    </div>
  )
}

export default EventMainDetailsPage
