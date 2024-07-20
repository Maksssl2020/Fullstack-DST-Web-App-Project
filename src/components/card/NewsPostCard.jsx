import React from "react";
import PostBannerWithLogoAndDate from "../universal/PostBannerWithLogoAndDate";

const NewsPostCard = ({ height, backgroundColor, cardData }) => {
  const { content, author, creationDate } = cardData;
  return (
    <div
      style={{ height: `${Number.parseFloat(height)}px` }}
      className="w-[400px] bg-white rounded-lg p-2"
    >
      <div
        className={`size-full rounded-lg flex`.concat(" " + backgroundColor)}
      >
        <div className="w-full p-5 flex flex-col min-h-[275px] h-auto rounded-lg mt-auto bg-custom-gray-100">
          <PostBannerWithLogoAndDate authorName={author} date={creationDate} />
          <p className="text-justify mt-6">{content}</p>
        </div>
      </div>
    </div>
  );
};

export default NewsPostCard;
