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
    <header className="flex h-[125px] pl-4 w-full static-border-gradient">
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
          className={`ml-auto flex h-[125px] max-xl:w-[600px] xl:w-[600px] relative items-center justify-center lg:bg-header-background`}
        >
          {location.pathname === "/forum" && forumAddPostButton}
          <div
            className={`flex h-[50px] items-center justify-center rounded-full bg-custom-gray-100 ${location.pathname === "/forum" ? "w-[150px] ml-auto mr-6" : "ml-auto max-sm:w-[100px] max-lg:w-[150px] max-lg:mr-4 max-xl:mr-2 sm:justify-between lg:justify-center xl:translate-x-4 lg:w-[550px]"}`}
          >
            <ul className="flex gap-10 list-disc list-inside max-lg:hidden marker:text-lg marker:text-custom-gray-400">
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
                    className="rounded-full bg-white p-1 relative"
                  >
                    <ShoppingBagIcon size={"size-6"} />

                    {amountOfCartItems > 0 && (
                      <Badge className="bg-custom-orange-200 text-white flex justify-center items-center text-[10px] size-4 absolute inset-0 ml-auto translate-x-1 -translate-y-1 rounded-full">
                        {amountOfCartItems}
                      </Badge>
                    )}
                  </button>
                  <button
                    onClick={() => navigate(`/favourite-products/${userId}`)}
                    className="rounded-full flex bg-white p-1 relative"
                  >
                    <HeartIcon className={"size-6"} />

                    {amountOfUserFavouriteItems > 0 && (
                      <Badge className="bg-custom-orange-200 text-white flex justify-center items-center text-[10px] size-4 absolute inset-0 ml-auto translate-x-1 -translate-y-1 rounded-full">
                        {amountOfUserFavouriteItems}
                      </Badge>
                    )}
                  </button>
                </>
              )}
              {!location.pathname.includes("rainbow-shop") && (
                <div className="relative flex gap-4">
                  <Link
                    className={"rounded-full bg-white p-1 relative"}
                    disabled={!isAuthenticated}
                    to={"/account"}
                  >
                    <BellIcon className={"max-sm:size-4 sm:size-6"} />
                  </Link>

                  {amountOfUserNewNotifications > 0 && (
                    <Badge className="bg-custom-orange-200 text-white flex justify-center items-center text-[10px] size-4 absolute inset-0 ml-auto translate-x-1 -translate-y-1 rounded-full">
                      {amountOfUserNewNotifications}
                    </Badge>
                  )}
                </div>
              )}
              <button
                onClick={toggleRightDrawer}
                className="flex items-center rounded-full bg-white p-1 justify-center"
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
          closeFunction={toggleRightDrawer}
        />
      </div>
    </header>
  );
};

export default Header;
