import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ApplicationLayout from "../src/layout/ApplicationLayout.jsx";
import Home from "../src/pages/Home.jsx";
import Account from "../src/pages/Account";
import SupportUs from "../src/pages/SupportUs";
import News from "../src/pages/News";
import AboutUs from "../src/pages/AboutUs";
import RainbowShop from "../src/pages/RainbowShop";
import SignIn from "../src/pages/SignIn";
import SignUp from "../src/pages/SignUp";
import Forum from "../src/pages/Forum";
import ForumPostForm from "../src/pages/forms/ForumPostForm";
import ContactUs from "../src/pages/ContactUs";
import ShopProductPage from "../src/pages/ShopProductPage";
import NewsPostForm from "../src/pages/forms/NewsPostForm";
import HomeNewsPostForm from "../src/pages/forms/HomeNewsPostForm";
import ProductForm from "../src/pages/forms/ProductForm";
import { AnimatePresence } from "framer-motion";
import Article from "../src/pages/Article";
import ArticleForm from "../src/pages/forms/ArticleForm";
import CartPage from "../src/pages/CartPage";
import Events from "../src/pages/Events";
import EventForm from "../src/pages/forms/EventForm";
import Users from "../src/pages/Users";
import UserAccountAdminView from "../src/pages/UserAccountAdminView";
import MessageForm from "../src/pages/forms/MessageForm";
import StatisticsForm from "../src/pages/forms/StatisticsForm";
import DiscountCodeForm from "../src/pages/forms/DiscountCodeForm";
import DiscountCodes from "../src/pages/DiscountCodes";
import PlaceAnOrder from "../src/pages/PlaceAnOrder";
import PaymentSuccess from "../src/pages/PaymentSuccess";
import OrderPage from "../src/pages/OrderPage";
import Orders from "../src/pages/Orders";
import UserOrdersPage from "../src/pages/UserOrdersPage";
import AccountActivation from "../src/pages/AccountActivation";
import UsersRequests from "../src/pages/UsersRequests";

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
        element: <HomeNewsPostForm isEditing={true} />,
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
        element: <ProductForm isEditing={true} />,
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
        element: <ForumPostForm isEditing={true} />,
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
        path: "/article/edit-article/:id",
        element: <ArticleForm isEditing={true} />,
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

function App() {
  return (
    <AnimatePresence mode={"wait"}>
      <RouterProvider router={router} />
    </AnimatePresence>
  );
}

export default App;
