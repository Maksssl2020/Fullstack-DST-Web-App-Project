import React, { useEffect } from "react";
import ForumPostCard from "../card/ForumPostCard.jsx";
import Pagination from "../pagination/Pagination.jsx";
import Spinner from "../universal/Spinner.jsx";
import useForumPosts from "../../hooks/queries/useForumPosts.js";

const ForumPostSection = () => {
  const [currentPage, setCurrentPage] = React.useState(() => {
    const savedCurrentPage = localStorage.getItem("currentForumPage");

    return savedCurrentPage ? Number(savedCurrentPage) : 0;
  });
  const { forumPosts, fetchingForumPosts, refetch } =
    useForumPosts(currentPage);

  useEffect(() => {
    refetch();
    localStorage.setItem("currentForumPage", currentPage);
  }, [currentPage, refetch]);

  if (fetchingForumPosts) {
    return <Spinner />;
  }

  return (
    <>
      <ul className="w-full flex flex-col">
        {forumPosts.content.map((post) => (
          <li className="w-full flex justify-center" key={post.id}>
            <ForumPostCard postData={post} />
          </li>
        ))}
      </ul>
      <Pagination
        totalPages={forumPosts.totalPages}
        currentPage={currentPage}
        setCurrentPageFunc={setCurrentPage}
      />
    </>
  );
};

export default ForumPostSection;
