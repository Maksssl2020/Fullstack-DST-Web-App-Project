import React from "react";
import AnimatedPage from "../animation/AnimatedPage.jsx";
import Spinner from "../components/universal/Spinner.jsx";
import DiscountCodeCard from "../components/card/DicsountCodeCard.jsx";
import useDiscountCodes from "../hooks/queries/useDiscountCodes.js";
import AdminManagementSectionContainer from "../components/section/AdminManagementSectionContainer.jsx";
import Page from "../components/section/Page.jsx";

const DiscountCodes = () => {
  const { discountCodes, fetchingDiscountCodes } = useDiscountCodes();

  if (fetchingDiscountCodes) {
    return <Spinner />;
  }

  return (
    <Page className={"flex justify-center bg-custom-gray-400"}>
      <AdminManagementSectionContainer className={"border-2 border-black"}>
        <ul className="gap-4 flex flex-col">
          {discountCodes?.map((discountCode, index) => (
            <DiscountCodeCard key={index} discountCodeData={discountCode} />
          ))}
        </ul>
      </AdminManagementSectionContainer>
    </Page>
  );
};

export default DiscountCodes;
