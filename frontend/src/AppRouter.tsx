import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";
import HomePage from "./pages/RootPages/HomePage.tsx";
import RootLayout from "./Layouts/RootLayout";
import SigninPage from "./pages/AuthPages/SigninPage.tsx";
import SignupPage from "./pages/AuthPages/SignupPage.tsx";
import NotFound from "./components/shared/NotFound.tsx"
import OrganiserDashboard from "./Layouts/OrganiserLayout.tsx.tsx";
import OrgEvents from "./pages/OrganiserDashboard/OrgEventsPage.tsx";
import OrganiserProfile from "./pages/OrganiserDashboard/OrganiserProfilePage.tsx";
import CreateEvents from "./pages/OrganiserDashboard/CreateEventPage.tsx";
import EditEventPage from "./pages/OrganiserDashboard/EventInformationPage.tsx";
import AdminLayout from "./Layouts/AdminLayout.tsx";
import DashboardPage from "./pages/AdminDashboardPages/DashboardPage.tsx";
import ManageUsersPage from "./pages/AdminDashboardPages/ManageUsersPage.tsx";
import OrgRequestsPage from "./pages/AdminDashboardPages/OrgRequestsPage.tsx";
import CancelEventPage from "./pages/AdminDashboardPages/CancelEventPage.tsx";
import MangeCategoriesPage from "./pages/AdminDashboardPages/MangeCategoriesPage.tsx";
import ManageLanguagesPages from "./pages/AdminDashboardPages/ManageLanguages.tsx";
import EventCancelDetailPage from "./pages/AdminDashboardPages/EventCancelDetailPage.tsx";
import OrganiserInfo from "./pages/AdminDashboardPages/OrganiserInfoPage.tsx";
import AllEventsPage from "./pages/AdminDashboardPages/AllEventsPage.tsx";
import EventDetailInformationPage from "./pages/AdminDashboardPages/EventMainDetailsPage.tsx";
import Error500 from "./components/shared/Error500.tsx";
import EventsPage from "./pages/RootPages/EventsPage.tsx";
import EventDetailsPage from "./pages/RootPages/EventDetailsPage.tsx";
import UserEventsPage from "./pages/UserPages/UserEventsPage.tsx";
import JoinEventDetailPage from "./pages/UserPages/JoinEventDetailPage.tsx";
import EventTicketPage from "./pages/UserPages/EventTicketPage.tsx";
import AboutPage from "./pages/RootPages/AboutPage.tsx";



const router = createBrowserRouter(
    createRoutesFromElements(
        <>
            <Route path="/" element={<RootLayout />}>
                <Route path="" element={<HomePage />} />
                <Route path="about" element={<AboutPage />} />
                <Route path="events" element={<EventsPage />} />
                <Route path="myevents" element={<UserEventsPage />} />
                <Route path="myevents/event/:eventId" element={<JoinEventDetailPage />} />
                <Route path="events/event/:eventId" element={<EventDetailsPage />} />
                <Route path="auth/signin" element={<SigninPage />} />
                <Route path="auth/signup" element={<SignupPage />} />

                <Route path="manage-events/" element={<OrganiserDashboard />}>
                    <Route path="yourevents" element={<OrgEvents />} />
                    <Route path="profile" element={<OrganiserProfile />} />
                    <Route path="createevents" element={<CreateEvents />} />
                    <Route path="editevent/:eventId" element={<EditEventPage />} />
                </Route>
                <Route path="admin/" element={<AdminLayout />}>
                    <Route path="dashboard" element={<DashboardPage />} />
                    <Route path="events" element={<AllEventsPage />} />
                    <Route path="events/:eventId" element={<EventDetailInformationPage />} />
                    <Route path="users" element={<ManageUsersPage />} />
                    <Route path="requests" element={<OrgRequestsPage />} />
                    <Route path="orginfo/:userId" element={<OrganiserInfo />} />
                    <Route path="cancelrequests" element={<CancelEventPage />} />
                    <Route path="cancelrequests/:eventId" element={< EventCancelDetailPage />} />
                    <Route path="categories" element={<MangeCategoriesPage />} />
                    <Route path="languages" element={<ManageLanguagesPages />} />

                </Route>
            </Route>
            <Route path="event/ticket/:eventId" element={<EventTicketPage />} />


            <Route path="500" element={<Error500 />} />
            <Route path="*" element={<NotFound />} />
        </>
    )
);

export default router;