import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ApplicationLayout from "./layout/ApplicationLayout.jsx";
import Home from "./pages/Home.jsx";
import Account from "./pages/Account";
import SupportUs from "./pages/SupportUs";
import News from "./pages/News";
import AboutUs from "./pages/AboutUs";
import RainbowShop from "./pages/RainbowShop";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";

function App() {
  const router = createBrowserRouter([
    {
      element: <ApplicationLayout />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/account",
          element: <Account />,
        },
        {
          path: "/support-us",
          element: <SupportUs />,
        },
        {
          path: "/news",
          element: <News />,
        },
        {
          path: "/about-us",
          element: <AboutUs />,
        },
        {
          path: "rainbow-shop",
          element: <RainbowShop />,
        },
        {
          path: "/sign-up",
          element: <SignUp />,
        },
        {
          path: "/sign-in",
          element: <SignIn />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
