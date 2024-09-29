import React, { useState } from "react";
import MainBannerWithoutLogo from "../universal/MainBannerWithoutLogo.jsx";
import { Masonry } from "@mui/lab";
import NewsPostCard from "../card/NewsPostCard.jsx";
import {
  getHeightForPost,
  getRandomBackgroundColor,
} from "../../helpers/NewsPostStyling.js";
import Pagination from "../pagination/Pagination.jsx";
import Spinner from "../universal/Spinner.jsx";
import useNewsPosts from "../../hooks/queries/useNewsPosts.js";

const NewsPostSection = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const { newsPosts, fetchingNewsPosts } = useNewsPosts(currentPage);

  if (fetchingNewsPosts) {
    return <Spinner />;
  }

  return (
    <>
      <div className="flex relative w-full h-[125px] items-center justify-center">
        <MainBannerWithoutLogo bannerTitle="Tęczowe Aktualności" />
      </div>
      <div className="w-full relative flex flex-col justify-center bg-custom-gray-200 mt-4 p-4 h-auto">
        <Masonry columns={{ xl: 4, lg: 3, md: 2 }} spacing={5}>
          {newsPosts.content.map((data, index) => (
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
          totalPages={newsPosts.totalPages}
          currentPage={currentPage}
          setCurrentPageFunc={setCurrentPage}
        />
      </div>
    </>
  );
};

export default NewsPostSection;
