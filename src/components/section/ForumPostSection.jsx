import React from "react";
import axios from "../../helpers/AxiosConfig";
import ForumPostCard from "../card/ForumPostCard";
import Pagination from "../pagination/Pagination";
import { useQuery } from "react-query";
import { fetchPostsData } from "../../helpers/api-integration/ForumPostsHandling";
import Spinner from "../universal/Spinner";

const ForumPostSection = () => {
  const [currentPage, setCurrentPage] = React.useState(0);

  const { data: postsData, isLoading: loadingPosts } = useQuery(
    ["forumPostsData", currentPage],
    () => fetchPostsData(currentPage),
  );

  if (loadingPosts) {
    return <Spinner />;
  }

  const handlePostDelete = async (postId, onClose) => {
    try {
      await axios.delete(`/forum/posts/delete-post/${postId}`);
      await fetchPostsData(currentPage);
      onClose();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <ul className="w-full flex flex-col">
        {postsData.content.map((post, idx) => (
          <li className="w-full flex justify-center" key={idx}>
            <ForumPostCard postData={post} handleDelete={handlePostDelete} />
          </li>
        ))}
      </ul>
      <Pagination
        totalPages={postsData.totalPages}
        currentPage={currentPage}
        setCurrentPageFunc={setCurrentPage}
      />
    </>
  );
};

export default ForumPostSection;
