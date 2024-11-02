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
      className={`w-full z-10 flex max-sm:h-auto max-xl:h-[475px] xl:h-[585px] rounded-2xl ${isOdd && "flex-row-reverse"}`}
      style={{ backgroundColor: cardColor }}
    >
      <div
        className="flex items-center justify-center h-full rounded-2xl max-sm:hidden sm:w-[45%] max-lg:p-6 lg:p-8 xl:p-12"
        style={{ backgroundColor: imageContainerColor }}
      >
        {image === undefined ? (
          <div className="font-bold max-xl:text-2xl xl:text-6xl flex justify-center items-center italic w-full h-auto aspect-square bg-white rounded-2xl">
            <h1>ZDJĘCIE</h1>
          </div>
        ) : (
          <img
            className="inset-0 object-cover size-full"
            src={image}
            alt={title}
          />
        )}
      </div>
      <div className="h-full max-xl:gap-4 xl:gap-6 sm:w-[55%] max-lg:px-8 lg:px-12 xl:px-16 max-lg:py-4 lg:py-8 flex flex-col">
        <h1 className="font-bold max-md:text-lg max-xl:text-xl xl:text-3xl">
          {title}
        </h1>
        <div className="h-1 w-full bg-gradient-to-r from-black to-transparent" />
        <p className="max-md:text-sm md:text-[16px] max-xl:text-lg xl:text-xl 2xl:text-2xl">
          {description}
        </p>
        {listData !== undefined && (
          <ul className="list-disc sm:text-[14px]  max-xl:text-sm xl:text-lg 2xl:text-xl flex sm:w-[95%] lg:w-[90%] xl:w-[80%] ml-10 flex-wrap sm:h-[35%] md:h-[25%] flex-col">
            {splitListData.map((data, index) => (
              <li key={index}>{data}</li>
            ))}
          </ul>
        )}
        {descriptionAfterList !== undefined && (
          <p className="max-md:text-sm md:text-[16px] max-xl:text-lg xl:text-xl 2xl:text-2xl">
            {descriptionAfterList}
          </p>
        )}
      </div>
    </div>
  );
};

export default AboutUsDataCard;
