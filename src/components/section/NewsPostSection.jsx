import React, { useContext, useEffect, useState } from "react";
import MainBannerWithoutLogo from "../universal/MainBannerWithoutLogo";
import { Masonry } from "@mui/lab";
import NewsPostCard from "../card/NewsPostCard";
import { AuthContext } from "../../helpers/provider/AuthProvider";
import axios from "../../helpers/AxiosConfig";
import {
  getHeightForPost,
  getRandomBackgroundColor,
} from "../../helpers/NewsPostStyling";
import Pagination from "../pagination/Pagination";
import PlusInCircleIcon from "../../icons/PlusInCircleIcon";
import { useNavigate } from "react-router-dom";

const NewsPostSection = () => {
  const { role } = useContext(AuthContext);
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    try {
      axios
        .get("/news", {
          params: {
            page: currentPage,
            size: 16,
          },
        })
        .then((response) => {
          setPosts(response.data.content);
          setTotalPages(response.data.totalPages);
        });
    } catch (error) {
      console.log(error);
    }
  }, [currentPage]);

  const handleDelete = async (postId, onClose) => {
    try {
      await axios.delete(`/news/delete-post/${postId}`);
      const postsCopy = [...posts];
      const filteredPosts = postsCopy.filter((post) => post.id !== postId);
      setPosts(filteredPosts);
      onClose();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className="flex relative w-full h-[125px] items-center justify-center">
        <MainBannerWithoutLogo bannerTitle="Tęczowe Aktualności" />
        {role === "ADMIN" && (
          <div className="w-[25%] px-6 h-[125px] absolute inset-0 items-center ml-auto flex">
            <button
              onClick={() => navigate("/news/add-post")}
              className="size-[64px] bg-white inset-0 rounded-full flex items-center justify-center "
            >
              <PlusInCircleIcon size={"size-14"} />
            </button>
          </div>
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
