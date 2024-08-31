import React from "react";
import FormItem from ".././FormItem";

const NewClothingForm = ({ register }) => {
  const formDataStructure = [
    {
      title: "Wpisz kolor:",
      dataName: "color",
    },
    {
      title: "Wpisz skład:",
      dataName: "productComposition",
    },
    {
      title: "Wpisz nadruk:",
      dataName: "productOverprint",
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
          containerStyling={
            "w-full h-auto flex flex-col font-bold text-xl gap-2 items-center"
          }
          inputStyling={
            "border-4 border-black px-2 h-[50px] rounded-2xl focus:border-custom-orange-200 text-lg flex text-black bg-custom-gray-200 "
          }
        />
      ))}
    </>
  );
};

export default NewClothingForm;
