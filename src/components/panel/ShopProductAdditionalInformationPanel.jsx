import React from "react";

const ShopProductAdditionalInformationPanel = () => {
  const additionalInformationData = [
    {
      infoTitle: "Waga:",
      infoContent: "0,2 kg",
    },
    {
      infoTitle: "Rozmiar paczki:",
      infoContent: "25 x 20 x 5 (cm)",
    },
    {
      infoTitle: "Kolor:",
      infoContent: "jasno-czerwony",
    },
    {
      infoTitle: "Rozmiary:",
      infoContent: "XS | S | M | L | XL",
    },
  ];

  return (
    <div className="w-full gap-2 flex p-8 flex-col items-center bg-custom-yellow-100 h-auto rounded-2xl">
      <ul className="w-[35%] h-auto space-y-4">
        {additionalInformationData.map((data, index) => (
          <li className="w-full text-xl flex justify-between" key={index}>
            <p>{data.infoTitle}</p>
            <p>{data.infoContent}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ShopProductAdditionalInformationPanel;
