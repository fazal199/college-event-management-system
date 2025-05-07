import { Building2, HandCoins, User } from 'lucide-react'
import ReactApexChart from "react-apexcharts"
import { useSelector } from 'react-redux'
import { useQuery } from "react-query"
import { checkForErrors } from "@/lib/utils"
import { useInternet } from "@/contexts/InterStatusWrapper"
import { getData } from "@/lib/react-query/apiFunctions"


// Helper function to get the last 7 days
const getLast7Days = () => {
  const days = [];
  for (let i = 6; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    days.push(date.toLocaleDateString('en-US', { weekday: 'short', day: 'numeric' })); // e.g., 'Sun 13'
  }
  return days;
}

const DashboardPage = () => {

  const { userData } = useSelector((state: any) => state.auth)
  const { isInterConnected } = useInternet();
  const last7Days = getLast7Days();

  // fetching cancel events data
  const { data: dashboardData } = useQuery({
    queryKey: 'dashboard',
    queryFn: () => getData({ endpoint: '/api/events/dashboard' }),
    onError: (error: any) => {
      checkForErrors(error?.response?.data, isInterConnected, "Something went wrong while fetching data of the Dashoboard! place:DashboardPage", error.message);
    }
  });

  console.log(dashboardData?.data);
  

  const state = {

    series: [{
      name: 'Users',
      data: dashboardData?.data?.totalUsersLast7Days || [0, 0, 0, 0, 0, 0, 0]
    }, {
      name: 'Organisers',
      data: dashboardData?.data?.totalOrganisersLast7Days || [0, 0, 0, 0, 0, 0, 0]
    }],
    options: {
      chart: {
        height: 350,
        type: 'bar'
      },

      dataLabels: {
        enabled: true,

      },
      stroke: {
        curve: 'smooth'
      },
      xaxis: {
        type: 'week',
        categories: last7Days
      },
      tooltip: {
        x: {
          format: 'dd/MM/yy HH:mm'
        },
      },
    },

  };

  return (
    <div>
      <h1 className='mt-9 text-4xl font-semibold text-center'>Hello, {userData.data?.username}👋</h1>
      <div className='grid grid-cols-3 max-w-4xl mx-auto gap-5 pt-12'>
        <div className='border-2 flex gap-3 item-center rounded-lg py-4 px-4 border-solid border-primary'>
          <div className='font-semibold'>
            <User size={60} />
          </div>
          <div className="text-xl font-semibold">
            <div>Total Users</div>
            <div className='mt-1'>{dashboardData?.data?.totalUsers || 0}</div>
          </div>

        </div>
        <div className='border-2 flex gap-3 item-center rounded-lg py-4 px-4 border-solid border-primary'>
          <div className='font-semibold'>
            <Building2 size={60} />
          </div>
          <div className="text-xl font-semibold">
            <div>Total Organisers</div>
            <div className='mt-1'>{dashboardData?.data?.totalOrganisers || 0}</div>
          </div>
        </div>
        <div className='border-2 flex gap-3 item-center rounded-lg py-4 px-4 border-solid border-primary'>
          <div className='font-semibold'>
            <HandCoins size={60} />
          </div>
          <div className="text-xl font-semibold">
            <div>Total Rupees</div>
            <div className='text-xs'>(upcoming events)</div>
            <div className='mt-1'>{dashboardData?.data?.totalRupees || 0}₹</div>
          </div>
        </div>

      </div>
      <div className='max-w-5xl mx-auto mt-16'>
        <ReactApexChart options={state.options} series={state.series} type="area" height={350} />
      </div>
    </div>
  )
}

export default DashboardPage
