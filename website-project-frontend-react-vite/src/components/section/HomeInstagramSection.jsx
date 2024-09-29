import React, { useState } from "react";
import InstagramSectionBanner from "../banner/InstagramSectionBanner.jsx";
import HomeInstagramSectionCardSlider from "../card-slider/HomeInstagramSectionCardSlider.jsx";
import "./HomeInstagramSection.css";
import Spinner from "../universal/Spinner.jsx";
import InstagramPostModal from "../modal/InstagramPostModal.jsx";
import { AnimatePresence } from "framer-motion";
import useInstagramUser from "../../hooks/queries/useInstagramUser.js";
import useInstagramUserPosts from "../../hooks/queries/useInstagramUserPosts.js";

const HomeInstagramSection = () => {
  const [selectedPost, setSelectedPost] = useState(null);
  const { instagramUser, fetchingInstagramUser } = useInstagramUser();
  const { instagramUserPosts, fetchingInstagramUserPosts } =
    useInstagramUserPosts();

  const handlePostClick = (post) => {
    setSelectedPost(post);
  };

  const handleCloseModal = () => {
    setSelectedPost(null);
  };

  if (fetchingInstagramUser || fetchingInstagramUserPosts) {
    return <Spinner />;
  }

  return (
    <div className="flex h-auto w-full flex-col rounded-3">
      <InstagramSectionBanner instagramUserData={instagramUser} />
      <div className="mt-10 flex h-auto w-full items-center justify-center gap-12 bg-custom-gray-200">
        <HomeInstagramSectionCardSlider
          sliderData={instagramUserPosts}
          handlePostClick={handlePostClick}
        />
      </div>
      <AnimatePresence>
        {selectedPost && (
          <InstagramPostModal
            selectedPost={selectedPost}
            onClick={handleCloseModal}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default HomeInstagramSection;
