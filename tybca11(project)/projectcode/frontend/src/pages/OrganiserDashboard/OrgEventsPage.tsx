import { DataTable } from '@/components/shared/DataTable'
import { columns } from '../../components/shared/Columns/eventColumns'
import { confirmAlert, editAlert, successAlert } from '@/lib/sweetalert/alerts'
import { checkForErrors } from '@/lib/utils';
import { useMutation, useQuery, useQueryClient } from "react-query"
import { useInternet } from "@/contexts/InterStatusWrapper"
import { deleteData, getData, putData } from "@/lib/react-query/apiFunctions"
import { useState } from 'react';

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

    //to make admin request for event cancellation
    const { mutate, isLoading: requestLoading } = useMutation({
        mutationFn: putData,
        onError: (error: any) => {
            checkForErrors(error?.response?.data, isInterConnected, "Something went wrong while creating cancel evnet request! place:OrgEventsPage", error.message);
        }
    })

    //to delete event
    const { mutate:deleteMutate, isLoading: deleteLoading } = useMutation({
        mutationFn: deleteData,
        onSuccess : () => {
            queryClient.invalidateQueries("allrecenteventsorganiser");
        },
        onError: (error: any) => {
            
            checkForErrors(error?.response?.data, isInterConnected, "Something went wrong while deleting event! place:OrgEventsPage", error.message);
        }
    })

    const handleDeleteEvent = async (id: any) => {
        deleteMutate({
            endpoint : `/api/events/delete/${id}`
        })
        return false;
    }

    const handleRequestFunction = async (id: any, reason: any) => {
        mutate({
            endpoint: "/api/events/canceleventrequest",
            payload : {
                eventId : id,
                reason 
            }
        })
        return false;
    }

    const deleteEvent = async (id: any, status: any) => {
        if (status == "upcoming")
            editAlert({
                title: "Do you really want to Cancel Event?",
                text: "You Have to Provide a Reason, so that Admin can Decision",
                inputType: "text",
                inputPlaceholder: "Write Your Reason Here!",
                confirmButtonText: "Yes, Cancel It!",
                editFunction: handleRequestFunction,
                id: id,
                stitle: "Request Sent Successfully!",
                stext: "An Request has been sent to Admin, Plzz wait We will contact you soon!",

            })

        else {
            confirmAlert({
                confirmFunction: handleDeleteEvent, qtitle: "Are you Sure?", qtext: "Do you really want to Delete the Event?", iconType: "warning", qconfirmtext: "Yes!", id, stitle: "Event Deleted!", stext: "Event Information has been Deleted!"
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
