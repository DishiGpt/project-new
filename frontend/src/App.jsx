import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { USER_API_END_POINT } from './utils/constant'
import { setUser } from './redux/authSlice'
import Navbar from './components/shared/Navbar'
import Login from './components/auth/Login'
import Signup from './components/auth/Signup'
import Home from './components/Home'
import Jobs from './components/Jobs'
import Browse from './components/Browse'
import Profile from './components/Profile'
import ProtectedUserRoute from './components/ProtectedUserRoute'
import JobDescription from './components/JobDescription'
import SavedJobs from './components/SavedJobs'
import Companies from './components/admin/Companies'
import CompanyCreate from './components/admin/CompanyCreate'
import CompanySetup from './components/admin/CompanySetup'
import AdminJobs from "./components/admin/AdminJobs";
import PostJob from './components/admin/PostJob'
import Applicants from './components/admin/Applicants'
import ProtectedRoute from './components/admin/ProtectedRoute'

// Layout component that includes Navbar and renders child routes
// This ensures Navbar is inside the router context so useNavigate() works
const Layout = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    // Check if user is already logged in on app load
    const checkAuth = async () => {
      try {
        const res = await axios.get(`${USER_API_END_POINT}/profile`, {
          withCredentials: true
        });
        if (res.data.success) {
          dispatch(setUser(res.data.user));
        }
      } catch (error) {
        // User not authenticated, keep user as null
        console.log("Not authenticated");
      }
    };
    checkAuth();
  }, [dispatch]);

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
      <Navbar />
      <main className="pb-16">
        <Outlet />
      </main>
    </div>
  )
}

const appRouter = createBrowserRouter([
  {
    // Root layout wraps all routes with Navbar
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <Home />
      },
      {
        path: '/login',
        element: <Login />
      },
      {
        path: '/signup',
        element: <Signup />
      },
      {
        path: "/jobs",
        element: <Jobs />
      },
      {
        path: "/description/:id",
        element: <JobDescription />
      },
      {
        path: "/browse",
        element: <Browse />
      },
      {
        path: "/saved-jobs",
        element: <SavedJobs />
      },
      {
        path: "/profile",
        element: <ProtectedUserRoute><Profile /></ProtectedUserRoute>
      },
      // Admin routes
      {
        path:"/admin/companies",
        element: <ProtectedRoute><Companies/></ProtectedRoute>
      },
      {
        path:"/admin/companies/create",
        element: <ProtectedRoute><CompanyCreate/></ProtectedRoute> 
      },
      {
        path:"/admin/companies/:id",
        element:<ProtectedRoute><CompanySetup/></ProtectedRoute> 
      },
      {
        path:"/admin/jobs",
        element:<ProtectedRoute><AdminJobs/></ProtectedRoute> 
      },
      {
        path:"/admin/jobs/create",
        element:<ProtectedRoute><PostJob/></ProtectedRoute> 
      },
      {
        path:"/admin/jobs/:id/applicants",
        element:<ProtectedRoute><Applicants/></ProtectedRoute> 
      },
    ]
  }
])

function App() {
  return <RouterProvider router={appRouter} />
}

export default App
