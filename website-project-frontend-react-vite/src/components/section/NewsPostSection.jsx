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
    <div
      className={"w-full flex flex-col items-center bg-custom-gray-200 gap-4"}
    >
      <div className="flex relative w-full h-[125px] items-center justify-center">
        <MainBannerWithoutLogo bannerTitle="Tęczowe Aktualności" />
      </div>
      <div className="w-[95%] relative flex flex-col justify-center  h-auto">
        <Masonry columns={{ xl: 4, lg: 3, md: 2, sm: 1, xs: 1 }} spacing={2}>
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
    </div>
  );
};

export default NewsPostSection;
