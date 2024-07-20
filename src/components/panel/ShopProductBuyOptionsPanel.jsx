import React from "react";
import HeartIcon from "../../icons/HeartIcon";

const ShopProductBuyOptionsPanel = ({ productTitle }) => {
  return (
    <div className="w-[50%] h relative py-4 px-10 h-[550px] rounded-2xl bg-custom-yellow-100">
      <h2 className="w-full h-[65px] flex justify-center items-center font-bold text-5xl left-0 bg-white absolute indent-0">
        {productTitle}
      </h2>
      <div className="w-full flex flex-col gap-4 h-full mt-20">
        <p className="font-bold text-3xl">89,50</p>
        <p className="font-bold text-2xl">
          Koszulka bawełniana <span className="italic">Tęcza x Elen</span>
        </p>
        <button className="text-xl w-full h-[50px] bg-white rounded-full">
          Rozmiar
        </button>
        <button className="text-xl w-full h-[50px] bg-white rounded-full italic">
          wybierz opcję
        </button>
        <div className="flex justify-between items-center px-4 py-2 text-xl font-bold bg-white w-[125px] h-[50px] rounded-full">
          <button className="w-[35px] h-full">-</button>
          <p className="italic">1</p>
          <button className="w-[35px] h-full">+</button>
        </div>
        <div className="w-full flex h-[75px] bg-white rounded-2xl">
          <button className="w-[50%] rounded-2xl h-full uppercase text-2xl bg-custom-gray-300">
            Dodaj do koszyka
          </button>
          <button className="w-[50%] gap-2 h-full text-xl flex justify-center items-center">
            <HeartIcon size={"size-10"} />
            <p>dodaj do ulubionych</p>
          </button>
        </div>
        <p className="text-xl">Kategoria: Koszulki, Ubrania</p>
      </div>
    </div>
  );
};

export default ShopProductBuyOptionsPanel;
