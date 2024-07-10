import React from "react";

const NewsCard = () => {
  return (
    <div className="h-[650px] w-[450px] rounded-lg bg-white p-4">
      <div className="h-full w-full rounded-lg bg-custom-gray-100">
        <div className="relative z-20 h-[65%] w-full rounded-lg border-4 border-black bg-custom-gray-100">
          <img
            className="inset-0 z-20 h-full w-full rounded-lg object-cover"
            src="/assets/images/test_img.jpg"
            alt=""
          />
        </div>
        <div className="z-10 h-[40%] w-full -translate-y-7 rounded-b-lg bg-custom-gray-100 px-8 py-6">
          <div className="mt-6 h-[65px] w-full rounded-full bg-custom-gray-200">
            <div className="flex items-center justify-center gap-4">
              <div className="h-[60px] w-[60px]">
                <img
                  className="inset-0 h-full w-full rounded-full object-cover"
                  src="/assets/images/website-logo.jpg"
                  alt=""
                />
              </div>
              <div className="flex flex-col items-center">
                <p className="font-lato text-lg font-bold">Dwie Strony Tęczy</p>
                <p className="font-lato text-sm">-- 09.01.2024 --</p>
              </div>
            </div>
            <p className="mt-4 text-justify">
              Jeśli chodzi o psychologiczne przyczyny rozwoju depresji, mogą
              nimi być m.in. traumatyczne wydarzenia, niska zdolność radzenia
              sobie ze stresem, czynniki osobowościowe...
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsCard;
