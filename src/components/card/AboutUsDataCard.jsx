import React from "react";

const AboutUsDataCard = ({ cardData, index }) => {
  const {
    title,
    description,
    listData,
    descriptionAfterList,
    image,
    cardColor,
    imageContainerColor,
  } = cardData;

  let splitListData = [];

  if (listData !== undefined) {
    splitListData = listData.split(",");

    for (let i = 0; i < splitListData.length - 1; i++) {
      splitListData[i] = splitListData[i].concat(",");
    }
  }

  const isOdd = index % 2 !== 0;

  return (
    <div
      className={`w-full flex max-xl:h-[475px]  max-2xl:h-[525px] 2xl:h-[585px] rounded-2xl ${isOdd && "flex-row-reverse"}`}
      style={{ backgroundColor: cardColor }}
    >
      <div
        className="max-xl:size-[475px] max-2xl:size-[525px] 2xl:size-[585px] p-12 rounded-2xl"
        style={{ backgroundColor: imageContainerColor }}
      >
        <div className="w-full flex items-center justify-center h-full rounded-2xl bg-white">
          {image === undefined ? (
            <h1 className="font-bold max-xl:text-2xl xl:text-6xl italic">
              ZDJĘCIE
            </h1>
          ) : (
            <img
              className="inset-0 object-cover size-full"
              src={image}
              alt={title}
            />
          )}
        </div>
      </div>
      <div className="h-full gap-6 w-[65%] px-16 py-8 flex flex-col">
        <h1 className="font-bold max-xl:text-2xl max-2xl:text-4xl 2xl:text-5xl">
          {title}
        </h1>
        <div className="h-1 w-full bg-gradient-to-r from-black to-transparent"></div>
        <p className="max-xl:text-lg max-2xl:text-2xl 2xl:text-3xl">
          {description}
        </p>
        {listData !== undefined && (
          <ul className="list-disc max-xl:text-sm max-2xl:text-xl 2xl:text-2xl flex w-[80%] ml-10 flex-wrap h-[25%] flex-col">
            {splitListData.map((data, index) => (
              <li key={index}>{data}</li>
            ))}
          </ul>
        )}
        {descriptionAfterList !== undefined && (
          <p className="max-xl:text-lg max-2xl:text-2xl 2xl:text-3xl">
            {descriptionAfterList}
          </p>
        )}
      </div>
    </div>
  );
};

export default AboutUsDataCard;
