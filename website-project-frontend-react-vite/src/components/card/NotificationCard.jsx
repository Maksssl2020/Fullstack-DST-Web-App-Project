import React from "react";
import { Link, useNavigate } from "react-router-dom";
import CheckIcon from "../../icons/CheckIcon.jsx";
import Spinner from "../universal/Spinner.jsx";
import { DateTimeParser } from "../../helpers/Date.js";
import useMarkNotificationAsReadMutation from "../../hooks/mutations/useMarkNotificationAsReadMutation.js";
import IconButton from "../button/IconButton.jsx";
import DocumentIcon from "../../icons/DocumentIcon.jsx";
import CalendarIcon from "../../icons/CalendarIcon.jsx";
import { motion } from "framer-motion";

const NotificationCard = ({ data }) => {
  const navigate = useNavigate();
  const {
    id,
    message,
    notificationContentTitle,
    link,
    read,
    notificationType,
    createdAt,
  } = data;
  const { markNotificationAsRead, markingNotificationAsRead } =
    useMarkNotificationAsReadMutation();

  if (markingNotificationAsRead) {
    return <Spinner />;
  }

  const getIconDependsOnArticleType = () => {
    switch (notificationType) {
      case "ARTICLE":
        return <DocumentIcon className={"size-6"} />;
      case "EVENT":
        return <CalendarIcon className={"size-6"} />;
      default:
        return <DocumentIcon />;
    }
  };

  console.log(data);

  return (
    <button
      onClick={() => {
        if (!read) {
          markNotificationAsRead(id);
        }
        navigate(link);
      }}
      className="w-full h-[125px] bg-white border-4 border-custom-gray-300 rounded-2xl p-2 flex gap-4 items-center justify-center"
    >
      <motion.div
        initial={{ backgroundColor: "#FFFFFF", color: "#000000" }}
        animate={!read && { backgroundColor: "#FF5A5A", color: "#FFFFFF" }}
        exit={{ backgroundColor: "#FFFFFF", color: "#000000" }}
        className={
          "size-10 rounded-full border-2 border-black flex justify-center items-center"
        }
      >
        {getIconDependsOnArticleType()}
      </motion.div>
      <div className="flex flex-col h-full w-[80%] justify-center text-lg gap-2">
        <div className="w-full flex gap-4">
          {message}
          <span className="text-custom-orange-200">
            {`"${notificationContentTitle}"`}
          </span>
        </div>
        <h2 className={"mr-auto"}>{DateTimeParser(createdAt)}</h2>
      </div>
    </button>
  );
};

export default NotificationCard;
