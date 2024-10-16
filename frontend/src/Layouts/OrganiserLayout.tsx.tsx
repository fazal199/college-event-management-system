import GridMainContent from '@/components/shared/GridMainContent'
import Sidebar from '@/components/shared/Sidebar'
import { useOrganiser } from '@/hooks/auth.hooks'
import { NavigationLink } from '@/types'
import { Book, CircleUserRound, SquarePlus } from 'lucide-react'
import { Outlet } from 'react-router-dom'


const OrganiserLayout = () => {

  useOrganiser();
  
  const sidebarItems:Array<NavigationLink> = [

     {
       text : "Your Events",
       link: "/manage-events/yourevents",
       icon: <Book />,
     },
     {
       text : "Create Event",
       link: "/manage-events/createevents",
       icon: <SquarePlus />
     },
     {
       text : "Profile",
       link: "/manage-events/profile",
       icon: <CircleUserRound />
     },
  ]

 

  return (

    <GridMainContent>
      <Sidebar sidebarItems={sidebarItems}/>
      <div>
        <Outlet/>
      </div>
    </GridMainContent>

  )
}

export default OrganiserLayout
