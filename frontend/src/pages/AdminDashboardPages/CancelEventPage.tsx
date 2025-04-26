import { DataTable } from "@/components/shared/DataTable"
import cancelEventColumns from "./DataTableColumns/cancelEventColumns"
import { confirmAlert, successAlert } from "@/lib/sweetalert/alerts"
import { useMutation, useQuery, useQueryClient } from "react-query"
import { checkForErrors } from "@/lib/utils"
import { useInternet } from "@/contexts/InterStatusWrapper"
import { deleteData, getData, postData, putData } from "@/lib/react-query/apiFunctions"
import { useState } from "react"

const CancelEventPage = () => {

  const { isInterConnected } = useInternet();
  const queryClient = useQueryClient();


  // fetching cancel events data
  const { data: cancelEventData } = useQuery({
    queryKey: 'cancelevents',
    queryFn: () => getData({ endpoint: '/api/events/getcanceleventrequests' }),
    onError: (error: any) => {
      checkForErrors(error?.response?.data, isInterConnected, "Something went wrong while fetching cancel events data! place:CancelEventPage", error.message);
    }
  });

  //to cancel the event
  const { mutate: cancelMutate } = useMutation({
    mutationFn: deleteData,
    onSuccess: () => {
      successAlert({
        title: "Event Canceled!",
        text: "You have successfully Canceled the Event!",
      })
      queryClient.invalidateQueries("cancelevents");

    },
    onError: (error: any) => {
      checkForErrors(error?.response?.data, isInterConnected, "Something went wrong while canceling event! place:CancelEventPage", error.message);
    }
  })

  const cancelEvent = async (eventId:any) => {
    console.log(eventId);
    
    cancelMutate({
      endpoint: `/api/events/delete/${eventId}`
    })

    return false;
  }

  const handleCancelEvent = (id: any,eventId:any) => {
    confirmAlert({ confirmFunction: cancelEvent, qtitle: "Are You Sure?", qtext: "Do you really want to cancel the Event?", qconfirmtext: "Yes, Cancel it!", stitle: "Event has been Canceled!", stext: "Event Cancellation Successful!", id:eventId })
  }

  return (
    <div className='pt-10'>
      <h1 className='mb-5 text-4xl font-semibold text-center'>Events Cancel Requests</h1>
      <DataTable columns={cancelEventColumns} onRowClick="/admin/cancelrequests" isNoDeleteButton={true} permissionAllowedFunction={handleCancelEvent} isSrno={true} data={cancelEventData?.data || []} isPermissionActions={true} messageForNoRecord='No Cancel Events Found!' />
    </div>
  )
}

export default CancelEventPage
