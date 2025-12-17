import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Signup from "./pages/Signup";
import Login from "./pages/Login";

const route = createBrowserRouter([
  {
    path: "/signup",
    element: <Signup />
  }, 
  {
    path: "/login",
    element: <Login />
  }
])

function App() {

  return (
    <RouterProvider router={route} />
  )
}

export default App
