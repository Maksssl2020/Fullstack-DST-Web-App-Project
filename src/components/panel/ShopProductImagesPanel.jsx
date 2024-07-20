import React from "react";

const ShopProductImagesPanel = () => {
  return (
    <>
      <ul className="flex flex-col gap-6 w-[5%]">
        <li className="bg-custom-yellow-100 rounded-2xl h-[100px] w-[100px]"></li>
        <li className="bg-custom-yellow-100 rounded-2xl h-[100px] w-[100px]"></li>
        <li className="bg-custom-yellow-100 rounded-2xl h-[100px] w-[100px]"></li>
        <li className="bg-custom-yellow-100 rounded-2xl h-[100px] w-[100px]"></li>
      </ul>
      <div className="w-[35%] h-[450px] bg-custom-yellow-100 rounded-2xl">
        <img src="/assets/images/Test_T_Shirt_Photo.png" alt={""} />
      </div>
    </>
  );
};

export default ShopProductImagesPanel;
