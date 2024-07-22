import React, { useEffect, useState } from "react";
import InstagramSectionBanner from "../banner/InstagramSectionBanner.jsx";
import InstagramPostCard from "../card/InstagramPostCard.jsx";
import axios from "axios";
import HomeInstagramSectionCardSlider from "../card-slider/HomeInstagramSectionCardSlider";

const HomeInstagramSection = () => {
  const [posts, setPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);

  useEffect(() => {
    try {
      axios
        .get(
          "https://graph.instagram.com/me/media?fields=id,caption,media_url,permalink,media_type,thumbnail_url,like&access_token=IGQWRQSnhzN19sZA2cxUllzZAHFpYWo0ckxYalI3NGlNLWViSGd3cGlYdGJxWVJrOXlsVmxoY1h1M0JiRWM3ektDSWhTSHRkNl92cEZAPVTRlRXBvRWVCQ0VlOGhBeTd6MU1Kek1laW5qVXNlQnpEY0oyTVRBU1h5R0EZD",
        )
        .then((response) => {
          setPosts(response.data.data);
          console.log(response);
          console.log(posts);
        });
    } catch (error) {
      console.log(error);
    }
  }, []);

  const handlePostClick = (post) => {
    setSelectedPost(post);
  };

  const handleCloseModal = () => {
    setSelectedPost(null);
  };

  return (
    <div className="flex h-[600px] w-full flex-col rounded-lg bg-custom-blue-200">
      <InstagramSectionBanner />
      <div className="mt-10 flex h-[375px] w-full items-center justify-center gap-12 bg-custom-gray-200">
        <HomeInstagramSectionCardSlider
          sliderData={posts}
          handlePostClick={handlePostClick}
        />
      </div>
      {selectedPost && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="relative bg-white p-4 rounded-lg max-w-xl">
            <button
              className="absolute top-2 right-2"
              onClick={handleCloseModal}
            >
              X
            </button>
            <img
              src={selectedPost.media_url}
              alt={selectedPost.caption}
              className="w-full h-auto"
            />
            <p>{selectedPost.caption}</p>
            <a
              href={selectedPost.permalink}
              target="_blank"
              rel="noopener noreferrer"
            >
              View on Instagram
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default HomeInstagramSection;
