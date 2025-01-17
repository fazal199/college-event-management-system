import GridMainContent from '@/components/shared/GridMainContent'
import Sidebar from '@/components/shared/Sidebar'
import { useAdmin } from '@/hooks/auth.hooks'
import { NavigationLink } from '@/types'
import { BookPlus, CircleUserRound, Languages, SquareArrowOutUpRight, Ban, ChartNoAxesCombined, Book } from 'lucide-react'
import { Outlet } from 'react-router-dom'

const AdminLayout = () => {

    useAdmin();
    
    const sidebarItems: Array<NavigationLink> = [
        {
            text: "Dashboard",
            link: "/admin/dashboard",
            icon: <ChartNoAxesCombined />,
        },
        {
            text: "Events",
            link: "/admin/events",
            icon: <Book />,
        },
        {
            text: "Manage Users",
            link: "/admin/users",
            icon: <CircleUserRound />,
        },
        {
            text: "Org. Requests",
            link: "/admin/requests",
            icon: <SquareArrowOutUpRight />
        },
        {
            text: "Cancel Request (Event)",
            link: "/admin/cancelrequests",
            icon: <Ban />
        },
        {
            text: "Manage Categories",
            link: "/admin/categories",
            icon: <BookPlus />
        },
        {
            text: "Manage Languages",
            link: "/admin/languages",
            icon: <Languages />
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

export default AdminLayout
