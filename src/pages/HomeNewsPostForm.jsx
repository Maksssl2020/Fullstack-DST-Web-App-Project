import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../helpers/provider/AuthProvider";
import { TodayDate } from "../helpers/Date";
import axios from "../helpers/AxiosConfig";
import { useParams } from "react-router-dom";

const HomeNewsPostForm = () => {
  const { id } = useParams();
  const { username } = useContext(AuthContext);
  const [file, setFile] = useState(null);
  const [content, setContent] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [test, setTest] = useState(null);

  useEffect(() => {
    if (id) {
      setIsEditing(true);
      axios.get(`/home/posts/${id}`).then((response) => {
        setContent(response.data.content);
        const imageData = response.data.image;
        const byteCharacters = atob(imageData);
        const byteNumbers = new Array(byteCharacters.length);
        for (let i = 0; i < byteCharacters.length; i++) {
          byteNumbers[i] = byteCharacters.charCodeAt(i);
        }

        const byteArr = new Uint8Array(byteNumbers);
        const blob = new Blob([byteArr], { type: "image/png" });
        console.log(blob);
        setFile(blob);
      });
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const postData = {
        content: content,
        author: username,
        creationDate: TodayDate(),
      };

      console.log(postData);
      console.log(file);
      console.log(test);
      if (isEditing) {
        await axios.put(
          `/home/posts/edit-post/${id}`,
          { ...postData, image: file },
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          },
        );
      } else {
        await axios.post(
          "/home/posts/add-post",
          {
            ...postData,
            image: file,
          },
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          },
        );
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleFileChange = (e) => {
    console.log(e.target.files[0]);
    const file = e.target.files[0];
    if (file) {
      setFile(file);
    } else {
      setFile(null);
    }
  };

  return (
    <div className="w-full font-lato h-auto flex justify-center">
      <div className="my-8 flex flex-col p-8 gap-6 w-[750px] h-[850px] border-4 border-black rounded-2xl">
        <div className="w-full flex text-2xl font-bold items-center justify-between">
          <p>Jesteś zalogowany jako:</p>
          <p>{username}</p>
        </div>
        <p className="text-2xl font-bold mt-6 ml-4">
          {isEditing ? "Zmień zdjęcie:" : "Wybierz zdjęcie:"}
        </p>
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="w-full file:w-[25%] file:border-0 border-4 border-black file:flex-wrap file:border-r-4 file:bg-custom-orange-200 file:text-white file:font-bold file:hover:bg-custom-orange-100 file:text-lg file:uppercase file:rounded-l-full file:h-full h-[75px] font-bold text-lg flex text-black bg-custom-gray-200 rounded-full"
        />
        <p className="text-2xl font-bold mt-6 ml-4">
          {isEditing ? "Zmień treść:" : "Wpisz treść:"}
        </p>
        <textarea
          value={content}
          maxLength={250}
          className="w-full bg-custom-gray-200 focus:outline-none focus:border-custom-orange-200 p-4 text-xl h-[65%] border-4 rounded-2xl border-black resize-none"
          onChange={(e) => setContent(e.target.value)}
        ></textarea>
        <div className="flex w-full h-[70px] text-3xl font-bold text-white gap-4">
          <button className="w-full h-full bg-custom-orange-200 rounded-3xl uppercase">
            Anuluj
          </button>
          <button
            onClick={handleSubmit}
            disabled={content.length < 5 || file === null}
            className="w-full h-full relative bg-custom-orange-200 rounded-3xl uppercase"
          >
            {isEditing ? "zaktualizuj post" : "dodaj post"}
            {(content.length < 5 || file === null) && (
              <div className="w-full absolute inset-0 h-full bg-black opacity-20 rounded-3xl"></div>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomeNewsPostForm;
