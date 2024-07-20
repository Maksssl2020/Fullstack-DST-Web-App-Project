import React from "react";
import DashedLine from "../universal/DashedLine";

const ShopProductDescriptionPanel = () => {
  return (
    <div className="w-full gap-2 flex p-8 flex-col items-center bg-custom-yellow-100 h-auto rounded-2xl">
      <h2 className="text-2xl font-bold">
        Koszulka bawełniana <span className="italic">Tęcza x Elen</span>
      </h2>
      <p className="text-xl">
        Bawełniany, jasno-czerwony T-shirt. Z przodu z nadrukiem w tęczowych
        kolorach i identycznym tyłem.
      </p>
      <div className="text-xl">
        <p>skład: 100% bawełna</p>
        <p>nadruk: sitodruk</p>
      </div>
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
    </div>
  );
};

export default ShopProductDescriptionPanel;
