import GridMainContent from '@/components/shared/GridMainContent'
import Sidebar from '@/components/shared/Sidebar'
import { NavigationLink } from '@/types'
import { Book, CircleUserRound, SquarePlus } from 'lucide-react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'


const OrganiserLayout = () => {

  const role = useSelector((state: any) => state.auth?.userData?.data?.role);
  const isLogin = useSelector((state: any) => state.auth?.isLogin);

  if (role != "organiser" || !isLogin)
    return <Navigate to="/" replace={true} />

  const sidebarItems: Array<NavigationLink> = [

    {
      text: "Your Events",
      link: "/manage-events/yourevents",
      icon: <Book />,
    },
    {
      text: "Create Event",
      link: "/manage-events/createevents",
      icon: <SquarePlus />
    },
    {
      text: "Profile",
      link: "/manage-events/profile",
      icon: <CircleUserRound />
    },
  ]



  return (

    <GridMainContent>
      <Sidebar sidebarItems={sidebarItems} />
      <div>
        <Outlet />
      </div>
    </GridMainContent>

  )
}

export default OrganiserLayout
