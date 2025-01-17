import { DataTable } from '@/components/shared/DataTable'
import { columns } from '../../components/shared/Columns/eventColumns'
import { useQuery } from 'react-query';
import { getData } from '@/lib/react-query/apiFunctions';
import { useInternet } from '@/contexts/InterStatusWrapper';
import { checkForErrors } from '@/lib/utils';

const AllEventsPage = () => {

    const { isInterConnected } = useInternet();

    //fetching events data
    const { data: allRecentEventsData } = useQuery({
        queryKey: 'allrecenteventsforadmin',
        queryFn: () => getData({ endpoint: '/api/events/allrecentevents' }),
        onError: (error: any) => {
            checkForErrors(error?.response?.data, isInterConnected, "Something went wrong while fetching all recent events data! place:AllEventsPage", error.message);
        }
    })


    return (
        <div className='pt-10'>
            <h1 className='mb-5 text-4xl font-semibold text-center'>All Events Information</h1>
            <DataTable columns={columns} onRowClick='/admin/events' data={allRecentEventsData?.data || []} messageForNoRecord='No Events Found!' />
        </div>
    )
}

export default AllEventsPage
