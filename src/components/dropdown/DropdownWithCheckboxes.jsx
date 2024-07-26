import React from "react";
import CheckIcon from "../../icons/CheckIcon";

const DropdownWithCheckboxes = ({ title, options, setChosenOptions }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [selectedOptions, setSelectedOptions] = React.useState([]);

  const handleOpenClick = () => {
    setIsOpen(!isOpen);
  };

  const handleChoosingOptions = (option) => {
    if (selectedOptions.includes(option)) {
      setSelectedOptions(selectedOptions.filter((item) => item !== option));
    } else {
      setSelectedOptions([...selectedOptions, option]);
    }

    setChosenOptions(selectedOptions);
  };

  console.log(selectedOptions);
  return (
    <div className="relative w-[250px]">
      <button
        onClick={handleOpenClick}
        className={`w-full uppercase bg-custom-gray-200 p-4 flex flex-col items-center text-xl border-4 border-black rounded-2xl ${isOpen && "bg-custom-orange-200 text-white font-bold"}`}
      >
        {title}
      </button>
      {isOpen && (
        <div className="absolute z-10 w-full p-2 bg-custom-gray-200 space-y-2 mt-2 border-4 border-black rounded-2xl shadow-lg">
          {options.map((option, index) => (
            <div
              key={index}
              onClick={() => handleChoosingOptions(option)}
              className={`flex text-xl bg-custom-gray-200 w-full h-auto justify-between items-center px-4 py-2 rounded-full ${selectedOptions.includes(option) ? "bg-custom-orange-200 border-[3px] text-white font-bold border-black" : ""}`}
            >
              {selectedOptions.includes(option) && (
                <CheckIcon size={"size-6 stroke-2"} />
              )}
              <p>{option}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DropdownWithCheckboxes;