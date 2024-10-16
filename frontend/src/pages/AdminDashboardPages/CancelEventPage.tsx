import { DataTable } from "@/components/shared/DataTable"
import cancelEventColumns from "./DataTableColumns/cancelEventColumns"
import { confirmAlert } from "@/lib/sweetalert/alerts"
import { useMutation, useQuery, useQueryClient } from "react-query"
import { checkForErrors } from "@/lib/utils"
import { useInternet } from "@/contexts/InterStatusWrapper"
import { deleteData, getData, postData, putData } from "@/lib/react-query/apiFunctions"
import { useState } from "react"

const CancelEventPage = () => {

  const { isInterConnected } = useInternet();


  //fetching category data
  const { data: categoryData } = useQuery({
    queryKey: 'cancelevents',
    queryFn: () => getData({ endpoint: '/api/categories/all' }),
    onError: (error: any) => {
      checkForErrors(error?.response?.data, isInterConnected, "Something went wrong while fetching categories data! place:ManageCategoriesPage", error.message);
    }
  });


  const cancelEventsData: any = [
    {
      _id: "e7r39",
      eventName: "wow",
      eventLocation: "kjdfiejr",
      eventDate: "12/54/2004"

    },
    {
      _id: "e7r39",
      eventName: "wow",
      eventLocation: "kjdfiejr",
      eventDate: "12/54/2004"

    },
    {
      _id: "e7r39",
      eventName: "wow",
      eventLocation: "kjdfiejr",
      eventDate: "12/54/2004"

    },
    {
      _id: "e7r39",
      eventName: "wow",
      eventLocation: "kjdfiejr",
      eventDate: "12/54/2004"

    },
  ]

  const cancelEvent = async (id: any) => {
    console.log(id);

    return false;
  }

  const handleCancelEvent = (id: any) => {
    confirmAlert({ confirmFunction: cancelEvent, qtitle: "Are You Sure?", qtext: "Do you really want to cancel the Event?", qconfirmtext: "Yes, Cancel it!", stitle: "Event has been Canceled!", stext: "Event Cancellation Successful!", id })
  }

  return (
    <div className='pt-10'>
      <h1 className='mb-5 text-4xl font-semibold text-center'>Events Cancel Requests</h1>
      <DataTable columns={cancelEventColumns} onRowClick="/admin/cancelrequests" isNoDeleteButton={true} permissionAllowedFunction={handleCancelEvent} isSrno={true} data={cancelEventsData} isPermissionActions={true} messageForNoRecord='No Events Found!' />
    </div>
  )
}

export default CancelEventPage
