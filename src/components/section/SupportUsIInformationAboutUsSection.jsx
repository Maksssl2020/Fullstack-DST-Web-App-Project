import React from "react";
import SupportUsDataList from "../list/SupportUsDataList";
import SupportUsDataCard from "../card/SupportUsDataCard";

import {
  fistUseOfFundsList,
  jobCharacteristicsListData,
  moneyResourcesInformationData,
  mostImportantEffortsOfWork,
  secondUseOfFundsList,
  threePillarsData,
} from "../../data/SupportUsPageData";
import ReusableChart from "../universal/ReusableChart";
import SupportUsSectionHeader from "../banner/SupportUsSectionHeader";
import { useQuery } from "react-query";
import { fetchAllStatistics } from "../../helpers/api-integration/StatisticsHandling";
import Spinner from "../universal/Spinner";

const SupportUsIInformationAboutUsSection = () => {
  const { data: chartStatisticsData, isLoading: fetchingChartStatisticsData } =
    useQuery(["supportUsChartStatisticsData"], () => fetchAllStatistics());

  if (fetchingChartStatisticsData) {
    return <Spinner />;
  }

  return (
    <div className="flex text-2xl w-[750px] flex-col justify-center items-center">
      <SupportUsSectionHeader title="Jak pracujemy?">
        {"Celem naszej pracy na lata 2024 - 2029"}
        <span className="italic mx-1">{"(mamy nadzieję, że na dłużej)"}</span>
        {"jest szerzenie akceptacji oraz pomoc osobom potrzebującym."}
      </SupportUsSectionHeader>

      <SupportUsDataList listData={jobCharacteristicsListData} />

      <SupportUsSectionHeader title="Nasza praca opiera się na trzech filarach:" />
      <div className="flex gap-8 mt-6">
        {threePillarsData.map((data, index) => (
          <SupportUsDataCard
            key={index}
            title={data.title}
            cardData={data.cardData}
          />
        ))}
      </div>

      <SupportUsSectionHeader title="Skąd bierzemy pieniądze?">
        <p>Stowarzyszenie/Fundacja Dwie Strony Tęczy.</p>
        <p>Dane z I kwartału roku 2024</p>
      </SupportUsSectionHeader>

      <div className="mt-8 h-auto">
        <ReusableChart
          chartData={chartStatisticsData}
          width={525}
          height={525}
        />
      </div>

      <div className="mt-6 text-center">
        <span className="font-bold">Skąd pozyskujemy środki?</span>{" "}
        Przedstawiamy wykres na którym widzicie nasze źródła finansowania z I
        kwartału 2024 roku.
      </div>

      <div className="mt-6 gap-8 flex">
        {moneyResourcesInformationData.map((data, index) => (
          <SupportUsDataCard
            key={index}
            title={data.title}
            cardData={data.cardData}
            additionalStyling={"w-[275px] h-[200px] text-center"}
          />
        ))}
      </div>

      <h2 className="font-bold text-center mt-6 w-[650px]">
        Jak możecie zauważyć, pracujemy przede wszystkim dzięki Waszemu
        wsparciu.
      </h2>

      <SupportUsSectionHeader title="Jak wydajemy zebrane środki?">
        <p className="w-[925px]">
          W naszej fundacji/organizacji można będzie uczestniczyć w nieodpłatnym
          wolontariacie. Doceniamy ciężką pracę dla tego przewidzimy nie zawsze
          wielkie wynagrodzenie w momencie gdy wolontariusz zechce np. stworzyć
          artykuł na wybrany temat na nasze media społecznościowe bądź zajmie
          się sprawami technicznymi typu fotografowanie każdego wydarzenia.
        </p>
      </SupportUsSectionHeader>

      <div className="mt-10 text-center space-y-4">
        <h2 className="font-bold">
          Większa część zebranych środków zostanie wykorzystana na:
        </h2>

        <div className="grid mt-10  gap-16 grid-cols-2">
          <SupportUsDataList
            listData={fistUseOfFundsList}
            styling={"text-left mark:text-black"}
          />
          <SupportUsDataList
            listData={secondUseOfFundsList}
            styling={"text-left mark:text-black"}
          />
        </div>
      </div>

      <div
        className={
          "w-[1350px] items-center my-4 justify-center h-[100px] text-center flex bg-custom-gray-100"
        }
      >
        <h2 className="font-bold w-[60%] text-4xl">
          Dokładając swoją cegiełkę
          <span className="text-custom-orange-200 mx-2">RAZEM</span>
          możemy stworzyć coś pięknego!
        </h2>
      </div>

      <h2 className="font-bold text-3xl mt-6 mb-2">
        Najważniejsze efekty naszej pracy:
      </h2>

      <div className="w-[1350px] mt-8 flex flex-col items-center h-fit">
        <div className="w-full flex justify-center p-4 bg-custom-gray-100">
          <div className="grid-cols-3 grid gap-8">
            {mostImportantEffortsOfWork.map((data, index) => (
              <SupportUsDataCard
                key={index}
                title={data.title}
                cardData={data.cardData}
                additionalStyling={"w-[350px] h-[225px] bg-white"}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SupportUsIInformationAboutUsSection;
