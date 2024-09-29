import React from "react";
import EditIcon from "../../icons/EditIcon.jsx";
import DeleteIcon from "../../icons/DeleteIcon.jsx";
import { DateParser } from "../../helpers/Date.js";
import AdminOptionsButtons from "../button/AdminOptionsButtons.jsx";
import { useMutation } from "react-query";
import { handleDeleteArticle } from "../../helpers/api-integration/ArticleDataHandling.js";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Spinner from "../universal/Spinner.jsx";

const ArticleManageCard = ({ articleData }) => {
  const navigate = useNavigate();
  const { id, author, title, creationDate } = articleData;

  const { mutate: deleteArticle, isLoading: deletingArticle } = useMutation(
    [`deleteArticle${id}`, id],
    () => handleDeleteArticle(id),
    {
      onSuccess: () => {
        toast.success("Usunięto artykuł!");
        navigate(-1);
      },
    },
  );

  if (deletingArticle) {
    return <Spinner />;
  }

  return (
    <div
      className={
        "w-full p-1 h-[75px] bg-white rounded-xl border-4 border-black grid grid-cols-8"
      }
    >
      <div
        className={
          "h-full flex flex-col items-center justify-center col-span-2"
        }
      >
        <label className={"font-bold"}>Autor:</label>
        <p>{author}</p>
      </div>
      <div
        className={
          "h-full flex flex-col items-center justify-center col-span-3"
        }
      >
        <label className={"font-bold"}>Tytuł:</label>
        <p>{title.length > 50 ? `${title.substring(0, 50)}...` : title}</p>
      </div>
      <div
        className={
          "h-full flex flex-col items-center justify-center col-span-2"
        }
      >
        <label className={"font-bold"}>Data dodania:</label>
        <p>{DateParser(creationDate)}</p>
      </div>
      <div className={"h-full flex items-center gap-4 col-span-1 relative"}>
        <AdminOptionsButtons
          buttonSize={"size-10"}
          iconSize={"size-8"}
          modalSubtitle={"Czy na pewno chcesz usunąć ten artykuł?"}
          editButtonLink={`/article/edit-article/${id}`}
          deleteFunction={deleteArticle}
        />
      </div>
    </div>
  );
};

export default ArticleManageCard;
