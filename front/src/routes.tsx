import { createBrowserRouter } from "react-router-dom";
import SignIn from './containers/SignIn'
import Dashboard from './containers/dashboard/Dashboard'

export const router = createBrowserRouter([
    {
        path: '/',
        element: <SignIn></SignIn>
    },
    {
        path: '/dashboard',
        element: <Dashboard></Dashboard>
    }
]) 