import React from "react";
import JobCharacteristicsList from "../list/JobCharacteristicsList";
import WorkPillarCard from "../card/WorkPillarCard";
import { PieChart } from "@mui/x-charts/PieChart";

const jobCharacteristicsListData = [
  {
    keyWord: "długofalowo",
    description:
      " - regularnie, sprawdzamy rezultaty i nie spodziewamy się natychmiastowych efektów,",
  },
  {
    keyWord: "konsekwentnie",
    description:
      " - pracujemy zgodnie z planem i aktualizujemy go w razie potrzeby,",
  },
  {
    keyWord: "strategicznie ",
    description:
      "- pracujemy według opracowanej przez nasz zespół strategii polegającej na w szczególności na integracji z drugim człowiekiem.",
  },
];

const firstWorkPillarCardData = [
  {
    color: "default",
    text: "Prowadzimy lekcje oraz wykłady w szkołach w naszym mieście jak i w placówkach na terenie całej polski dotyczące tematów",
  },
  {
    color: "special",
    text: "akceptacji, równości i problemów związanych z depresją",
  },
  {
    color: "default",
    text: ". Jednak nie tylko realnymi spotkaniami można coś zmienić. Dla tego prowadzimy również media społecznościowe.",
  },
];

const secondWorkPillarCardData = [
  {
    color: "default",
    text: "Organizujemy spotkania integracyjne które odbywają się w różnych formach takich jak, ",
  },
  {
    color: "special",
    text: " pikniki, długie wspólne spacery, czy internetowe spotkania naszego klubu książki",
  },
  {
    color: "default",
    text: ". Prowadzimy również raz do roku ",
  },
  {
    color: "special",
    text: "Żywą Bibliotekę ",
  },
  {
    color: "default",
    text: "mającą na celu umożliwienie porozmawiania uczestnika z przedstawicielem danej dyskryminowanej grupy społecznej.",
  },
];

const SupportUsIInformationAboutUsSection = () => {
  return (
    <div className="flex text-2xl flex-col self-center w-[750px]">
      <div className="gap-2 flex w-full flex-col justify-center items-center">
        <h2 className="font-bold text-4xl">Jak pracujemy?</h2>
        <p className="flex flex-wrap justify-center text-center">
          {"Celem naszej pracy na lata 2024 - 2029"}
          <span className="italic ml-1">{"(mamy nadzieję, że na dłużej)"}</span>
          {"jest szerzenie akceptacji oraz pomoc osobom potrzebującym."}
        </p>
      </div>
      <JobCharacteristicsList listData={jobCharacteristicsListData} />
      <div className="gap-2 mt-4 flex w-full flex-col justify-center items-center">
        <h2 className="font-bold text-4xl">
          Nasza praca opiera się na trzech filarach:
        </h2>

        <div className="flex gap-8 mt-6">
          <WorkPillarCard
            title={"Pomagamy zrozumieć"}
            cardData={firstWorkPillarCardData}
          />
          <WorkPillarCard
            title={"Budujemy społeczność"}
            cardData={secondWorkPillarCardData}
          />
          <WorkPillarCard title={"Pomagamy"} cardData={""} />
        </div>
      </div>
      <div className="mt-4 flex w-full flex-col justify-center items-center">
        <h2 className="font-bold text-4xl mb-4">Skąd bierzemy pieniądze?</h2>
        <p>Stowarzyszenie/Fundacja Dwie Strony Tęczy.</p>
        <p>Dane z I kwartału roku 2024</p>

        <PieChart
          margin={{ top: 60, left: 0, right: 0 }}
          series={[
            {
              data: [
                { id: 0, value: 12, label: "Granty", color: "#ED292A" },
                {
                  id: 1,
                  value: 17.6,
                  label: "Darowizny od firm",
                  color: "#FF3130",
                },
                {
                  id: 2,
                  value: 70.4,
                  label: "Darowizny od osób prywatnych",
                  color: "#FF7070",
                },
              ],
              highlightScope: { faded: "global", highlight: "item" },
              faded: { innerRadius: 15, additionalRadius: -30 },
            },
          ]}
          slotProps={{
            legend: {
              direction: "row",
              position: { horizontal: "middle", vertical: "top" },
            },
          }}
          width={525}
          height={525}
        />
      </div>
    </div>
  );
};

export default SupportUsIInformationAboutUsSection;
