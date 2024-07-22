import React, { useEffect, useState } from "react";
import InstagramSectionBanner from "../banner/InstagramSectionBanner.jsx";
import axios from "axios";
import HomeInstagramSectionCardSlider from "../card-slider/HomeInstagramSectionCardSlider";
import "./HomeInstagramSection.css";
import CloseIcon from "../drawer/icons/CloseIcon";

const HomeInstagramSection = () => {
  const [posts, setPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    try {
      axios
        .get(
          "https://graph.instagram.com/me/media?fields=username,id,caption,media_url,permalink,media_type,thumbnail_url,like&access_token=IGQWRQSnhzN19sZA2cxUllzZAHFpYWo0ckxYalI3NGlNLWViSGd3cGlYdGJxWVJrOXlsVmxoY1h1M0JiRWM3ektDSWhTSHRkNl92cEZAPVTRlRXBvRWVCQ0VlOGhBeTd6MU1Kek1laW5qVXNlQnpEY0oyTVRBU1h5R0EZD",
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
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setSelectedPost(null);
    setModalVisible(false);
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
        <div
          className={`fixed inset-0 z-50 flex transition-opacity ease-in-out duration-300 items-center justify-center bg-black backdrop-blur bg-opacity-60 ${modalVisible ? "opacity-100" : "opacity-0"}`}
        >
          <button
            className="absolute z-10 inset-0 text-white size-24 ml-auto mr-4 mt-4"
            onClick={handleCloseModal}
          >
            <CloseIcon size={"size-24"} />
          </button>
          <div
            className={`relative flex ease-in-out rounded-lg w-[1450px] h-[750px] transform transition-transform duration-300 ${modalVisible ? "scale-100" : "scale-0"}`}
          >
            <div className="w-[70%] h-full">
              <img
                src={selectedPost.media_url}
                alt={selectedPost.caption}
                className="w-full z-10 h-[750px] inset-0 self-center object-cover rounded-l-3xl"
              />
            </div>
            <div className="bg-custom-gray-100 relative h-[750px] flex w-[30%] flex-col rounded-r-3xl">
              <div className="w-full gap-4 justify-center items-center font-bold text-2xl flex h-[100px] bg-custom-gray-200 rounded-tr-xl">
                <img
                  className="size-20 inset-0 object-cover rounded-full"
                  src="/assets/images/website-logo.jpg"
                  alt={"logo"}
                />
                {selectedPost.username}
              </div>
              <textarea
                readOnly
                className="resize-none h-[75%] bg-custom-gray-100 focus:outline-none px-6 py-2"
              >
                {selectedPost.caption}
              </textarea>
              <a
                className={
                  "mt-auto h-[75px] w-[350px] flex justify-center items-center uppercase font-bold self-center text-white mb-4 button-gradient rounded-2xl"
                }
                href={selectedPost.permalink}
                target="_blank"
                rel="noopener noreferrer"
              >
                <p className="h-[70%] w-[95%] flex justify-center items-center border-4 border-white rounded-xl">
                  Zobacz na instagramie
                </p>
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HomeInstagramSection;
