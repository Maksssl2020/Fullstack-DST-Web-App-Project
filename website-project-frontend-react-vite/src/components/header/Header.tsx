import BellIcon from "../../icons/BellIcon.jsx";
import UserIcon from "../../icons/UserIcon.jsx";
import LeftDrawer from "../drawer/LeftDrawer.jsx";
import MainBannerWithLogo from "../universal/MainBannerWithLogo.jsx";
import React, { useEffect } from "react";
import RightDrawer from "../drawer/RightDrawer.jsx";
import { Link, useLocation, useNavigate } from "react-router-dom";
import ShoppingBagIcon from "../../icons/ShoppingBagIcon.jsx";
import CartDrawer from "../drawer/CartDrawer.jsx";
import { getCartIdForNonRegisterUser } from "../../helpers/NonRegisteredUserCartId.js";
import Spinner from "../universal/Spinner.jsx";
import Badge from "../badge/Badge.jsx";
import useCartAmountOfItems from "../../hooks/queries/useCartAmountOfItems.js";
import useAmountOfUserNewNotifications from "../../hooks/queries/useAmountOfUserNewNotifications.js";
import useAuthentication from "../../hooks/others/useAuthentication.js";
import HeartIcon from "../../icons/HeartIcon.jsx";
import useAmountOfUserFavouriteItems from "../../hooks/queries/useAmountOfUserFavouriteItems.js";

const Header = ({ forumAddPostButton }) => {
  const { userId, isAuthenticated } = useAuthentication();
  const [isRightDataDrawerOpen, setIsRightDataDrawerOpen] =
    React.useState(false);
  const [isCartDrawerOpen, setIsCartDrawerOpen] = React.useState(false);
  const [cartIdentifier, setCartIdentifier] = React.useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const { amountOfCartItems, fetchingAmountOfCartItems } =
    useCartAmountOfItems(cartIdentifier);
  const { amountOfUserNewNotifications, fetchingAmountOfUserNewNotifications } =
    useAmountOfUserNewNotifications();
  const { amountOfUserFavouriteItems, fetchingAmountOfUserFavouriteItems } =
    useAmountOfUserFavouriteItems();

  useEffect(() => {
    if (isAuthenticated) {
      setCartIdentifier(`${userId}`);
    } else {
      setCartIdentifier(getCartIdForNonRegisterUser());
    }
  }, [isAuthenticated, userId]);

  const toggleRightDrawer = () => {
    setIsRightDataDrawerOpen(!isRightDataDrawerOpen);
  };

  const toggleCartDrawer = () => {
    setIsCartDrawerOpen(!isCartDrawerOpen);
  };

  const headerNavigationData = [
    {
      name: "O nas",
      link: "/about-us",
    },
    {
      name: "Kontakt",
      link: "/contact-us",
    },
    {
      name: "Sklep",
      link: "/rainbow-shop",
    },
    {
      name: "Strona główna",
      link: "/",
    },
  ];

  const getHeaderItemsDependsOnLocation = () => {
    const commonItems = [headerNavigationData[1], headerNavigationData[2]];

    switch (location.pathname) {
      case "/support-us": {
        return [headerNavigationData[3], ...commonItems];
      }
      case "/news": {
        return [headerNavigationData[3], ...commonItems];
      }
      case "/forum": {
        return [];
      }
      default: {
        return [headerNavigationData[0], ...commonItems];
      }
    }
  };

  if (
    fetchingAmountOfCartItems ||
    fetchingAmountOfUserNewNotifications ||
    fetchingAmountOfUserFavouriteItems
  ) {
    return <Spinner />;
  }

  return (
    <header className="static-border-gradient flex h-[125px] w-full pl-4">
      <div className="flex w-full items-center">
        <LeftDrawer />
        <MainBannerWithLogo
          imageContainerClassName={
            "max-sm:size-[50px] max-md:size-[50px] max-lg:size-[55px] max-xl:size-[50px] xl:size-[75px]"
          }
          mainContainerClassName={
            "max-sm:min-w-[60px] max-sm:size-[60px] max-md:min-w-[300px] max-lg:min-w-[350px] max-xl:w-[350px] xl:w-[450px]"
          }
          textClassName={"max-sm:hidden"}
        />
        <div
          className={`relative ml-auto flex h-[125px] items-center justify-center max-xl:w-[600px] lg:bg-header-background xl:w-[600px]`}
        >
          {location.pathname === "/forum" && forumAddPostButton}
          <div
            className={`flex h-[50px] items-center justify-center rounded-full bg-custom-gray-100 ${location.pathname === "/forum" ? "ml-auto mr-6 w-[150px]" : "ml-auto max-xl:mr-2 max-lg:mr-4 max-lg:w-[150px] max-sm:w-[100px] sm:justify-between lg:w-[550px] lg:justify-center"}`}
          >
            <ul className="flex list-inside list-disc gap-10 marker:text-lg marker:text-custom-gray-400 max-lg:hidden">
              {getHeaderItemsDependsOnLocation().map((data, index) => (
                <li key={index}>
                  <button onClick={() => navigate(data.link)}>
                    {data.name}
                  </button>
                </li>
              ))}
            </ul>
            <div
              className={`relative flex gap-4 ${location.pathname !== "/forum" && "sm:ml-8"}`}
            >
              {location.pathname.includes("/rainbow-shop") && (
                <>
                  <button
                    onClick={toggleCartDrawer}
                    className="relative rounded-full bg-white p-1"
                  >
                    <ShoppingBagIcon size={"size-6"} />

                    {amountOfCartItems > 0 && (
                      <Badge className="absolute inset-0 ml-auto flex size-4 -translate-y-1 translate-x-1 items-center justify-center rounded-full bg-custom-orange-200 text-[10px] text-white">
                        {amountOfCartItems}
                      </Badge>
                    )}
                  </button>
                  <button
                    onClick={() => navigate(`/favourite-products/${userId}`)}
                    className="relative flex rounded-full bg-white p-1"
                  >
                    <HeartIcon className={"size-6"} />

                    {amountOfUserFavouriteItems > 0 && (
                      <Badge className="absolute inset-0 ml-auto flex size-4 -translate-y-1 translate-x-1 items-center justify-center rounded-full bg-custom-orange-200 text-[10px] text-white">
                        {amountOfUserFavouriteItems}
                      </Badge>
                    )}
                  </button>
                </>
              )}
              {!location.pathname.includes("rainbow-shop") && (
                <div className="relative flex gap-4">
                  <Link
                    className={"relative rounded-full bg-white p-1"}
                    disabled={!isAuthenticated}
                    to={"/account"}
                  >
                    <BellIcon className={"max-sm:size-4 sm:size-6"} />
                  </Link>

                  {amountOfUserNewNotifications > 0 && (
                    <Badge className="absolute inset-0 ml-auto flex size-4 -translate-y-1 translate-x-1 items-center justify-center rounded-full bg-custom-orange-200 text-[10px] text-white">
                      {amountOfUserNewNotifications}
                    </Badge>
                  )}
                </div>
              )}
              <button
                onClick={toggleRightDrawer}
                className="flex items-center justify-center rounded-full bg-white p-1"
              >
                <UserIcon size={"max-sm:size-4 sm:size-6"} />
              </button>
            </div>
          </div>
        </div>
        <CartDrawer
          isOpen={isCartDrawerOpen}
          closeFunction={toggleCartDrawer}
        />
        <RightDrawer
          isOpen={isRightDataDrawerOpen}
          closeDrawer={toggleRightDrawer}
        />
      </div>
    </header>
  );
};

export default Header;
