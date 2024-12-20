import React, { useState } from "react";
import InstagramSectionBanner from "../banner/InstagramSectionBanner.jsx";
import HomeInstagramSectionCardSlider from "../card-slider/HomeInstagramSectionCardSlider.jsx";
import Spinner from "../universal/Spinner.jsx";
import InstagramPostModal from "../modal/InstagramPostModal.jsx";
import { AnimatePresence } from "framer-motion";
import useInstagramUser from "../../hooks/queries/useInstagramUser.js";
import useInstagramUserPosts from "../../hooks/queries/useInstagramUserPosts.js";
import { InstagramPost } from "../../models/InstagramPost";

const HomeInstagramSection = () => {
  const [selectedPostId, setSelectedPostId] = useState<number | null>();
  const { instagramUser, fetchingInstagramUser } = useInstagramUser();
  const { instagramUserPosts, fetchingInstagramUserPosts } =
    useInstagramUserPosts();

  const handlePostClick = (post: number) => {
    setSelectedPostId(post);
  };

  const handleCloseModal = () => {
    setSelectedPostId(null);
  };

  if (fetchingInstagramUser || fetchingInstagramUserPosts) {
    return <Spinner />;
  }

  return (
    <div className="rounded-3 flex h-auto w-full flex-col">
      <InstagramSectionBanner instagramUserData={instagramUser} />
      <div className="mt-10 flex h-auto w-full items-center justify-center gap-12 bg-custom-gray-200">
        <HomeInstagramSectionCardSlider
          sliderData={instagramUserPosts}
          handlePostClick={handlePostClick}
        />
      </div>
      <AnimatePresence>
        {selectedPostId && (
          <InstagramPostModal
            selectedPost={instagramUserPosts.find(
              (post: InstagramPost) => post.postId === selectedPostId,
            )}
            onClick={handleCloseModal}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default HomeInstagramSection;
