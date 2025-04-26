import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useInternet } from '@/contexts/InterStatusWrapper';
import { getData, postData, putData } from '@/lib/react-query/apiFunctions';
import { confirmAlert, successAlert, warningAlert } from '@/lib/sweetalert/alerts';
import { checkForErrors } from '@/lib/utils';
import axios from 'axios';
import { log } from 'console';
import { AlignVerticalJustifyStart, Building, CalendarDays, Clock, MapPin, Ticket, Users, Users2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom'
import Swal from 'sweetalert2';

const EventDetails = () => {

    const { eventId } = useParams();
    const usercredentials = useSelector((state: any) => state.auth?.userData?.data);
    const { isInterConnected } = useInternet()
    const queryClient = useQueryClient();
    const isLogin = useSelector((state: any) => state.auth?.isLogin);
    const navigate = useNavigate();

    //react query code to get the event data
    const { data: eventData, isLoading, isError } = useQuery({
        queryKey: ['eventdata'],
        queryFn: () => getData({ endpoint: `/api/events/allevents/${eventId}` }),
        onError: (error: any) => {
            checkForErrors(error?.response?.data, isInterConnected, "Something went wrong while fetching all event detail data! place:EventDetailsPage", error.message);
        }
    })

    //react query code to handle free registration
    const { mutate: mutateFreeRegistration, isLoading: isLoadingFreeRegistration } = useMutation({
        mutationFn: postData,
        onSuccess: () => {
            queryClient.invalidateQueries("eventdata");
            successAlert({
                title: "Registration Successful!",
                text: "You Have Registered in the Event. Download Your Ticket, Will see at the Event!"
            })
        },
        onError: (error: any) => {
            checkForErrors(error?.response?.data, isInterConnected, "Something went wrong while registering the user in free event! place:EventDetailspage.tsx", error.message);
        }
    })

    //react query code to handle paid registration and verification
    const { mutate: mutatePaidRegistration } = useMutation({
        mutationFn: postData,
        onSuccess: (response: any) => {
            console.log(response);

            const order = response?.data?.order
            const keyId = response?.data?.keyId

            const options = {
                key: keyId, // Use Razorpay Key ID
                amount: order.amount,
                currency: order.currency,
                name: eventData?.data?.name,
                description: 'Payment for Event Registration!',
                order_id: order.id,
                handler: async function (response: any) {

                    // Step 3: Verify Payment on Backend
                    const verifyRes = await axios.post(import.meta.env.VITE_BASE_API_URL + "/api/events/allevents/event/verify", {
                        ...response,
                        eventId,
                        ticketprice: eventData?.data?.ticketprice,
                        amount: order.amount,
                    }, {
                        withCredentials: true
                    });

                    if (verifyRes.data.success) {
                        successAlert({
                            title: "Payment Successfull!",
                            text: "Download the Ticket, Will see you at the Event!"
                        })
                        queryClient.invalidateQueries("eventdata");

                    }
                    else {
                        warningAlert({
                            title: "Oops!",
                            text: "Something went wrong, Plzz try Later!",
                        });
                        console.log("something went wrong while payment verification. place: EventDetailsPage.tsx");
                        console.log(verifyRes);

                    }
                },
                prefill: {
                    name: usercredentials?.username || "",
                    email: usercredentials?.useremail || "",

                },
                theme: {
                    color: '#3399cc',
                },
            };
            const Razorpay = (window as any).Razorpay;
            if (typeof Razorpay !== "function") {
                console.error("Razorpay SDK is not loaded or is unavailable.");
                return;
            }
            const paymentObject = new Razorpay(options);
            paymentObject.open();



        },
        onError: (error: any) => {
            checkForErrors(error?.response?.data, isInterConnected, "Something went wrong while registering the user in paid event! place:EventDetailspage.tsx", error.message);
        }
    })
    //react query code to handle cancel user registration 
    const { mutate: mutateCancelRegistration, isLoading: iscancelUserRegistrationLoading } = useMutation({
        mutationFn: putData,
        onSuccess: (response: any) => {
            successAlert({ title: "Event Successfully Canceled!", text: eventData?.data?.isFree ? "Your Registration has been canceled!" : "Your Registration has been canceled. Your Money Has Been Refunded!" });
            queryClient.invalidateQueries("eventdata");

        },
        onError: (error: any) => {
            checkForErrors(error?.response?.data, isInterConnected, "Something went wrong while cancelling the registration of the event! place:EventDetailspage.tsx", error.message);
        }
    })

    //handling free registration event
    const handleFreeEventRegistration = async () => {
        if (!isLogin) {
            navigate("/auth/signin");
            return;
        }

        Swal.fire({
            title: "Register Event?",
            text: "Do you Really Want to Join the Event?",
            icon: "question",
            showCancelButton: true,
            confirmButtonColor: "hsl(262.1 83.3% 57.8%)",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes",
        }).then(async (result) => {
            if (result.isConfirmed) {
                mutateFreeRegistration({
                    endpoint: `/api/events/allevents/events/register/${eventId}`,
                    payload: {
                        eventId
                    }
                })
            }
        });


    }

    //handle paid registration event
    const handlePaidEventRegistration = async () => {
        if (!isLogin) {
            navigate("/auth/signin");
            return;
        }
        Swal.fire({
            title: "Register Event?",
            text: "Do you Really Want to Join the Event?",
            icon: "question",
            showCancelButton: true,
            confirmButtonColor: "hsl(262.1 83.3% 57.8%)",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes",
        }).then(async (result) => {
            if (result.isConfirmed) {
                mutatePaidRegistration({
                    endpoint: "/api/events/allevents/events/session",
                    payload: {
                        amount: eventData?.data?.ticketprice
                    }
                })
            }
        });


    }


    //handle cancelling of the event
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
                                    loading='lazy'
                                    src={eventData?.data?.eventThumbnail || "/placeholder.svg"}
                                    alt={eventData?.data?.name}

                                    className="h-full w-full object-cover"

                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                                <div className="absolute bottom-0 left-0 right-0 p-6 text-secondary">
                                    <h1 className="text-3xl md:text-4xl font-bold mb-2 text-primary-foreground">{eventData?.data?.name}</h1>
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
                                                //checking whether the user has joined the requested event or not
                                                eventData?.data?.isJoined ?
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

                                                        <Link className='mt-1 block' to={`/event/ticket/${eventId}`}>
                                                            <Button variant={"outline"} className="w-full" size="lg">
                                                                See Ticket
                                                            </Button>
                                                        </Link>
                                                    </> :


                                                    //checking if whether the event is full or not
                                                    eventData?.data?.totalJoinedUsers == eventData?.data?.capacity ?
                                                        <Button disabled className='w-full ' size={"lg"}>The Event is Full!</Button> :

                                                        //checking if the event is free or not
                                                        eventData?.data?.isFree ? (<Button onClick={handleFreeEventRegistration} className="w-full" size="lg">
                                                            {!isLoadingFreeRegistration ? "Register Now" : "Loading..."}
                                                        </Button>) :
                                                            (
                                                                <Button className="w-full" size="lg" onClick={handlePaidEventRegistration}>
                                                                    Get a Ticket
                                                                </Button>
                                                            )

                                            }


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

export default EventDetails
