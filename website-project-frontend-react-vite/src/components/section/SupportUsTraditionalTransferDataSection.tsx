import React from "react";
import DashedLine from "../universal/DashedLine.jsx";

const SupportUsTraditionalTransferDataSection = () => {
  return (
    <div className="flex justify-center">
      <div className="w-[750px] gap-2 flex flex-col items-center justify-center">
        <h1 className="font-bold text-4xl">Dane do przelewu tradycyjnego:</h1>
        <DashedLine />
        <div className="font-bold text-2xl flex w-full flex-col justify-center items-center mt-4">
          <h2>Stowarzyszenie Dwie Strony Tęczy</h2>
          <h2>Bank nieznany</h2>
        </div>
        <div className="mt-2 gap-2 text-2xl flex w-full flex-col justify-center items-center">
          <p>00 0000 0000 0000 0000 0000 0000</p>
          <p>IBAN: PL00 0000 0000 0000 0000 0000 0000</p>
          <div className="flex">
            <p className="font-bold mr-2">Tytuł:</p>
            <p>darowizna na cele stautowe</p>
          </div>
        </div>
        <DashedLine />
        <div className="mt-2 gap-2 text-2xl flex w-full flex-col justify-center items-center">
          <p>Pamiętaj o nas także rozliczając PIT.</p>
          <p className="font-bold">Przekaż 1,5% podatku na Tęczowe Sprawy!</p>
          <p>Wpisz w formularzu nasz KRS 000000000</p>
        </div>
        <DashedLine />
      </div>
    </div>
  );
};

export default SupportUsTraditionalTransferDataSection;
