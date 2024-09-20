import React from "react";
import axios from "../../helpers/AxiosConfig.js";
import ForumPostCard from "../card/ForumPostCard.jsx";
import Pagination from "../pagination/Pagination.jsx";
import { useQuery } from "react-query";
import { fetchPostsData } from "../../helpers/api-integration/ForumPostsHandling.js";
import Spinner from "../universal/Spinner.jsx";

const ForumPostSection = () => {
  const [currentPage, setCurrentPage] = React.useState(0);

  const { data: postsData, isLoading: loadingPosts } = useQuery(
    ["forumPostsData", currentPage],
    () => fetchPostsData(currentPage),
  );

  if (loadingPosts) {
    return <Spinner />;
  }

  return (
    <>
      <ul className="w-full flex flex-col">
        {postsData.content.map((post, idx) => (
          <li className="w-full flex justify-center" key={idx}>
            <ForumPostCard postData={post} />
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
