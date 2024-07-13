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
      className={`w-full flex h-1/6 rounded-2xl ${isOdd && "flex-row-reverse"}`}
      style={{ backgroundColor: cardColor }}
    >
      <div
        className="h-full w-[35%] p-12 rounded-2xl"
        style={{ backgroundColor: imageContainerColor }}
      >
        <div className="w-full flex items-center justify-center h-full rounded-2xl bg-white">
          {image === undefined ? (
            <h1 className="font-bold text-6xl italic">ZDJĘCIE</h1>
          ) : (
            <img
              className="inset-0 object-cover w-full h-full"
              src={image}
              alt={title}
            />
          )}
        </div>
      </div>
      <div className="h-full gap-6 w-[65%] px-16 py-8 flex flex-col">
        <h1 className="font-bold text-5xl">{title}</h1>
        <div className="h-1 w-full bg-gradient-to-r from-black to-transparent"></div>
        <p className="text-3xl">{description}</p>
        {listData !== undefined && (
          <ul className="list-disc text-2xl flex w-[80%] ml-10 flex-wrap h-[25%] flex-col">
            {splitListData.map((data, index) => (
              <li key={index}>{data}</li>
            ))}
          </ul>
        )}
        {descriptionAfterList !== undefined && (
          <p className="text-3xl">{descriptionAfterList}</p>
        )}
      </div>
    </div>
  );
};

export default AboutUsDataCard;
