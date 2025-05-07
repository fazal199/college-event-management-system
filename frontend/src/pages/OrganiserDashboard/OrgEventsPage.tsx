import { DataTable } from '@/components/shared/DataTable'
import { columns } from '../../components/shared/Columns/eventColumns'
import { confirmAlert, editAlert, warningAlert } from '@/lib/sweetalert/alerts'
import { checkForErrors } from '@/lib/utils';
import { useMutation, useQuery, useQueryClient } from "react-query"
import { useInternet } from "@/contexts/InterStatusWrapper"
import { deleteData, getData, putData } from "@/lib/react-query/apiFunctions"
import { title } from 'process';

const OrgEventsPage = () => {

    const { isInterConnected } = useInternet();
    const queryClient = useQueryClient();

    //fetching events data
    const { data: allRecentEventsData } = useQuery({
        queryKey: 'allrecenteventsfororganiser',
        queryFn: () => getData({ endpoint: '/api/events/allrecenteventsorganiser' }),
        onError: (error: any) => {
            checkForErrors(error?.response?.data, isInterConnected, "Something went wrong while fetching Organiser recent events data! place:OrgEventsPage", error.message);
        }
    })

    //to make request for event cancellation to admin
    const { mutate } = useMutation({
        mutationFn: putData,
        onError: (error: any) => {
            checkForErrors(error?.response?.data, isInterConnected, "Something went wrong while creating cancel event request! place:OrgEventsPage", error.message);
        }
    })

    const handleRequestFunction = async (id: any, reason: any) => {
        mutate({
            endpoint: "/api/events/canceleventrequest",
            payload: {
                eventId: id,
                reason
            }
        })
        return false;
    }

    //to cancel event directly
    const { mutate: cancelMutate } = useMutation({
        mutationFn: putData,
        onSuccess: () => {
            queryClient.invalidateQueries("allrecenteventsfororganiser");
        },
        onError: (error: any) => {
            checkForErrors(error?.response?.data, isInterConnected, "Something went wrong while cancelling event! place:OrgEventsPage", error.message);
        }
    })

    const handleCancelEvent = async (id: any) => {
        cancelMutate({
            endpoint: `/api/events/cancel/${id}`,
        })
        return false;
    }

  

    const deleteEvent = async (id: any, { status, isFree }: any) => {

        //if the event is completed, then just saying no to organiser
        if (status == "completed") {
            warningAlert({ title: "Oops!", text: "The Event Has Been Completed and You can't Cancel it!" })
        }

        //if event is upcoming and free, so the organiser can directly delete it!
        else if (status == "upcoming" && isFree)
            confirmAlert({
                confirmFunction: handleCancelEvent, qtitle: "Are you Sure?", qtext: "Do you really want to Cancel the Event?", iconType: "warning", qconfirmtext: "Yes!", id, stitle: "Event Canceled!", stext: "You Event has been canceled successfully!"
            })


            //now if the event is paid and status is upcoming
        else {
            editAlert({
                title: "Do you really want to Cancel Event?",
                text: "You Have to Provide a Reason, so that Admin can make Decision!",
                inputType: "text",
                inputPlaceholder: "Write Your Reason Here!",
                confirmButtonText: "Yes, Cancel It!",
                editFunction: handleRequestFunction,
                id: id,
                stitle: "Request Sent Successfully!",
                stext: "An Request has been sent to Admin, Plzz wait We will contact you soon!",

            })
        }
    }

    return (
        <div className='pt-10'>
            <h1 className='mb-5 text-4xl font-semibold text-center'>Your Recent Events</h1>
            <DataTable columns={columns} isNoEditButton={true} onRowClick='/manage-events/editevent' data={allRecentEventsData?.data || []} isActions={true} deleteRecordFunction={deleteEvent} messageForNoRecord='No Events Found!' />
        </div>
    )
}

export default OrgEventsPage
