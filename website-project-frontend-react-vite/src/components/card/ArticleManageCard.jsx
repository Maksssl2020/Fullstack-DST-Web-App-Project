import React from "react";
import { DateParser } from "../../helpers/Date.js";
import AdminOptionsButtons from "../button/AdminOptionsButtons.jsx";
import { useMutation } from "react-query";
import { handleDeleteArticle } from "../../helpers/api-integration/ArticleDataHandling.js";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Spinner from "../universal/Spinner.jsx";
import useDeleteArticleMutation from "../../hooks/mutations/useDeleteArticleMutation.js";
import AdminManagementSectionColumn from "../table/AdminManagementSectionColumn.jsx";

const ArticleManageCard = ({ articleData }) => {
  const navigate = useNavigate();
  const { id, author, title, creationDate } = articleData;
  const { deleteArticle, deletingArticle } = useDeleteArticleMutation(
    id,
    () => {
      toast.success("Usunięto artykuł!");
      navigate(-1);
    },
  );

  if (deletingArticle) {
    return <Spinner />;
  }

  return (
    <div
      className={
        "w-full p-1 lg:h-[75px] bg-white rounded-xl border-2 border-black flex "
      }
    >
      <div
        className={
          "w-[85%] max-lg:gap-4 grid max-sm:grid-rows-3 max-sm:grid-cols-1 max-lg:grid-rows-2 max-lg:grid-cols-2 lg:grid-rows-1 lg:grid-cols-4"
        }
      >
        <AdminManagementSectionColumn
          name={"Autor:"}
          value={author}
          className={"max-sm:row-start-1 "}
        />
        <AdminManagementSectionColumn
          name={"Tytuł:"}
          value={title.length > 40 ? `${title.substring(0, 40)}...` : title}
          className={"max-sm:row-start-3 max-lg:row-start-2 sm:col-span-2"}
        />
        <AdminManagementSectionColumn
          name={"Data dodania:"}
          value={DateParser(creationDate)}
          className={"max-sm:row-start-2"}
        />
      </div>
      <div
        className={
          "w-[15%] h-auto flex relative max-sm:translate-y-[15%] max-lg:translate-y-[25%]"
        }
      >
        <AdminOptionsButtons
          buttonSize={"size-10"}
          iconSize={"size-8"}
          modalSubtitle={"Czy na pewno chcesz usunąć ten artykuł?"}
          buttonsClassname={"max-sm:flex-col"}
          editButtonLink={`/article/edit-article/${id}`}
          deleteFunction={deleteArticle}
        />
      </div>
    </div>
  );
};

export default ArticleManageCard;
