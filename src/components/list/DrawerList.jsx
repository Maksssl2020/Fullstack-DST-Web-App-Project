import React from "react";

const DrawerList = () => {
  const drawerListData = [
    "Strona główna",
    "O nas",
    "Tęczowy sklepik",
    "Altualności",
    "Konto",
    "Forum",
    "Kontakt",
    "Wesprzyj nas",
  ];

  return (
    <ul className="gap-3 text-2xl flex flex-col px-4">
      {drawerListData.map((item, index) => (
        <li
          className="py-2 rounded-lg bg-custom-gray-100 w-full px-8"
          key={index}
        >
          {item}
        </li>
      ))}
    </ul>
  );
};

export default DrawerList;
