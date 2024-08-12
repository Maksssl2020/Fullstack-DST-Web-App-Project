import React, { useState } from "react";
import MainBannerWithoutLogo from "../universal/MainBannerWithoutLogo";
import { Masonry } from "@mui/lab";
import NewsPostCard from "../card/NewsPostCard";
import {
  getHeightForPost,
  getRandomBackgroundColor,
} from "../../helpers/NewsPostStyling";
import Pagination from "../pagination/Pagination";
import { useQuery } from "react-query";
import { fetchNewsPostData } from "../../helpers/api-integration/NewsPostsHandling";
import Spinner from "../universal/Spinner";

const NewsPostSection = () => {
  const [currentPage, setCurrentPage] = useState(0);

  const { data: postsData, isLoading: fetchingPostsData } = useQuery(
    ["newsSectionPostsData", currentPage],
    () => fetchNewsPostData(currentPage),
  );

  if (fetchingPostsData) {
    return <Spinner />;
  }

  return (
    <>
      <div className="flex relative w-full h-[125px] items-center justify-center">
        <MainBannerWithoutLogo bannerTitle="Tęczowe Aktualności" />
      </div>
      <div className="w-full relative flex flex-col justify-center bg-custom-gray-200 mt-4 p-4 h-auto">
        <Masonry columns={{ xl: 4, lg: 3, md: 2 }} spacing={5}>
          {postsData.content.map((data, index) => (
            <NewsPostCard
              key={index}
              height={getHeightForPost(index)}
              backgroundColor={getRandomBackgroundColor()}
              cardData={data}
            />
          ))}
        </Masonry>
      </div>
      <div>
        <Pagination
          totalPages={postsData.totalPages}
          currentPage={currentPage}
          setCurrentPageFunc={setCurrentPage}
        />
      </div>
    </>
  );
};

export default NewsPostSection;
