import { useMutation } from "react-query";
import { fetchPostData } from "../../helpers/api-calls/ForumPostsHandling.js";

function UseForumPostMutation(postId) {
  const {
    data: forumPostData,
    mutate: fetchForumPostData,
    isLoading: fetchingForumPostData,
  } = useMutation(["forumPostData", postId], () => fetchPostData(postId));

  return { forumPostData, fetchForumPostData, fetchingForumPostData };
}

export default UseForumPostMutation;
