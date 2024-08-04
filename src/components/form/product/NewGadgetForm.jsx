import React, { useEffect, useState } from "react";
import FormItem from "../FormItem";

const NewGadgetForm = ({ formData }) => {
  const [type, setType] = useState("");
  const [material, setMaterial] = useState("");

  useEffect(() => {
    formData.append("type", type);
    formData.append("material", material);
  }, [formData]);

  const formDataStructure = [
    {
      title: "Wpisz typ:",
      function: setType,
    },
    {
      title: "Wpisz materiał:",
      function: setMaterial,
    },
  ];

  return (
    <>
      {formDataStructure.map((data, index) => (
        <FormItem
          key={index}
          labelData={data.title}
          type={"text"}
          onChangeAction={(e) => data.function(e.target.value)}
          inputStyling={
            "w-full bg-custom-gray-200 focus:outline-none focus:border-custom-orange-200 p-4 text-lg h-[50px] font-medium border-4 rounded-2xl border-black resize-none"
          }
          containerStyling={"font-bold text-xl"}
        />
      ))}
    </>
  );
};

export default NewGadgetForm;
