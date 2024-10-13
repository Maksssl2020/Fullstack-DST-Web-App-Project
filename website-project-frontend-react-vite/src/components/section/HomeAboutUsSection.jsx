import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const HomeAboutUsSection = () => {
  const navigate = useNavigate();

  return (
    <div className="mt-16 lg:ml-14 flex max-lg:h-[475px] justify-center">
      <div className="z-10 h-[350px] max-lg:hidden max-xl:w-[425px] max-2xl:w-[525px] w-[600px]">
        <img
          className="inset-0 h-full w-full rounded-3xl object-cover"
          src="/assets/images/home_card_image.jpg"
          alt=""
        />
      </div>
      <div className="bg-custom-blue-200 flex gap-2 h-full max-lg:w-[95%] max-xl:w-[600px] max-2xl:w-[700px] w-[800px] lg:-translate-x-12 flex-col rounded-3xl px-20 py-6">
        <h1 className="font-lato max-xl:text-2xl max-sm:text-sm max-md:text-xl max-lg:text-3xl max-2xl:text-3xl text-4xl font-extrabold">
          O co tak właściwie chodzi?
        </h1>
        <div className="my-5 h-1 w-full bg-gradient-to-r from-black to-transparent"></div>
        <p className="max-[1680px]:text-[16px] max-sm:text-[10px] max-md:text-[14px] max-lg:text-lg max-xl:text-[14px] text-lg text-justify">
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
        <motion.button
          whileHover={{ scale: 1.05 }}
          onClick={() => navigate("/about-us")}
          className="bg-custom-blue-500 mt-8 max-md:h-[30px] max-md:text-lg max-md:w-[125px] h-[55px] w-[175px] self-center flex items-center justify-center rounded-full text-xl font-bold italic text-white"
        >
          O NAS
        </motion.button>
      </div>
    </div>
  );
};

export default HomeAboutUsSection;
