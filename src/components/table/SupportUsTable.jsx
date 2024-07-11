import React from "react";

const SupportUsTable = ({ tableData }) => {
  const [isDifferentAmountChosen, setIsDifferentAmountChosen] =
    React.useState(false);

  const handleDifferentAmountClick = (clickedButtonIndex) => {
    if (clickedButtonIndex === 5) {
      setIsDifferentAmountChosen(true);
    } else {
      setIsDifferentAmountChosen(false);
    }
  };

  return (
    <div className="mt-3 w-[75%] gap-2 flex flex-col">
      <p className="ml-3">Wybierz kwotę</p>
      <div className="grid gap-3 grid-cols-2">
        {tableData.map((item, index) => (
          <button
            onClick={() => handleDifferentAmountClick(index)}
            className="border-2 h-[35px] focus:border-custom-orange-100 border-black rounded-xl"
            key={index}
          >
            {item}
          </button>
        ))}
      </div>
      {isDifferentAmountChosen && (
        <>
          <p className="ml-3">Inna kwota</p>
          <div className="relative group focus-within:border-custom-orange-100 w-[125px] h-[35px]  flex">
            <input
              placeholder="35.00"
              className={
                "border-black w-full  focus:outline-none focus:border-custom-orange-100 placeholder:text-custom-gray-300 px-2 border-2 rounded-xl"
              }
            />
            <p className="w-[30px] group-focus-within:border-custom-orange-100 -translate-x-6 rounded-xl border-2 border-black flex items-center justify-center bg-custom-gray-300">
              zł
            </p>
          </div>
        </>
      )}
    </div>
  );
};

export default SupportUsTable;
