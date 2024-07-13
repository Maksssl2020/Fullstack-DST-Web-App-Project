import React from "react";

const HomeAboutUsSection = () => {
  return (
    <div className="mt-16 flex h-[400px] justify-center">
      <div className="z-10 h-[350px] w-[35%]">
        <img
          className="inset-0 h-full w-full rounded-lg object-cover"
          src="/assets/images/home_card_image.jpg"
          alt=""
        />
      </div>
      <div className="bg-custom-blue-100 flex h-full w-[45%] -translate-x-12 flex-col rounded-lg px-20 py-4">
        <h1 className="font-lato text-4xl font-bold">
          O co tak właściwie chodzi?
        </h1>
        <div className="my-5 h-1 w-full bg-gradient-to-r from-black to-transparent"></div>
        <p className="text-lg">
          Celem naszego projektu jest edukowanie społeczeństwa o tolerancji.
          Chcemy uświadomić ludzi, że szykanowanie i hejt nie jest w porządku
          niezależnie od tego z kim mamy do czynienia. Podczas realizowania
          projektu poruszymy tematy dyskryminacji, rasizmu, osób LGBT,
          uchodźców, depresji i niepełnosprawności. My jako zespół Dwie Strony
          Tęczy nie boimy się mówić o tematach, które są postrzegane jako
          delikatne czy tabu. Naszym zadaniem jest dać osobom dotkniętymi
          powyższymi problemami poczucie bezpieczeństwa i zrozumienia. Chcemy,
          aby nasza pomoc była realna i zauważalna.
        </p>
        <button className="bg-custom-blue-300 mt-4 h-[55px] w-[175px] self-center rounded-full text-xl font-bold italic text-white">
          O NAS
        </button>
      </div>
    </div>
  );
};

export default HomeAboutUsSection;
