import { Building2, HandCoins, User } from 'lucide-react'
import ReactApexChart from "react-apexcharts"
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';

const DashboardPage = () => {

  const {userData} = useSelector((state:any) => state.auth)
  

  const state = {
          
    series: [{
      name: 'series1',
      data:[11, 32, 45, 32, 34, 52, 41]
    }, {
      name: 'series2',
      data: [11, 72, 45, 32, 84, 52, 31]
    }],
    options: {
      chart: {
        height: 350,
        type: 'area'
      },
      
      dataLabels: {
        enabled: true,

      },
      stroke: {
        curve: 'smooth'
      },
      xaxis: {
        type: 'months',
        categories : [1,2,3,4,5,6,7,8,9,10]
       
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
            <div className='mt-1'>12/50</div>
          </div>

        </div>
        <div className='border-2 flex gap-3 item-center rounded-lg py-4 px-4 border-solid border-primary'>
          <div className='font-semibold'>
            <Building2 size={60} />
          </div>
          <div className="text-xl font-semibold">
            <div>Total Organisers</div>
            <div className='mt-1'>3000</div>
          </div>
        </div>
        <div className='border-2 flex gap-3 item-center rounded-lg py-4 px-4 border-solid border-primary'>
          <div className='font-semibold'>
            <HandCoins size={60} />
          </div>
          <div className="text-xl font-semibold">
            <div>Total Rupees</div>
             <div className='text-xs'>(upcoming events)</div>
            <div className='mt-1'>3000₹</div>
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
