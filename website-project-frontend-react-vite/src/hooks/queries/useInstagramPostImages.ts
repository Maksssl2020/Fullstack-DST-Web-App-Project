import { useQuery } from "react-query";
import { fetchInstagramPostAllImages } from "../../helpers/api-calls/InstagramDataHandling.js";

function UseInstagramPostImages(instagramPostId) {
  const { data: instagramPostImages, isLoading: fetchingInstagramPostImages } =
    useQuery(["instagramPostImages", instagramPostId], () =>
      fetchInstagramPostAllImages(instagramPostId),
    );

  return { instagramPostImages, fetchingInstagramPostImages };
}

export default UseInstagramPostImages;
