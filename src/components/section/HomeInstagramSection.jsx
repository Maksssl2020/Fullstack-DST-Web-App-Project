import React, { useState } from "react";
import InstagramSectionBanner from "../banner/InstagramSectionBanner.jsx";
import HomeInstagramSectionCardSlider from "../card-slider/HomeInstagramSectionCardSlider";
import "./HomeInstagramSection.css";
import { useQuery } from "react-query";
import {
  fetchInstagramUserData,
  fetchInstagramUserPostsData,
} from "../../helpers/api-integration/InstagramDataHandling";
import Spinner from "../universal/Spinner";
import InstagramPostModal from "../modal/InstagramPostModal";

const HomeInstagramSection = () => {
  const [selectedPost, setSelectedPost] = useState(null);

  const { data: instagramUserData, isLoading: fetchingInstagramUserData } =
    useQuery(["instagramUserData"], () => fetchInstagramUserData());

  const { data: instagramUserPosts, isLoading: fetchingInstagramUserPosts } =
    useQuery(["instagramUserPosts"], () => fetchInstagramUserPostsData());

  const handlePostClick = (post) => {
    setSelectedPost(post);
  };

  const handleCloseModal = () => {
    setSelectedPost(null);
  };

  if (fetchingInstagramUserData || fetchingInstagramUserPosts) {
    return <Spinner />;
  }

  return (
    <div className="flex h-auto w-full flex-col rounded-3">
      <InstagramSectionBanner instagramUserData={instagramUserData} />
      <div className="mt-10 flex h-auto w-full items-center justify-center gap-12 bg-custom-gray-200">
        <HomeInstagramSectionCardSlider
          sliderData={instagramUserPosts}
          handlePostClick={handlePostClick}
        />
      </div>
      {selectedPost && (
        <InstagramPostModal
          selectedPost={selectedPost}
          onClick={handleCloseModal}
        />
      )}
    </div>
  );
};

export default HomeInstagramSection;
