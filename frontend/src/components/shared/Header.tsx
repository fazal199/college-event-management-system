
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { MountainIcon, Menu, Sun, Moon } from "lucide-react"
import { Link, NavLink, useNavigate } from "react-router-dom"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu"
import { useTheme } from "@/contexts/ThemeProvider"
import { NavigationLink } from "../../types/index"
import { useDispatch, useSelector } from "react-redux"
import { useMutation } from "react-query"
import { successAlert } from "@/lib/sweetalert/alerts"
import { checkForErrors } from "@/lib/utils"
import { getData } from "@/lib/react-query/apiFunctions"
import { useInternet } from "@/contexts/InterStatusWrapper"
import { makeAuthEmpty } from "@/lib/redux/slices/authSlice"

export default function Header() {

  const { setTheme } = useTheme();
  const role = useSelector((state: any) => state.auth?.userData?.data?.role);
  const isLogin = useSelector((state: any) => state.auth?.isLogin);
  const { isInterConnected } = useInternet();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const navMenus: Array<NavigationLink> = [
    {
      text: "Home",
      link: "/",
    },
    {
      text: "Events",
      link: "/events",
    },
    {
      text: "About",
      link: "/about",

    },

    {
      text: "Manage Events",
      link: "/manage-events/profile",
    },
    {
      text: "Admin",
      link: "/admin/dashboard",
    },
    {
      text: "Your Events",
      link: "/myevents",
    },

  ]

  //to make user logout
  const { mutate } = useMutation({
    mutationFn: getData,
    onSuccess: () => {
      successAlert({
        title: "Logout Successfully!",
        text: "You have successfully Loggedout!",
      })
      localStorage.removeItem("accessToken");

      dispatch(makeAuthEmpty());
      navigate("/");
    },
    onError: (error: any) => {
      checkForErrors(error?.response?.data, isInterConnected, "Something went wrong while Logging out the user! place:Header", error.message);
    }
  })


  return (
    <header className="w-full shadow-md py-2 shadow-secondary">
      <div className="container flex h-16 items-center justify-between px-4 md:px-6">
        <a href="#" className="flex items-center gap-2">
          <MountainIcon className="text-red-600" />
          <span className="text-lg font-bold text-secondary-foreground">Eventify</span>
        </a>
        <nav className="hidden md:flex">
          <ul className="flex items-center gap-8 text-lg font-semibold text-secondary-foreground">
            {navMenus.map((item: NavigationLink) => {


              //Your Events
              if (!isLogin && (item.text === "Manage Events" || item.text === "Admin" || item.text == "Your Events")) {
                // If nobody is logged in, don't show "Manage Events" or "Admin"

                return;
              }


              else if ((isLogin && role === "user") && (item.text === "Manage Events" || item.text === "Admin")) {
                // If a regular user is logged in, don't show "Manage Events" or "Admin"


                return;
              }


              else if ((isLogin && role === "organiser") && (item.text === "Admin" || item.text === "Your Events")) {
                // If an organiser is logged in, don't show "Admin" and "Your Events"

                return;
              }


              else if ((isLogin && role === "admin") && (item.text === "Manage Events" || item.text === "Your Events")) {
                // If an admin is logged in, don't show "Manage Events" and "Your Events"

                return;
              }


              return (
                <li key={item.link}>
                  <NavLink to={item.link} className={({ isActive }) => `transition-colors ${isActive && 'text-primary underline decoration-primary underline-offset-4 decoration-2'} hover:text-primary`} >
                    {item.text}
                  </NavLink>
                </li>
              )
            }
            )}

          </ul>
        </nav>

        <div className="flex items-center gap-4">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="md:hidden">
                <Menu className="text-foreground" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="md:hidden">
              <nav className="grid gap-6 text-lg font-medium text-primary-foreground">
                {navMenus.map(item => (
                  <div key={item.link}>
                    <NavLink

                      to={item.link}
                      className={({ isActive }) => `flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground ${isActive && 'text-primary underline decoration-primary underline-offset-4 decoration-2'}`}

                    >
                      {item.text}
                    </NavLink>
                  </div>
                ))}

              </nav>
            </SheetContent>
          </Sheet>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon">
                <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                <Moon className="absolute h-[1.2rem] w-[1.2rem] text-foreground rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                <span className="sr-only">Toggle theme</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setTheme("light")}>
                Light
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("dark")}>
                Dark
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("system")}>
                System
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Link className="hidden md:block" to={"/auth/signup"}>
            {!isLogin && <Button
              className=" rounded-md bg-primary px-4 py-2 text-sm text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
            >
              Sign Up
            </Button>}
          </Link>
          {!isLogin &&
            <Link className="hidden md:block" to={"/auth/signin"}>
              <Button
                variant="outline"
                className="rounded-md text-secondary-foreground bg-background px-4 py-2 text-sm shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
              >
                Log In
              </Button>
            </Link>
          }
          {isLogin && <Button onClick={() => mutate({ endpoint: "/api/auth/logout", headers: { Authorization: `Bearer ${localStorage.getItem("accessToken")}` } })}
            className=" rounded-md bg-primary px-4 py-2 text-sm text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
          >
            Logout
          </Button>}
        </div>
      </div>
    </header>
  )
}

