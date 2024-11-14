import React from "react";

const SizesDropdown = ({ title, className, data, chosenSize, onClick }) => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div className={"z-10 h-auto w-full relative rounded-full"}>
      <button onClick={() => setIsOpen(!isOpen)} className={className}>
        {title}
      </button>
      {isOpen && (
        <div className="absolute z-10 w-full p-2 bg-white space-y-2 mt-2 rounded-2xl shadow-lg">
          {data.map((option, index) => (
            <div
              key={index}
              onClick={() => onClick(option)}
              className={`flex text-xl hover:bg-custom-orange-200 hover:text-white hover:border-black border-4 w-full h-auto justify-between items-center px-4 py-2 rounded-full ${chosenSize === option ? "bg-custom-orange-200 border-black text-white" : "bg-white border-transparent"}`}
            >
              <p>{option}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SizesDropdown;
