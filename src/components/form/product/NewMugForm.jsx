import React, { useEffect, useState } from "react";
import FormItem from "../FormItem";

const NewMugForm = ({ register }) => {
  const formDataStructure = [
    {
      title: "Wpisz kolor:",
      dataName: "color",
    },
    {
      title: "Wpisz wysokość:",
      dataName: "height",
    },
    {
      title: "Wpisz materiał:",
      dataName: "material",
    },
  ];

  return (
    <>
      {formDataStructure.map((data, index) => (
        <FormItem
          key={index}
          labelData={data.title}
          type={"text"}
          register={{ ...register(data.dataName) }}
          inputStyling={
            "w-full bg-custom-gray-200 focus:outline-none focus:border-custom-orange-200 p-4 text-lg h-[50px] font-medium border-4 rounded-2xl border-black resize-none"
          }
          containerStyling={"font-bold text-xl"}
        />
      ))}
    </>
  );
};

export default NewMugForm;
