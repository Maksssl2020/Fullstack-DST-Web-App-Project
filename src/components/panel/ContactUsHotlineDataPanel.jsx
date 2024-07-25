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
    <div className="w-[40%] text-white p-6 flex flex-col justify-between relative h-full bg-[#FFA5A5] rounded-3xl">
      <div className="w-[60%] font-bold flex items-center justify-center lg:text-2xl xl:text-3xl absolute inset-0 ml-auto md:h-[65px] lg:h-[75px] xl:h-[85px] translate-x-4 -translate-y-11 bg-custom-pink-300 rounded-full">
        +48 715
      </div>
      <h2 className="md:text-xl lg:text-3xl xl:text-4xl 2xl:text-5xl font-bold">
        Infolinia
      </h2>
      <p className="text-justify md:text-xs lg:text-sm xl:text-lg 2xl:text-xl">
        Jeśli zmagasz się z jakimiś problemami, czujesz się nie wysłuchany lub
        szukasz dobrej rady. Jesteśmy dla ciebie, chętnie cię posłuchamy i
        pomożemy jak tylko możerny. Jeśli masz do nas jakieś pytania lub chcesz
        podjąć z nami współpracę czy może nas wesprzeć. Czekamy na twoj telefon!
      </p>
      <div className="gap-4 flex flex-col md:text-xs lg:text-sm xl:text-lg 2xl:text-xl">
        <h3 className="font-bold">Nasz zespół jest dla ciebie dostępny:</h3>
        <uL className="font-bold ml-12 flex flex-col w-[55%] list-disc marker:text-custom-red-100">
          {hotlineListData.map((data, index) => (
            <li className="w-full">
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
