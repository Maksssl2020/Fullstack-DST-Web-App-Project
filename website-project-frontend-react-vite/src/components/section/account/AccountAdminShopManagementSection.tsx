import React from "react";
import AdminManagementOptionButton from "../../button/AdminManagementOptionButton.jsx";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const AccountAdminShopManagementSection = () => {
  const navigate = useNavigate();

  const manageShopData = [
    {
      functionName: "Dodaj:",
      mainContent: "ubranie",
      onClickFunction: () =>
        navigate("/rainbow-shop/products/admin-options/clothes/add"),
    },
    {
      functionName: "Dodaj:",
      mainContent: "długopis",
      onClickFunction: () =>
        navigate("/rainbow-shop/products/admin-options/pens/add"),
    },
    {
      functionName: "Dodaj:",
      mainContent: "kubek",
      onClickFunction: () =>
        navigate("/rainbow-shop/products/admin-options/mugs/add"),
    },
    {
      functionName: "Dodaj:",
      mainContent: "gadżet",
      onClickFunction: () =>
        navigate("/rainbow-shop/products/admin-options/gadgets/add"),
    },
    {
      functionName: "Dodaj:",
      mainContent: "kod rabatowy",
      onClickFunction: () => navigate("/rainbow-shop/create-discount-code"),
    },
    {
      functionName: "Sprawdź:",
      mainContent: "kody rabatowe",
      onClickFunction: () => navigate("/rainbow-shop/discount-codes"),
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
      className="w-full bg-custom-pink-100 rounded-2xl h-auto flex flex-col"
    >
      <div className="w-full italic h-[100px] text-5xl text-white font-bold rounded-2xl bg-custom-orange-200 flex justify-center items-center">
        Zarządzanie Sklepem
      </div>
      <div className="w-full h-auto text-xl justify-items-center max-md:flex max-md:flex-col max-md:p-2 md:grid md:grid-rows-4 md:grid-cols-2 md:p-6 gap-6">
        {manageShopData.map((data, index) => (
          <AdminManagementOptionButton
            onClick={data.onClickFunction}
            key={index}
          >
            {data.functionName}
            <span className="ml-2 uppercase text-custom-pink-200">{`${data.mainContent}`}</span>
          </AdminManagementOptionButton>
        ))}
      </div>
    </motion.div>
  );
};

export default AccountAdminShopManagementSection;
