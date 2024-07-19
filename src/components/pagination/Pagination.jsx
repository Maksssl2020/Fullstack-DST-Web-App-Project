import React from "react";
import ArrowRightIcon from "./icons/ArrowRightIcon";
import ArrowLeftIcon from "./icons/ArrowLeftIcon";

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

  return (
    <div className="gap-4 items-center mt-6 flex">
      <button
        onClick={handlePreviousPage}
        disabled={currentPage === 0}
        className="rounded-full bg-white text-custom-blue-500"
      >
        <ArrowLeftIcon size={"size-10"} />
      </button>
      <ul className="flex gap-2">
        {numbers.map((number, index) => (
          <button
            disabled={index === currentPage}
            className={`size-8 rounded-full duration-300 font-bold border-2 flex transition transform ease-in-out items-center justify-center ${index === currentPage ? "bg-custom-blue-500 text-white scale-110 border-custom-blue-500" : "bg-white text-black border-black"}`}
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
        className="rounded-full bg-white text-custom-blue-500"
      >
        <ArrowRightIcon size={"size-10"} />
      </button>
    </div>
  );
};

export default Pagination;
