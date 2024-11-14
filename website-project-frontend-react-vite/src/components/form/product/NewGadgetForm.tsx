import React, { useEffect, useState } from "react";
import FormItem from "../FormItem.jsx";

const NewGadgetForm = ({ register, errors }) => {
  const formDataStructure = [
    {
      title: "Wpisz typ:",
      dataName: "type",
      type: "text",
      errors: errors?.type?.message,
    },
    {
      title: "Wpisz materiał:",
      dataName: "material",
      type: "text",
      errors: errors?.material?.message,
    },
  ];

  return (
    <>
      {formDataStructure.map((data, index) => (
        <FormItem
          key={index}
          labelData={data.title}
          type={data.type}
          register={{ ...register(data.dataName) }}
          containerStyling={
            "w-full h-auto flex flex-col font-bold text-xl gap-2 items-center"
          }
          inputStyling={
            "border-4 border-black px-2 h-[50px] rounded-2xl focus:border-custom-orange-200 text-lg flex text-black bg-custom-gray-200 "
          }
          errors={data.errors}
        />
      ))}
    </>
  );
};

export default NewGadgetForm;
