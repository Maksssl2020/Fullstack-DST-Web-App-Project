import React, { useEffect, useState } from "react";
import FormItem from "../FormItem";
import DropdownWithCheckboxes from "../../dropdown/DropdownWithCheckboxes";

const NewPenForm = ({ formData }) => {
  const [color, setColor] = useState("");
  const [inkColor, setInkColor] = useState("");

  useEffect(() => {
    formData.append("color", color);
    formData.append("inkColor", inkColor);
  }, [color, inkColor]);

  const formDataStructure = [
    {
      title: "Wpisz kolor:",
      function: setColor,
    },
    {
      title: "Wpisz kolor tuszu:",
      function: setInkColor,
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

export default NewPenForm;
