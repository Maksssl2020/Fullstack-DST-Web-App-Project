import React, { useContext, useEffect, useState } from "react";
import MainBannerWithoutLogo from "../universal/MainBannerWithoutLogo";
import HomeNewsCardSlider from "../card-slider/HomeNewsCardSlider";
import { AuthContext } from "../../helpers/provider/AuthProvider";
import AddNewPostButton from "../universal/AddNewPostButton";
import axios from "../../helpers/AxiosConfig";

const HomeNewsSection = () => {
  const { role } = useContext(AuthContext);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    try {
      axios.get("/home/posts").then((response) => {
        setPosts(response.data);
        console.log(response.data);
        console.log(posts);
      });
    } catch (error) {
      console.log(error);
    }
  }, []);

  const handleHomeNewsPostDelete = (id, onClose) => {
    try {
      axios.delete(`/home/posts/delete-post/${id}`).then(() => {
        const postsCopy = [...posts];
        const filteredPosts = postsCopy.filter((post) => post.id !== id);
        setPosts(filteredPosts);
        onClose();
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex h-auto w-full flex-col bg-custom-gray-300">
      <div className="w-full relative h-[125px] flex justify-center items-center">
        <MainBannerWithoutLogo bannerTitle={"Tęczowe Wiadomości"} />
        {role === "ADMIN" && <AddNewPostButton link={"/home-news/add-post"} />}
      </div>
      <div className="h-auto flex justify-center w-full py-8">
        <HomeNewsCardSlider
          sliderData={posts}
          handlePostsDelete={handleHomeNewsPostDelete}
        />
      </div>
    </div>
  );
};

export default HomeNewsSection;
