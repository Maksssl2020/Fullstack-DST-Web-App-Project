import React, { useEffect } from "react";
import axios from "../../helpers/AxiosConfig";
import ForumPostCard from "../card/ForumPostCard";
import Pagination from "../pagination/Pagination";

const ForumPostSection = () => {
  const [posts, setPosts] = React.useState([]);
  const [currentPage, setCurrentPage] = React.useState(0);
  const [totalPages, setTotalPages] = React.useState(0);

  const fetchPostsData = async (page) => {
    try {
      const response = await axios.get("/forum/posts", {
        params: {
          page: page,
          size: 8,
        },
      });
      setPosts(response.data.content);
      setTotalPages(response.data.totalPages);
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  const handlePostDelete = async (postId, onClose) => {
    try {
      await axios.delete(`/forum/posts/delete-post/${postId}`);
      await fetchPostsData(currentPage);
      onClose();
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchPostsData(currentPage);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [currentPage]);

  return (
    <>
      <ul className="w-full flex flex-col">
        {posts.map((post, idx) => (
          <li className="w-full flex justify-center" key={idx}>
            <ForumPostCard postData={post} handleDelete={handlePostDelete} />
          </li>
        ))}
      </ul>
      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        setCurrentPageFunc={setCurrentPage}
      />
    </>
  );
};

export default ForumPostSection;
