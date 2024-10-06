import { useQuery } from "react-query";
import { fetchPostUsersComments } from "../../helpers/api-integration/ForumPostsHandling.js";

function useForumPostComments(forumPostId) {
  const { data: forumPostComments, isLoading: fetchingForumPostComments } =
    useQuery(["forumPostComments", forumPostId], () =>
      fetchPostUsersComments(forumPostId),
    );

  return { forumPostComments, fetchingForumPostComments };
}

export default useForumPostComments;
