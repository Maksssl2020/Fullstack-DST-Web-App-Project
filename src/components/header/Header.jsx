import BellIcon from "./icons/BellIcon.jsx";
import UserIcon from "./icons/UserIcon.jsx";
import LeftDrawer from "../drawer/LeftDrawer";
import MainBannerWithLogo from "../universal/MainBannerWithLogo";
import React, { useContext, useEffect, useState } from "react";
import RightDrawer from "../drawer/RightDrawer";
import { Link, useLocation, useNavigate } from "react-router-dom";
import ShoppingBagIcon from "../../icons/ShoppingBagIcon";
import CartDrawer from "../drawer/CartDrawer";
import { useQuery } from "react-query";
import {
  getShoppingCartAmountOfItems,
  getShoppingCartId,
} from "../../helpers/api-integration/ShoppingCartHandling";
import { AuthContext } from "../../helpers/provider/AuthProvider";
import { getCartIdForNonRegisterUser } from "../../helpers/NonRegisteredUserCartId";
import Spinner from "../universal/Spinner";
import Badge from "../badge/Badge";
import { fetchAmountOfNonReadUserNotifications } from "../../helpers/api-integration/NotificationsHandling";

const Header = ({ forumAddPostButton }) => {
  const { userId, username, role, isAuthenticated } = useContext(AuthContext);
  const [isRightDataDrawerOpen, setIsRightDataDrawerOpen] =
    React.useState(false);
  const [isCartDrawerOpen, setIsCartDrawerOpen] = React.useState(false);
  const [cartIdentifier, setCartIdentifier] = React.useState("");
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (isAuthenticated) {
      setCartIdentifier(username);
    } else {
      setCartIdentifier(getCartIdForNonRegisterUser);
    }
  }, [isAuthenticated, username]);

  const { data: cartId, isLoading: fetchingCartId } = useQuery(
    ["cartHeaderId", cartIdentifier],
    () => getShoppingCartId(cartIdentifier),
    {
      enabled: location.pathname.includes("/rainbow-shop") === true,
    },
  );

  const { data: amountOfItemsInCart, isLoading: fetchingAmountOfItemsInCart } =
    useQuery(
      ["amountOfItemsInCart", cartIdentifier],
      () => getShoppingCartAmountOfItems(cartId),
      {
        enabled: location.pathname.includes("/rainbow-shop") === true,
      },
    );

  const {
    data: amountOfNonReadUserNotifications,
    isLoading: fetchingAmountOfNonReadUserNotifications,
  } = useQuery(
    ["amountOfNonReadUserNotifications", userId],
    () => fetchAmountOfNonReadUserNotifications(userId),
    {
      enabled: isAuthenticated !== false && role !== "ADMIN",
    },
  );

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
    fetchingCartId ||
    fetchingAmountOfItemsInCart ||
    fetchingAmountOfNonReadUserNotifications
  ) {
    return <Spinner />;
  }

  return (
    <header className="flex h-[125px] pl-4 w-full border-0 border-violet-700">
      <div className="flex w-full items-center">
        <LeftDrawer />
        <MainBannerWithLogo
          imageContainerStyling={"max-xl:size-[50px] xl:size-[75px]"}
          mainContainerStyling={"max-xl:w-[350px] xl:w-[450px]"}
        />
        <div
          className={`ml-auto flex h-[125px] max-xl:w-[450px] xl:w-[600px] relative items-center justify-center bg-header-background`}
        >
          {location.pathname === "/forum" && forumAddPostButton}
          <div
            className={`flex h-[50px] translate-x-4 items-center justify-center rounded-full bg-custom-gray-100 ${location.pathname === "/forum" ? "w-[150px] ml-auto mr-6" : " max-xl:w-[400px] xl:w-[550px]"}`}
          >
            <ul className="flex gap-10 list-disc list-inside marker:text-lg marker:text-custom-gray-400">
              {getHeaderItemsDependsOnLocation().map((data, index) => (
                <li>
                  <button onClick={() => navigate(data.link)}>
                    {data.name}
                  </button>
                </li>
              ))}
            </ul>
            <div
              className={`relative flex gap-4 ${location.pathname !== "/forum" && "ml-8"}`}
            >
              {location.pathname.includes("/rainbow-shop") && (
                <button
                  onClick={toggleCartDrawer}
                  className="rounded-full bg-white p-1 relative"
                >
                  <ShoppingBagIcon size={"size-6"} />

                  {amountOfItemsInCart > 0 && (
                    <Badge className="bg-custom-orange-200 text-white flex justify-center items-center text-[10px] size-4 absolute inset-0 ml-auto translate-x-1 -translate-y-1 rounded-full">
                      {amountOfItemsInCart}
                    </Badge>
                  )}
                </button>
              )}
              <div className="relative flex gap-4">
                <Link
                  className={"rounded-full bg-white p-1 relative"}
                  disabled={!isAuthenticated}
                  to={"/account"}
                >
                  <BellIcon />
                </Link>

                {amountOfNonReadUserNotifications > 0 && (
                  <Badge className="bg-custom-orange-200 text-white flex justify-center items-center text-[10px] size-4 absolute inset-0 ml-auto translate-x-1 -translate-y-1 rounded-full">
                    {amountOfNonReadUserNotifications}
                  </Badge>
                )}
              </div>
              <button
                onClick={toggleRightDrawer}
                className="flex items-center rounded-full bg-white p-1 justify-center"
              >
                <UserIcon size={"size-6"} />
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
