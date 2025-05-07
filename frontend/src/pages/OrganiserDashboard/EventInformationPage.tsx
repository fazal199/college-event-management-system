import { DataTable } from '@/components/shared/DataTable'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { HandCoins, User } from 'lucide-react'
import { userColumns } from '../../components/shared/Columns/userColumns'
import { useParams } from 'react-router-dom'
import { QueryCache, useMutation, useQuery, useQueryClient } from 'react-query';
import { getData, putData } from '@/lib/react-query/apiFunctions';
import { useInternet } from '@/contexts/InterStatusWrapper';
import { checkForErrors } from '@/lib/utils';
import EditEventComponent from './EditEventComponents'
import { Button } from '@/components/ui/button'
import { useState } from 'react'
import { successAlert } from '@/lib/sweetalert/alerts'
import { log } from 'console'
import { set } from 'zod'

const EventInformationPage = () => {

    const queryClient = useQueryClient();
    const { eventId } = useParams();
    const { isInterConnected } = useInternet();
    const [isEventDate, setIsEventDate] = useState(false);
    const [isCanceled, setIsCanceled] = useState(false)

    //fetching events data
    const { data: eventData } = useQuery({
        queryKey: 'recenteventdetailfororganiser',
        queryFn: () => getData({ endpoint: `/api/events/eventinsidedetail?eventId=${eventId}` }),
        onSuccess: (data) => {
            
            setIsCanceled(data?.data?.status == "canceled" ? true : false);
            const today = new Date();
            today.setHours(0, 0, 0, 0);

            const eventDate = new Date(data?.data?.date);
            eventDate.setHours(0, 0, 0, 0);


            const isPastEvent = today >= eventDate;
            console.log(isPastEvent);
            
            setIsEventDate(isPastEvent);

        },
        onError: (error: any) => {
            checkForErrors(
                error?.response?.data,
                isInterConnected,
                "Something went wrong while fetching recent event data! place:EventMainDetailsPage",
                error.message
            );
        }
    });

    //react query code to update the event status to completed!
    const { mutate: eventStatus, isLoading: eventStatusLoading } = useMutation({
        mutationFn: putData,
        onSuccess: () => {
            successAlert({
                title: "Event Status Updated to Completed Successfully!",
                text: "You have successfully updated the event status to completed!",
            })
            queryClient.invalidateQueries("recenteventdetailfororganiser")

        },
        onError: (error: any) => {
            checkForErrors(error?.response?.data, isInterConnected, "Something went wrong while updating event status to completed ! place:EventInformationPage", error.message);
        }
    })

    //function to handle the event status update to completed
    function handleMarkAsCompleted() {
        eventStatus({
            endpoint: `/api/events/event/updatestatus/${eventId}`,
            payload: ""
        })
    }

    //react query code to move money to organiser wallet!
    const { mutate: moveMoneytoWallet, isLoading: moveMoneyLoading } = useMutation({
        mutationFn: putData,
        onSuccess: () => {

            successAlert({
                title: "The Money Has Been Added to Your Wallet Successfully!",
                text: "You have successfully added the event money to your wallet!",
            })
            queryClient.invalidateQueries("recenteventdetailfororganiser")

        },
        onError: (error: any) => {
            checkForErrors(error?.response?.data, isInterConnected, "Something went wrong while moving event money to organiser wallet! place:EventInformationPage", error.message);
        }
    })

    //function to handle the operation to move event money to orgainser wallet
    function handleMoveEventMoneytoWallet() {
        moveMoneytoWallet({
            endpoint: `/api/events/event/movemoneytoorganiserwallet`,
            payload: {
                eventId,
                organiserId: eventData?.data?.organiserId
            }
        })
    }
    return (
        <div className='px-8 pt-5'>
            <Tabs defaultValue="info" className="w-full">
                <TabsList className={`box-content grid h-12 max-w-md  grid-cols-2`}>
                    {(!isEventDate && !isCanceled) && <TabsTrigger className='py-2 text-lg' value="Edit">Edit</TabsTrigger>}
                    <TabsTrigger className='py-2 text-lg' value="info">Information</TabsTrigger>
                </TabsList>
                {(!isEventDate && !isCanceled) && <TabsContent value="Edit">
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
                                <div className='mt-1'>{eventData?.data?.totalUsers || 0}/{eventData?.data?.capacity || 0}</div>
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
                   { !isCanceled && <div className='border-2 max-w-md mx-auto mt-12 flex flex-col gap-6 rounded-lg py-4 px-4 border-solid border-primary'>

                        {eventData?.data.status != "completed" && <Button onClick={handleMarkAsCompleted} disabled={!isEventDate}>{eventStatusLoading ? "Loading.." : "Mark as Completed!"}</Button>}

                        {/* the move money to wallet button should be shown when the event status is completed! */}
                        {eventData?.data.isMoneyTransferedtoWallet ? <p className='font-bold text-center'>You Have Transfered This Event Money!</p> : <Button onClick={handleMoveEventMoneytoWallet} disabled={eventData?.data?.status != "completed"} >{moveMoneyLoading ? "Loading" : "Move Money to Wallet!"}</Button>}


                    </div>}
                    <h1 className='mb-5 mt-16 text-4xl font-semibold text-center'>Registered Users</h1>
                    <DataTable columns={userColumns} data={eventData?.data?.registeredUsers || []} isActions={false} messageForNoRecord='No Users Found!' />
                </TabsContent>

            </Tabs>
        </div>
    )
}

export default EventInformationPage
