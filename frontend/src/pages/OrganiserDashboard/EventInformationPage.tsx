import { DataTable } from '@/components/shared/DataTable'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { HandCoins, User } from 'lucide-react'
import { userColumns } from '../../components/shared/Columns/userColumns'
import { useParams } from 'react-router-dom'
import { useQuery } from 'react-query';
import { getData } from '@/lib/react-query/apiFunctions';
import { useInternet } from '@/contexts/InterStatusWrapper';
import { checkForErrors } from '@/lib/utils';
import EditEventComponent from './EditEventComponents'

const EventInformationPage = () => {

    const { eventId } = useParams();
    const { isInterConnected } = useInternet();

    //fetching events data
    const { data: eventData } = useQuery({
        queryKey: 'recenteventdetailfororganiser',
        queryFn: () => getData({ endpoint: `/api/events/eventinsidedetail?eventId=${eventId}` }),
        onError: (error: any) => {
            checkForErrors(error?.response?.data, isInterConnected, "Something went wrong while fetching recent event data! place:EventMainDetailsPage", error.message);
        }
    })


    return (
        <div className='px-8 pt-5'>
            <Tabs defaultValue="info" className="w-full">
                <TabsList className={`box-content grid h-12 ${eventData?.data?.status == "upcoming" ? "max-w-md" : "w-full block text-center bg-background"}  grid-cols-2`}>
                    {eventData?.data?.status == "upcoming" && <TabsTrigger className='py-2 text-lg' value="Edit">Edit</TabsTrigger>}
                    <TabsTrigger className='py-2 text-lg' value="info">Information</TabsTrigger>
                </TabsList>
                {eventData?.data?.status == "upcoming" && <TabsContent value="Edit">
                    <EditEventComponent />
                </TabsContent>}
                <TabsContent value="info" className='pt-10'>
                    <div className='flex gap-5 justify-center'>
                        <div className='border-2 flex gap-3 item-center rounded-lg py-4 px-4 border-solid border-primary'>
                            <div className='font-semibold'>
                                <User size={60} />
                            </div>
                            <div className="text-xl font-semibold">
                                <div>Total Users</div>
                                <div className='mt-1'>{eventData?.data?.capacity || 0}/{eventData?.data?.totalUsers || 0}</div>
                            </div>
                        </div>
                        <div className='border-2 flex gap-3 item-center rounded-lg py-4 px-4 border-solid border-primary'>
                            <div className='font-semibold'>
                                <HandCoins size={60} />
                            </div>
                            <div className="text-xl font-semibold">
                                <div>Total Rupees</div>
                                <div className='mt-1'>{eventData?.data?.totalRupees || 0}₹</div>
                            </div>
                        </div>

                    </div>
                    <h1 className='mb-5 mt-16 text-4xl font-semibold text-center'>Registered Users</h1>
                    <DataTable columns={userColumns} data={eventData?.data?.registeredUsers || []} isActions={false} messageForNoRecord='No Users Found!' />
                </TabsContent>

            </Tabs>
        </div>
    )
}

export default EventInformationPage
