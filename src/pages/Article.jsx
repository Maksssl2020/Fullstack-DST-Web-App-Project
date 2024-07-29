import React, { useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import axios from "../helpers/AxiosConfig";
import AnimatedPage from "../animation/AnimatedPage";

const Article = () => {
  const { id } = useParams();
  const [title, setTitle] = React.useState("");
  const [content, setContent] = React.useState(null);
  const [author, setAuthor] = React.useState(0);
  const [creationDate, setCreationDate] = React.useState("");
  const [image, setImage] = React.useState(null);
  const textAreaRef = useRef(null);

  useEffect(() => {
    try {
      axios.get(`/articles/${id}`).then((response) => {
        setTitle(response.data.title);
        setContent(response.data.content);
        setAuthor(response.data.author);
        setCreationDate(response.data.creationDate);
        setImage(response.data.image);
        console.log(response);
        console.log(title);
      });
    } catch (error) {
      console.log(error);
    }
  });

  useEffect(() => {
    if (textAreaRef.current) {
      textAreaRef.current.style.height = "auto";
      textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`;
    }
  }, [content]);

  return (
    <AnimatedPage>
      <div className="w-full h-auto font-lato flex justify-center">
        <div className="w-[1250px] h-[2000px] mt-8 bg-custom-gray-200 flex flex-col p-24 rounded-2xl border-4 border-black">
          <div className="ml-3 w-full h-auto flex flex-col gap-3 text-xl italic font-bold">
            <div className="flex gap-6">
              <p>{author}</p>
              <p>{creationDate}</p>
            </div>
            <h1 className="mb-6 font-bold italic text-black text-5xl">
              {title}
            </h1>
          </div>

          <textarea
            ref={textAreaRef}
            value={content}
            disabled
            className="w-full bg-white p-6 text-justify text-2xl overflow-hidden resize-none rounded-2xl border-4 border-custom-orange-200 "
          ></textarea>
          {image && (
            <div className="w-full flex justify-center h-auto">
              <div className="bg-custom-gray-200 size-[450px] border-4 border-black rounded-2xl mt-8">
                <img
                  src={`data:image/png;base64,${image}`}
                  alt={title}
                  className="size-full inset-0 object-cover rounded-xl"
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </AnimatedPage>
  );
};

export default Article;
