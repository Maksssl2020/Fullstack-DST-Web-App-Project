import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../helpers/provider/AuthProvider.jsx";

const DrawerList = () => {
  const { role, isAuthenticated, userId } = useContext(AuthContext);

  const drawerListData = [
    {
      title: "Strona główna",
      pageLink: "/",
    },
    {
      title: "O nas",
      pageLink: "/about-us",
    },
    {
      title: "Tęczowy sklepik",
      pageLink: "/rainbow-shop",
    },
    {
      title: "Altualności",
      pageLink: "/news",
    },
    {
      title: "Konto",
      pageLink: "/account",
    },
    {
      title: "Forum",
      pageLink: "/forum",
    },
    {
      title: "Kontakt",
      pageLink: "/contact-us",
    },
    {
      title: "Wesprzyj nas",
      pageLink: "/support-us",
    },
    {
      title: "Wydarzenia",
      pageLink: "/events",
    },
  ];

  return (
    <ul className="gap-3 text-2xl flex flex-col px-4">
      {drawerListData.map((item, index) => (
        <Link to={item.pageLink}>
          <li
            className="py-2 rounded-lg bg-custom-gray-100 w-full px-8"
            key={index}
          >
            {item.title}
          </li>
        </Link>
      ))}
      {role === "ADMIN" && (
        <>
          <Link to={"/users"}>
            <li className="py-2 rounded-lg bg-custom-gray-100 w-full px-8">
              {"Użytkownicy"}
            </li>
          </Link>
          <Link to={"/orders"}>
            <li className="py-2 rounded-lg bg-custom-gray-100 w-full px-8">
              {"Zamówienia"}
            </li>
          </Link>
          <Link to={"/users/requests"}>
            <li className="py-2 rounded-lg bg-custom-gray-100 w-full px-8">
              {"Prośby Użytkowników"}
            </li>
          </Link>
        </>
      )}
      {role !== "ADMIN" && isAuthenticated && (
        <Link to={`/my-orders/${userId}`}>
          <li className="py-2 rounded-lg bg-custom-gray-100 w-full px-8">
            {"Moje zamówienia"}
          </li>
        </Link>
      )}
    </ul>
  );
};

export default DrawerList;
