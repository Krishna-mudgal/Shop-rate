import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import OwnerHomePage from "./pages/owner/OwnerHomePage";
import UserHome from "./pages/user/userHome";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminStores from "./pages/admin/AdminStores";
import AdminUsers from "./pages/admin/AdminUsers";
import AdminUserDetails from "./pages/admin/AdminUserDetails";
import AdminAddUser from "./pages/admin/AdminAddUser";
import AdminAddStore from "./pages/admin/AdminAddStores";

const route = createBrowserRouter([
  {
    path: "/signup",
    element: <Signup />
  },
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/owner",
    element: <OwnerHomePage />
  },
  {
    path: "/user",
    element: <UserHome />
  },
  {
    path: "/admin",
    element: <AdminDashboard />,
  },
  {
    path: "/admin/stores",
    element: <AdminStores />
  },
  {
    path: "/admin/users",
    element: <AdminUsers />
  },
  {
    path: "/admin/users/:id",
    element: <AdminUserDetails />
  },
  {
    path: "/admin/add-user",
    element: <AdminAddUser />
  },
  {
    path: "/admin/add-store",
    element: <AdminAddStore />
  }
])

function App() {

  return (
    <RouterProvider router={route} />
  )
}

export default App
