import React, { useContext } from "react";
import PostBannerWithLogoAndDate from "../universal/PostBannerWithLogoAndDate";
import { AuthContext } from "../../helpers/provider/AuthProvider";
import EditIcon from "../../icons/EditIcon";
import { useNavigate } from "react-router-dom";

const HomeNewsCard = ({ cardData }) => {
  const { role } = useContext(AuthContext);
  const { id, content, author, creationDate, image } = cardData;
  const navigate = useNavigate();

  return (
    <div className="h-[650px] w-[450px] rounded-lg bg-white p-4">
      <div className="h-full w-full rounded-lg bg-custom-gray-100">
        <div className="relative z-20 h-[65%] w-full rounded-lg border-4 border-black bg-custom-gray-100">
          <img
            className="inset-0 z-20 h-full w-full rounded-lg object-cover"
            src={`data:image/png;base64,${image}`}
            alt={author}
          />
          {role === "ADMIN" && (
            <div className="absolute inset-0">
              <button
                onClick={() => navigate(`/home-news/edit-post/${id}`)}
                className="size-16 bg-white rounded-full flex items-center justify-center"
              >
                <EditIcon size={"size-12"} />{" "}
              </button>
            </div>
          )}
        </div>
        <div className="z-10 h-[40%] w-full -translate-y-7 rounded-b-lg bg-custom-gray-100 px-8 py-6">
          <PostBannerWithLogoAndDate
            authorName={"Dwie Strony Tęczy"}
            date={"09.02.2024"}
          />
          <p className="mt-4 text-justify">{content}</p>
        </div>
      </div>
    </div>
  );
};

export default HomeNewsCard;
