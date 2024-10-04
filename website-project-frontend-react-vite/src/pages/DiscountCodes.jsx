import React from "react";
import AnimatedPage from "../animation/AnimatedPage.jsx";
import Spinner from "../components/universal/Spinner.jsx";
import DiscountCodeCard from "../components/card/DicsountCodeCard.jsx";
import useDiscountCodes from "../hooks/queries/useDiscountCodes.js";

const DiscountCodes = () => {
  const { discountCodes, fetchingDiscountCodes } = useDiscountCodes();

  if (fetchingDiscountCodes) {
    return <Spinner />;
  }

  return (
    <AnimatedPage>
      <div className="w-full h-auto flex flex-col items-center my-8">
        <div className="w-[1000px] min-h-[600px] h-auto flex flex-col gap-4 bg-custom-gray-100 rounded-2xl border-4 border-black p-8">
          <ul className="gap-4 flex flex-col">
            {discountCodes?.map((discountCode, index) => (
              <DiscountCodeCard key={index} discountCodeData={discountCode} />
            ))}
          </ul>
        </div>
      </div>
    </AnimatedPage>
  );
};

export default DiscountCodes;
