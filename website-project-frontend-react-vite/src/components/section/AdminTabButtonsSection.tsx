import React from "react";
import { motion } from "framer-motion";

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

const AdminTabButtonsSection = ({ chosenSection, onClick }) => {
  return (
    <div
      className={
        "mb-2 flex h-[75px] w-full items-center justify-center gap-12 rounded-2xl bg-custom-gray-100 text-black"
      }
    >
      {sectionButtonsData.map((data, index) => (
        <motion.button
          initial={{
            background: "#F4F4F4",
            color: "#000000",
            borderColor: "#000000",
          }}
          animate={
            chosenSection === data.value
              ? {
                  background: "#FF5A5A",
                  color: "#FFFFFF",
                  borderColor: "#FF5A5A",
                }
              : {
                  background: "#F4F4F4",
                  color: "#000000",
                  borderColor: "#000000",
                }
          }
          exit={{
            background: "#F4F4F4",
            color: "#000000",
            borderColor: "#000000",
          }}
          key={index}
          onClick={() => onClick(data.value)}
          className={
            "h-[50px] rounded-xl border-2 border-black text-xl font-bold uppercase max-md:w-[100px] md:w-[150px]"
          }
        >
          {data.name}
        </motion.button>
      ))}
    </div>
  );
};

export default AdminTabButtonsSection;
