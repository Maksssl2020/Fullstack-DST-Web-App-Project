import { BrowserRouter, Route, Routes } from "react-router-dom";
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
import AccountActivation from "../src/pages/AccountActivation";
import UsersRequests from "../src/pages/UsersRequests";
import Articles from "./pages/Articles.jsx";
import ProtectedRouteAdmin from "./router/ProtectedRouteAdmin.jsx";
import ProtectedRouteAuthenticatedUser from "./router/ProtectedRouteAuthenticatedUser.jsx";
import UserOrdersPage from "./pages/UserOrdersPage.jsx";
import UserFavouriteProducts from "./pages/UserFavouriteProducts.jsx";
import NotFound from "./errors/NotFound.jsx";

function App() {
  return (
    <AnimatePresence mode={"wait"}>
      <BrowserRouter>
        <Routes>
          <Route path={"*"} element={<NotFound />} />
          <Route element={<ApplicationLayout />}>
            <Route path={"/"} element={<Home />} />
            <Route path={"/support-us"} element={<SupportUs />} />
            <Route path={"/news"} element={<News />} />
            <Route path={"/about-us"} element={<AboutUs />} />
            <Route path={"/contact-us"} element={<ContactUs />} />
            <Route path={"/rainbow-shop"} element={<RainbowShop />} />
            <Route
              path={"/rainbow-shop/products/:id/:title"}
              element={<ShopProductPage />}
            />
            <Route path={"/sign-up"} element={<SignUp />} />
            <Route path={"/sign-in"} element={<SignIn />} />
            <Route path={"/activate-account"} element={<AccountActivation />} />
            <Route path={"/forum"} element={<Forum />} />
            <Route path={"/article/:id"} element={<Article />} />
            <Route
              path={"/rainbow-shop/cart/:identifier"}
              element={<CartPage />}
            />
            <Route
              path={"/rainbow-shop/place-an-order/:cartIdentifier"}
              element={<PlaceAnOrder />}
            />
            <Route path={"/payment-success"} element={<PaymentSuccess />} />

            <Route element={<ProtectedRouteAuthenticatedUser />}>
              <Route path={"/account"} element={<Account />} />
              <Route path={"/forum/create-post"} element={<ForumPostForm />} />
              <Route
                path={"/forum/edit-post/:id"}
                element={<ForumPostForm isEditing={true} />}
              />
              <Route path={"/events"} element={<Events />} />
              <Route path={"/my-order/:orderId"} element={<OrderPage />} />
              <Route path={"/my-orders/:userId"} element={<UserOrdersPage />} />
              <Route
                path={"/favourite-products/:userId"}
                element={<UserFavouriteProducts />}
              />
            </Route>

            <Route element={<ProtectedRouteAdmin />}>
              <Route
                path={"/home-news/add-post"}
                element={<HomeNewsPostForm />}
              />
              <Route
                path={"/home-news/edit-post/:id"}
                element={<HomeNewsPostForm isEditing={true} />}
              />
              <Route path={"/news/add-post"} element={<NewsPostForm />} />
              <Route path={"/news/edit-post/:id"} element={<NewsPostForm />} />
              <Route path={"/account"} element={<Account />} />
              <Route
                path={"/rainbow-shop/products/admin-options/:type/add"}
                element={<ProductForm />}
              />
              <Route
                path={"/rainbow-shop/products/admin-options/:type/edit/:id"}
                element={<ProductForm isEditing={true} />}
              />
              <Route path={"/article/add-article"} element={<ArticleForm />} />
              <Route
                path={"/article/edit-article/:id"}
                element={<ArticleForm isEditing={true} />}
              />
              <Route path={"/articles"} element={<Articles />} />
              <Route path={"/events/add-event"} element={<EventForm />} />
              <Route path={"/users"} element={<Users />} />
              <Route
                path={"/users/check-user/:userId"}
                element={<UserAccountAdminView />}
              />
              <Route
                path={"/users/create-message/:userId/:user"}
                element={<MessageForm />}
              />
              <Route path={"/change-statistics"} element={<StatisticsForm />} />
              <Route
                path={"/rainbow-shop/create-discount-code"}
                element={<DiscountCodeForm />}
              />
              <Route
                path={"/rainbow-shop/discount-codes"}
                element={<DiscountCodes />}
              />
              <Route path={"/orders"} element={<Orders />} />
              <Route path={"/orders/:orderId"} element={<OrderPage />} />
              <Route path={"/users/requests"} element={<UsersRequests />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </AnimatePresence>
  );
}

export default App;
