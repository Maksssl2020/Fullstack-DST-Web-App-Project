import React from "react";
import AdminManagementOptionButton from "../../button/AdminManagementOptionButton.jsx";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const AccountAdminWebsiteManagementSection = () => {
  const navigate = useNavigate();

  const manageSiteData = [
    {
      name: "Swtórz nowy",
      boldContent: "artykuł",
      onClick: () => navigate("/article/add-article"),
    },
    {
      name: "Edytuj",
      boldContent: "dane o kwartałach",
      onClick: () => navigate("/change-statistics"),
    },
    {
      name: "Swtórz nowe",
      boldContent: "wydarzenie",
      onClick: () => navigate("/events/add-event"),
    },
    {
      name: "Edytuj",
      boldContent: "dane o kwartałach",
      onClick: () => navigate("/change-statistics"),
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
      className="w-full bg-custom-pink-100 rounded-2xl h-auto"
    >
      <div className="w-full italic h-[100px] text-5xl text-white font-bold rounded-2xl bg-custom-orange-200 flex justify-center items-center">
        Zarządzanie Stroną
      </div>
      <div className="w-full h-auto text-xl justify-items-center md:grid md:grid-rows-2 md:grid-cols-2 max-md:p-2 md:p-6 gap-6 max-md:flex max-md:flex-col">
        {manageSiteData.map((data, index) => (
          <AdminManagementOptionButton onClick={data.onClick} key={index}>
            {data.name}&nbsp;
            <span className="font-bold">{data.boldContent}</span>
          </AdminManagementOptionButton>
        ))}
      </div>
    </motion.div>
  );
};

export default AccountAdminWebsiteManagementSection;
