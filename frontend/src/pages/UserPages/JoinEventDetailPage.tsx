import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useInternet } from '@/contexts/InterStatusWrapper';
import { getData, putData } from '@/lib/react-query/apiFunctions';
import { successAlert } from '@/lib/sweetalert/alerts';
import { checkForErrors } from '@/lib/utils';
import {  Building, CalendarDays, Clock, MapPin, Ticket, Users, Users2 } from 'lucide-react';
import { useEffect } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom'
import Swal from 'sweetalert2';

const JoinEventDetailPage = () => {

    const { eventId } = useParams();
    const { isInterConnected } = useInternet()
    const queryClient = useQueryClient();
    const isLogin = useSelector((state: any) => state.auth?.isLogin);
    const navigate = useNavigate();

    useEffect(() => {
        if (!isLogin)
            navigate("/auth/signin");
    }, [])

    //react query code to get the event data
    const { data: eventData, isLoading, isError } = useQuery({
        queryKey: ['eventdata'],
        queryFn: () => getData({ endpoint: `/api/events/allevents/${eventId}` }),
        onError: (error: any) => {
            checkForErrors(error?.response?.data, isInterConnected, "Something went wrong while fetching all event detail data! place:JoinEventDetailPagePage", error.message);
        }
    })

    console.log(eventData);
    

    //react query code to handle cancel user registration 
    const { mutate: mutateCancelRegistration, isLoading: iscancelUserRegistrationLoading } = useMutation({
        mutationFn: putData,
        onSuccess: () => {
            successAlert({ title: "Event Successfully Canceled!", text: eventData?.data?.isFree ? "Your Registration has been canceled!" : "Your Registration has been canceled. Your Money Has Been Refunded!" });
            queryClient.invalidateQueries("eventdata");

        },
        onError: (error: any) => {
            checkForErrors(error?.response?.data, isInterConnected, "Something went wrong while cancelling the registration of the event! place:JoinEventDetailPagepage.tsx", error.message);
        }
    })


    //handle cancel registration
    const handleCancelUserRegistration = async () => {
        Swal.fire({
            title: "Cancel Event?",
            text: "Do you Really Want to Cancel the Event?",
            icon: "question",
            showCancelButton: true,
            confirmButtonColor: "hsl(262.1 83.3% 57.8%)",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes",
        }).then(async (result) => {
            if (result.isConfirmed) {
                mutateCancelRegistration({
                    endpoint: "/api/events/event/cancel",
                    payload: {
                        isfree: eventData?.data?.isFree,
                        eventId: eventId
                    }
                })

            }
        });


    }



    return (
        <section className="min-h-screen bg-secondary">
            {
                !isLoading ? (
                    !isError ? (
                        <div>
                            <div className="relative h-[300px] md:h-[400px]">
                                <img

                                    src={eventData?.data?.eventThumbnail || "/placeholder.svg"}
                                    alt={eventData?.data?.name}

                                    className="h-full w-full object-cover"

                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                                <div className="absolute bottom-0 left-0 right-0 p-6 text-secondary">
                                    <h1 className="text-3xl md:text-4xl font-bold mb-2 text-white">{eventData?.data?.name}</h1>
                                    <div className="flex items-center mt-5 gap-4">
                                        <Badge variant="secondary" className="bg-primary/80 text-primary-foreground">
                                            {eventData?.data?.categoryname}
                                        </Badge>
                                        <Badge variant="outline" className="text-primary-foreground border-primary-foreground">
                                            {eventData?.data?.languagename}
                                        </Badge>
                                    </div>
                                </div>
                            </div>

                            <div className="max-w-7xl mx-auto px-4 py-8 grid md:grid-cols-3 gap-8">
                                <div className="md:col-span-2 space-y-6">
                                    <Card>
                                        <CardContent className="p-6">
                                            <h2 className="text-2xl font-semibold mb-4">About This Event</h2>
                                            <p className="text-gray-600 whitespace-pre-wrap">{eventData?.data?.description}</p>
                                        </CardContent>
                                    </Card>

                                    <Card>
                                        <CardContent className="p-6">
                                            <h2 className="text-2xl font-semibold mb-4">Speakers</h2>
                                            <div className="flex items-center gap-4">
                                                <Users className="h-5 w-5 text-gray-500" />
                                                <span className="text-gray-600">{eventData?.data?.speakers}</span>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </div>

                                <div className="space-y-6">
                                    <Card>
                                        <CardContent className="p-6 space-y-6">
                                            <div className="flex justify-between items-center">
                                                <div className="font-semibold text-2xl">{eventData?.data?.isFree ? "Free✅" : `₹${eventData?.data?.ticketprice}🎫`}</div>
                                            </div>


                                            {
                                                eventData?.data?.status == "completed" ?
                                                    (<p className='font-bold text-center border-2 border-solid border-primary rounded-lg p-2 '>Event has been <Badge variant={"completed"}>Completed!</Badge></p>) :
                                                    eventData?.data?.status == "canceled" ? (
                                                        <>
                                                        <p className='font-bold text-center border-2 border-solid border-primary rounded-lg p-2 '>Event has been <Badge variant={"canceled"}>Canceled!</Badge></p>
                                                        {/* if the respective event is not free! */}
                                                        {!(eventData?.data?.isFree) && <p className='font-bold text-center border-2 border-solid border-primary rounded-lg p-2 '>Your Money has been Refunded. Plzz Check if you didn't receive the money, contact us asap! </p>}
                                                        </>
                                                    ) :
                                                        (
                                                            <>
                                                                {
                                                                    eventData?.data?.isFree ?
                                                                        <Button onClick={handleCancelUserRegistration} variant={"destructive"} className="w-full" size="lg">
                                                                            {!iscancelUserRegistrationLoading ? "Cancel Event" : "Loading.."}
                                                                        </Button> :
                                                                        <Button onClick={handleCancelUserRegistration} variant={"destructive"} className="w-full" size="lg">
                                                                            {!iscancelUserRegistrationLoading ? " Cancel and Refund" : "Loading.."}
                                                                        </Button>
                                                                }
                                                            </>
                                                        )
                                            }


                                            <Link className='mt-1 block' to={`/event/ticket/${eventId}`}>
                                                <Button variant={"outline"} className="w-full" size="lg">
                                                    See Ticket
                                                </Button>
                                            </Link>


                                            <div className="space-y-4">
                                                <div className="flex items-center gap-4">
                                                    <CalendarDays className="h-5 w-5 text-gray-500" />
                                                    <div>
                                                        <p className="font-medium">Date</p>
                                                        <p className="text-sm text-gray-600">
                                                            {new Date(eventData?.data?.date).toLocaleDateString("en-US", {
                                                                weekday: "long",
                                                                year: "numeric",
                                                                month: "long",
                                                                day: "numeric",
                                                            })}
                                                        </p>
                                                    </div>
                                                </div>

                                                <div className="flex items-center gap-4">
                                                    <Clock className="h-5 w-5 text-gray-500" />
                                                    <div>
                                                        <p className="font-medium">Time</p>
                                                        <p className="text-sm text-gray-600">{new Date(eventData?.data?.date).toLocaleTimeString()}</p>
                                                    </div>
                                                </div>

                                                <div className="flex items-center gap-4">
                                                    <MapPin className="h-5 w-5 text-gray-500" />
                                                    <div>
                                                        <p className="font-medium">Location</p>
                                                        <p className="text-sm text-gray-600">{eventData?.data?.location}</p>
                                                    </div>
                                                </div>

                                                <div className="flex items-center gap-4">
                                                    <Building className="h-5 w-5 text-gray-500" />
                                                    <div>
                                                        <p className="font-medium">Address</p>
                                                        <p className="text-sm text-gray-600">{eventData?.data?.address}</p>
                                                    </div>
                                                </div>

                                                <div className="flex items-center gap-4">
                                                    <Ticket className="h-5 w-5 text-gray-500" />
                                                    <div>
                                                        <p className="font-medium">Capacity</p>
                                                        <p className="text-sm text-gray-600">{eventData?.data?.capacity} attendees</p>
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-4">
                                                    <Users2 className="h-5 w-5 text-gray-500" />
                                                    <div>
                                                        <p className="font-medium">Total Users</p>
                                                        <p className="text-sm text-gray-600">{eventData?.data?.totalJoinedUsers
                                                        }</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>


                                </div>
                            </div>
                        </div>
                    ) : (
                        <h1>Something Went Wrong!</h1>
                    )
                ) : (
                    <h1>Loading...</h1>
                )
            }
        </section>
    )
}

export default JoinEventDetailPage
