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
import Forum from "./pages/Forum";
import ForumPostForm from "./pages/forms/ForumPostForm";
import ContactUs from "./pages/ContactUs";
import ShopProductPage from "./pages/ShopProductPage";
import NewsPostForm from "./pages/forms/NewsPostForm";
import HomeNewsPostForm from "./pages/forms/HomeNewsPostForm";
import ProductForm from "./pages/forms/ProductForm";
import { AnimatePresence } from "framer-motion";
import Article from "./pages/Article";
import ArticleForm from "./pages/forms/ArticleForm";
import CartPage from "./pages/CartPage";
import Events from "./pages/Events";
import EventForm from "./pages/forms/EventForm";
import React from "react";
import Users from "./pages/Users";
import UserAccountAdminView from "./pages/UserAccountAdminView";
import MessageForm from "./pages/forms/MessageForm";
import StatisticsForm from "./pages/forms/StatisticsForm";
import DiscountCodeForm from "./pages/forms/DiscountCodeForm";
import DiscountCodes from "./pages/DiscountCodes";
import PlaceAnOrder from "./pages/PlaceAnOrder";
import PaymentSuccess from "./pages/PaymentSuccess";
import OrderPage from "./pages/OrderPage";
import Orders from "./pages/Orders";
import UserOrdersPage from "./pages/UserOrdersPage";
import AccountActivation from "./pages/AccountActivation";
import UsersRequests from "./pages/UsersRequests";

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
          path: "/home-news/add-post",
          element: <HomeNewsPostForm />,
        },
        {
          path: "/home-news/edit-post/:id",
          element: <HomeNewsPostForm />,
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
          path: "/news/add-post",
          element: <NewsPostForm />,
        },
        {
          path: "/news/edit-post/:id",
          element: <NewsPostForm />,
        },
        {
          path: "/about-us",
          element: <AboutUs />,
        },
        {
          path: "/rainbow-shop",
          element: <RainbowShop />,
        },
        {
          path: `/rainbow-shop/products/:id/:title`,
          element: <ShopProductPage />,
        },
        {
          path: "/rainbow-shop/cart/:identifier",
          element: <CartPage />,
        },
        {
          path: "/rainbow-shop/products/admin-options/:type/add",
          element: <ProductForm />,
        },
        {
          path: "/rainbow-shop/products/admin-options/:type/edit/:id",
          element: <ProductForm />,
        },
        {
          path: "/sign-up",
          element: <SignUp />,
        },
        {
          path: "/activate-account",
          element: <AccountActivation />,
        },
        {
          path: "/sign-in",
          element: <SignIn />,
        },
        {
          path: "/forum",
          element: <Forum />,
        },
        {
          path: "/forum/create-post",
          element: <ForumPostForm />,
        },
        {
          path: "/forum/edit-post/:id",
          element: <ForumPostForm />,
        },
        {
          path: "/contact-us",
          element: <ContactUs />,
        },
        {
          path: "/article/:id",
          element: <Article />,
        },
        {
          path: "/article/add-article",
          element: <ArticleForm />,
        },
        {
          path: "/events",
          element: <Events />,
        },
        {
          path: "/events/add-event",
          element: <EventForm />,
        },
        {
          path: "/users",
          element: <Users />,
        },
        {
          path: "/users/check-user/:userId",
          element: <UserAccountAdminView />,
        },
        {
          path: "/users/create-message/:userId/:user",
          element: <MessageForm />,
        },
        {
          path: "/change-statistics",
          element: <StatisticsForm />,
        },
        {
          path: "/rainbow-shop/create-discount-code",
          element: <DiscountCodeForm />,
        },
        {
          path: "/rainbow-shop/discount-codes",
          element: <DiscountCodes />,
        },
        {
          path: "/rainbow-shop/place-an-order/:cartIdentifier",
          element: <PlaceAnOrder />,
        },
        {
          path: "/payment-success",
          element: <PaymentSuccess />,
        },
        {
          path: "/orders",
          element: <Orders />,
        },
        {
          path: "/orders/:orderId",
          element: <OrderPage />,
        },
        {
          path: "/my-orders/:userId",
          element: <UserOrdersPage />,
        },
        {
          path: "/users/requests",
          element: <UsersRequests />,
        },
      ],
    },
  ]);

  return (
    <AnimatePresence mode={"wait"}>
      <RouterProvider router={router} />
    </AnimatePresence>
  );
}

export default App;
