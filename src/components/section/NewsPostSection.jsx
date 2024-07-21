import React, { useContext, useEffect, useState } from "react";
import MainBannerWithoutLogo from "../universal/MainBannerWithoutLogo";
import ButtonWithLink from "../universal/ButtonWithLink";
import { Masonry } from "@mui/lab";
import NewsPostCard from "../card/NewsPostCard";
import { AuthContext } from "../../helpers/provider/AuthProvider";
import axios from "../../helpers/AxiosConfig";
import {
  getHeightForPost,
  getRandomBackgroundColor,
} from "../../helpers/NewsPostStyling";
import Pagination from "../pagination/Pagination";

const NewsPostSection = () => {
  const { role } = useContext(AuthContext);
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const getAllPosts = async (page) => {
    try {
      const response = await axios.get("/news", {
        params: {
          page: page,
          size: 16,
        },
      });

      setPosts(response.data.content);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (postId, onClose) => {
    try {
      console.log(postId);
      await axios.delete(`/news/delete-post/${postId}`);
      await getAllPosts(currentPage);
      onClose();
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getAllPosts(currentPage);
  }, [currentPage]);

  return (
    <>
      <div className="flex relative w-full h-[125px] items-center justify-center">
        <MainBannerWithoutLogo bannerTitle="Tęczowe Aktualności" />
        {role === "ADMIN" && (
          <ButtonWithLink
            title={"dodaj post"}
            link="/news/add-post"
            styling={
              "absolute mr-64 right-0 w-[250px] uppercase font-bold text-xl text-white h-[75px] flex items-center justify-center bg-custom-orange-200 rounded-2xl"
            }
          />
        )}
      </div>
      <div className="w-full relative flex flex-col justify-center bg-custom-gray-200 mt-4 p-4 h-auto">
        <Masonry columns={{ xl: 4, lg: 3, md: 2 }} spacing={5}>
          {posts.map((data, index) => (
            <NewsPostCard
              key={index}
              height={getHeightForPost(index)}
              backgroundColor={getRandomBackgroundColor()}
              cardData={data}
              handleDelete={handleDelete}
            />
          ))}
        </Masonry>
      </div>
      <div>
        <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          setCurrentPageFunc={setCurrentPage}
        />
      </div>
    </>
  );
};

export default NewsPostSection;
