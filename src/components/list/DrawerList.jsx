import React from "react";
import { Link } from "react-router-dom";

const DrawerList = () => {
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
      pageLink: "/",
    },
    {
      title: "Wesprzyj nas",
      pageLink: "/support-us",
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
    </ul>
  );
};

export default DrawerList;
