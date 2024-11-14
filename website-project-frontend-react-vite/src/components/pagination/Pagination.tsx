import React from "react";
import ArrowRightIcon from "./icons/ArrowRightIcon.jsx";
import ArrowLeftIcon from "./icons/ArrowLeftIcon.jsx";

const Pagination = ({ totalPages, currentPage, setCurrentPageFunc }) => {
  const handleNextPage = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPageFunc(currentPage + 1);
    }
    console.log(currentPage);
  };

  const handlePreviousPage = () => {
    if (currentPage > 0) {
      setCurrentPageFunc(currentPage - 1);
    }
    console.log(currentPage);
  };

  const numbers = [];

  for (let i = 0; i <= totalPages - 1; i++) {
    numbers.push(i + 1);
  }

  const colors = [
    "#FF3130",
    "#FF914D",
    "#FFDE5A",
    "#5BBE30",
    "#16C2E0",
    "#1065D7",
    "#D413CD",
  ];

  const getColorForPaginationNumber = (index) => {
    let modulo = index % 7;
    return colors[modulo];
  };

  return (
    <div className="gap-4 items-center mt-6 flex">
      <button
        onClick={handlePreviousPage}
        disabled={currentPage === 0}
        className="rounded-full bg-white text-custom-orange-200"
      >
        <ArrowLeftIcon size={"size-10"} />
      </button>
      <ul className="flex gap-2">
        {numbers.map((number, index) => (
          <button
            disabled={index === currentPage}
            className={`size-8 rounded-full duration-300 font-bold border-2 flex transition transform ease-in-out items-center justify-center ${index === currentPage && "text-white scale-110 border-custom-blue-500"}`}
            style={{
              backgroundColor:
                index === currentPage
                  ? getColorForPaginationNumber(index)
                  : "white",
              borderColor: getColorForPaginationNumber(index),
              color:
                index !== currentPage
                  ? getColorForPaginationNumber(index)
                  : "white",
            }}
            key={index}
            onClick={() => {
              setCurrentPageFunc(number - 1);
            }}
          >
            {number}
          </button>
        ))}
      </ul>
      <button
        onClick={handleNextPage}
        disabled={currentPage === totalPages - 1}
        className="rounded-full bg-white text-custom-orange-200"
      >
        <ArrowRightIcon size={"size-10"} />
      </button>
    </div>
  );
};

export default Pagination;
