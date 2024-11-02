import React from "react";

const hotlineListData = [
  {
    days: "pn",
    hours: "15:00 - 18:00",
  },
  {
    days: "śr-czw:",
    hours: "15:00 - 18:00",
  },
  {
    days: "pt:",
    hours: "14:30 - 16:00",
  },
];

const ContactUsHotlineDataPanel = () => {
  return (
    <div className="lg:w-[40%] text-white max-lg:gap-4 p-6 flex flex-col justify-between relative h-full bg-[#FFA5A5] rounded-3xl">
      <div className="max-lg:w-[35%] lg:w-[60%] font-bold flex items-center justify-center lg:text-xl xl:text-2xl absolute inset-0 ml-auto max-sm:h-[50px] sm:h-[55px] md:h-[65px] lg:h-[75px] xl:h-[85px] translate-x-4 max-sm:-translate-y-1/2 md:-translate-y-11 bg-custom-pink-300 rounded-full">
        +48 715
      </div>
      <h2 className="max-md:text-xl md:text-2xl xl:text-3xl 2xl:text-4xl font-bold">
        Infolinia
      </h2>
      <p className="text-justify md:text-sm xl:text-lg 2xl:text-xl">
        Jeśli zmagasz się z jakimiś problemami, czujesz się nie wysłuchany lub
        szukasz dobrej rady. Jesteśmy dla ciebie, chętnie cię posłuchamy i
        pomożemy jak tylko możerny. Jeśli masz do nas jakieś pytania lub chcesz
        podjąć z nami współpracę czy może nas wesprzeć. Czekamy na twoj telefon!
      </p>
      <div className="gap-4 flex flex-col md:text-sm xl:text-lg 2xl:text-xl">
        <h3 className="font-bold">Nasz zespół jest dla ciebie dostępny:</h3>
        <uL className="font-bold max-sm:ml-2 sm:ml-12 flex flex-col max-sm:w-[85%] max-md:w-[45%] max-lg:w-[35%] lg:w-[55%] list-disc marker:text-custom-red-100">
          {hotlineListData.map((data, index) => (
            <li key={index} className="w-full">
              <div className="flex justify-between">
                <p>{data.days}</p>
                <p>{data.hours}</p>
              </div>
            </li>
          ))}
        </uL>
      </div>
    </div>
  );
};

export default ContactUsHotlineDataPanel;
