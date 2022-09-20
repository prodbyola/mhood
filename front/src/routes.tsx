import { createBrowserRouter } from "react-router-dom";
import SignIn from './pages/SignIn'
import Dashboard from './pages/dashboard/Dashboard'
import DashboardOverview from "./pages/dashboard/Overview";
import CreateCampaign from "./pages/dashboard/CreateCampaign";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <SignIn></SignIn>
    },
    {
        path: '/dashboard',
        element: <Dashboard />,
        children: [
            {
                path: 'overview',
                element: <DashboardOverview />
            },
            {
                path: 'campaigns/create',
                element: <CreateCampaign />
            },
        ]
    }
]) 