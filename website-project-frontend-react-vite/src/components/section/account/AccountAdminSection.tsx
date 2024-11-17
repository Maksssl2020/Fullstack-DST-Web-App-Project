import React, { useState } from "react";
import useAuthentication from "../../../hooks/others/useAuthentication.js";
import { AnimatePresence, motion } from "framer-motion";
import AccountAdminWebsiteManagementSection from "./AccountAdminWebsiteManagementSection.jsx";
import AccountAdminShopManagementSection from "./AccountAdminShopManagementSection.jsx";
import UserAccountForm from "../../form/UserAccountForm";
import UserAccountImagesForm from "../../form/UserAccountImagesForm";
import AdminTabButtonsSection from "../AdminTabButtonsSection";

const sectionButtonsData = [
  {
    name: "Konto",
    value: "ACCOUNT",
  },
  {
    name: "Strona",
    value: "WEBSITE",
  },
  {
    name: "Sklep",
    value: "SHOP",
  },
];

const AccountAdminSection = ({ userData, avatar, watch }) => {
  const { role, accountCreationDate } = useAuthentication();
  const [openModal, setOpenModal] = React.useState(false);
  const [chosenSection, setChosenSection] = useState("ACCOUNT");

  return (
    <div className={"flex flex-col max-lg:w-[95%] lg:w-[900px]"}>
      <AdminTabButtonsSection
        chosenSection={chosenSection}
        onClick={(data: string) => setChosenSection(data)}
      />
      <div className={"flex rounded-2xl bg-white"}>
        <AnimatePresence>
          {chosenSection === "ACCOUNT" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6 }}
              className="flex h-auto w-full flex-col rounded-2xl"
            >
              <div className="flex max-xl:flex-col">
                <UserAccountForm preloadedData={userData} />
                <UserAccountImagesForm className={""} />
              </div>
            </motion.div>
          )}
          {chosenSection === "WEBSITE" && (
            <AccountAdminWebsiteManagementSection />
          )}
          {chosenSection === "SHOP" && <AccountAdminShopManagementSection />}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default AccountAdminSection;
