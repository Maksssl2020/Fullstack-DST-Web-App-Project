import { useMutation } from "react-query";
import { fetchPostData } from "../../helpers/api-integration/ForumPostsHandling.js";

function UseForumPostMutation(postId) {
  const {
    data: forumPostData,
    mutate: fetchForumPostData,
    isLoading: fetchingForumPostData,
  } = useMutation(["fetchForumPostData", postId], () => fetchPostData(postId));

  return { forumPostData, fetchForumPostData, fetchingForumPostData };
}

export default UseForumPostMutation;
