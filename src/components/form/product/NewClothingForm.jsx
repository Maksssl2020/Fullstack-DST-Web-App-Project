import React, { useEffect, useState } from "react";
import DropdownWithCheckboxes from "../../dropdown/DropdownWithCheckboxes";
import FormItem from ".././FormItem";

const NewClothingForm = ({ formData }) => {
  const [composition, setComposition] = useState("");
  const [overprint, setOverprint] = useState("");
  const [sizes, setSizes] = useState([]);
  const [color, setColor] = useState("");

  useEffect(() => {
    formData.append("color", color);
    formData.append("productComposition", composition);
    formData.append("productOverprint", overprint);
    formData.append("productsSizes", sizes);
  }, [formData]);

  const formDataStructure = [
    {
      title: "Wpisz kolor:",
      function: setColor,
    },
    {
      title: "Wpisz skład:",
      function: setComposition,
    },
    {
      title: "Wpisz nadruk:",
      function: setOverprint,
    },
  ];

  const firstDropdownData = ["XS", "S", "M", "L", "XL"];

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
      <div className="w-[75%] flex gap-4 justify-between">
        <div className="gap-4 flex flex-col">
          <p className="font-bold text-xl">Wybierz rozmiary:</p>
          <DropdownWithCheckboxes
            title={"rozmiary"}
            options={firstDropdownData}
            selectedOptions={sizes}
            setChosenOptions={setSizes}
          />
        </div>
      </div>
    </>
  );
};

export default NewClothingForm;
