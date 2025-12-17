import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import OwnerHomePage from "./pages/OwnerHomePage";

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
    path: "/owner-home",
    element: <OwnerHomePage />
  }
])

function App() {

  return (
    <RouterProvider router={route} />
  )
}

export default App
