
import { NavLink } from 'react-router-dom'
import { NavigationLink } from "../../types/index"

type SidebarProps = {
    sidebarItems: Array<NavigationLink>
}

const Sidebar = ({ sidebarItems = [] }: SidebarProps) => {
    return (
        <aside className="flex-col hidden pt-8 border-2 shadow-md min-h-[83vh] shadow-secondary border-primary sm:flex">

            <nav className="flex flex-col h-full px-8 space-y-3 text-lg font-semibold">
                {sidebarItems.map((item: NavigationLink) => (
                    <NavLink
                    key={item.link}
                    to={item.link}
                    className={({ isActive }) => `flex items-center rounded-md px-3 py-2 transition-colors ${isActive && 'bg-primary/70'} active:bg-primary bg-muted`}
                >
                    {item.icon}
                    <span className='ml-2'>{item.text}</span>
                </NavLink>))}
            </nav>
        </aside>
    )
}

export default Sidebar