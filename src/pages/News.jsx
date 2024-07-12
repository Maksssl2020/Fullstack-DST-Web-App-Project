import React, { useEffect, useState } from "react";
import MainBannerWithoutLogo from "../components/universal/MainBannerWithoutLogo";
import NewsPostCard from "../components/card/NewsPostCard";
import { newsPostsData } from "../data/NewsPageData";
import { Masonry } from "@mui/lab";

let usedIndexes = [];

const getHeightForPost = (index) => {
  let moduloResult = (index % 15) + 1;

  if ([1, 6].includes(moduloResult)) {
    return "600px";
  } else if ([2, 7].includes(moduloResult)) {
    return "650px";
  } else if ([3, 8].includes(moduloResult)) {
    return "700px";
  } else if ([4, 9].includes(moduloResult)) {
    return "750px";
  } else if ([5, 10].includes(moduloResult)) {
    return "800px";
  } else {
    return "850px";
  }
};

const backgroundColors = [
  "bg-custom-blue-400",
  "bg-custom-blue-100",
  "bg-custom-blue-300",
  "bg-custom-pink-300",
  "bg-custom-orange-300",
  "bg-custom-yellow-100",
];

const drawIndex = () => {
  return Math.floor(Math.random() * backgroundColors.length);
};

const getRandomBackgroundColor = () => {
  console.log(usedIndexes);
  let index;
  do {
    if (usedIndexes.length === 6) {
      usedIndexes = [];
    }
    index = drawIndex();
  } while (usedIndexes.includes(index));
  usedIndexes.push(index);

  return backgroundColors[index];
};

const News = () => {
  const [colors, setColors] = useState([]);

  return (
    <div className="w-full flex-col px-8 flex items-center justify-center bg-custom-gray-300 h-auto">
      <MainBannerWithoutLogo bannerTitle="Tęczowe Aktualności" />
      <div className="w-full relative flex flex-col justify-center bg-custom-gray-200 mt-4 p-4 h-auto">
        <Masonry columns={{ xl: 4, lg: 3, md: 2 }} spacing={3}>
          {newsPostsData.map((data, index) => (
            <NewsPostCard
              key={index}
              height={getHeightForPost(index)}
              backgroundColor={getRandomBackgroundColor()}
            />
          ))}
        </Masonry>
      </div>
    </div>
  );
};

export default News;
