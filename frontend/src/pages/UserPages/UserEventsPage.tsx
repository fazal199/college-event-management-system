import { columns } from '@/components/shared/Columns/userEventsColumns'
import { DataTable } from '@/components/shared/DataTable'
import { useInternet } from '@/contexts/InterStatusWrapper'
import { getData } from '@/lib/react-query/apiFunctions'
import { checkForErrors } from '@/lib/utils'
import React from 'react'
import { useQuery } from 'react-query'


const UserEventsPage = () => {

    const { isInterConnected } = useInternet();

    const { data: allUserJoinEventsData } = useQuery({
        queryKey: 'alluserjoinevents',
        queryFn: () => getData({ endpoint: '/api/events/allevents/events/userjoinevents' }),
        onError: (error: any) => {
            checkForErrors(error?.response?.data, isInterConnected, "Something went wrong while fetching all recent events data! place:AllEventsPage", error.message);
        }
    })
    
    console.log(allUserJoinEventsData);
    




    return (
        <section>
            <h1 className='mb-5 mt-16 text-4xl font-semibold text-center'>Your Events</h1>

            <DataTable columns={columns} data={allUserJoinEventsData?.data || []} messageForNoRecord='You Have Not Joined Any Event!' onRowClick="event" />
        </section>
    )
}

export default UserEventsPage
