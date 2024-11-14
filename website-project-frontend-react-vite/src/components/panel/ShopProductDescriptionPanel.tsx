import React from "react";
import DashedLine from "../universal/DashedLine.jsx";
import { motion } from "framer-motion";

const ShopProductDescriptionPanel = ({ productData, cardColor }) => {
  let productInfo;

  if (productData.productType === "CLOTHING") {
    productInfo = (
      <div className="text-xl">
        <p>Skład: {productData.productComposition}</p>
        <p>Nadruk: {productData.productOverprint}</p>
      </div>
    );
  }
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 1.1 }}
      transition={{ duration: 0.4 }}
      className={`w-full gap-2 flex p-8 flex-col items-center h-auto rounded-2xl ${cardColor}`}
    >
      <h2 className="text-2xl font-bold">{productData.name}</h2>
      <p className="text-xl">{productData.description}</p>
      {productInfo}
      <p className="text-xl">
        Grafika jest prezentem od <span className="italic">Eleny XXX</span>,
        początlującej artystki.
      </p>
      <img
        className="w-full"
        src="/assets/images/test-roamiary-koszulek.png"
        alt={""}
      />
      <div className="w-full h-auto flex flex-col items-center gap-3">
        <DashedLine
          width={"w-full"}
          lineColor={"border-custom-gray-300"}
          circleColor={"bg-custom-gray-300"}
        />
        <p className="text-xl">
          W produkcji koszulek dumnie nas wspiera polska firma XXX z XXX
        </p>
        <DashedLine
          width={"w-full"}
          lineColor={"border-custom-gray-300"}
          circleColor={"bg-custom-gray-300"}
        />
      </div>
      <div className="w-full text-xl h-auto flex flex-col items-center">
        <p>
          100% zysku z Twoich zakupów przeznaczamy na cele statutowe
          Stowarzyszenia/Funcacji Dwie Strony Tęczy.
        </p>
        <p>
          Wszystkie rzeczy tworzymy od początku do końca w Polsce - wspólnie
          wspieramy lokalne manufaktury.
        </p>
        <p>Wyprodukowano z Pasją &#10084;</p>
      </div>
    </motion.div>
  );
};

export default ShopProductDescriptionPanel;
