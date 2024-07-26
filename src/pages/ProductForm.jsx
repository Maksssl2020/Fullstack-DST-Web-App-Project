import React, { useContext, useState } from "react";
import DefaultModal from "../components/modal/DefaultModal";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../helpers/provider/AuthProvider";
import FormItem from "../components/form/FormItem";
import axios from "../helpers/AxiosConfig";
import DropdownWithCheckboxes from "../components/dropdown/DropdownWithCheckboxes";

const ProductForm = () => {
  const { username } = useContext(AuthContext);
  const [title, setTitle] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [composition, setComposition] = useState("");
  const [overprint, setOverprint] = useState("");
  const [weight, setWeight] = useState("");
  const [packageSize, setPackageSize] = useState("");
  const [sizes, setSizes] = useState([]);
  const [categories, setCategories] = useState([]);
  const [color, setColor] = useState("");
  const [files, setFiles] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(sizes);
    console.log(categories);

    const formData = new FormData();
    formData.append("title", title);
    formData.append("name", name);
    formData.append("color", color);
    formData.append("description", description);
    formData.append("packageSize", packageSize);
    formData.append("weight", weight);
    formData.append("composition", composition);
    formData.append("overprint", overprint);
    formData.append("price", price);
    formData.append("sizes", sizes);
    formData.append("categories", categories);

    if (files) {
      Array.from(files).forEach((file, index) => {
        formData.append(`images`, file);
      });
    }
    console.log(formData);
    console.log(files);

    try {
      await axios.post("/products/add-product", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleFileChange = (e) => {
    const files = e.target.files;
    if (files) {
      setFiles(files);
    } else {
      setFiles(null);
    }
  };

  const formData = [
    {
      title: "Wpisz tytuł:",
      function: setTitle,
    },
    {
      title: "Wpisz pełną nazwę:",
      function: setName,
    },
    {
      title: "Wpisz kolor:",
      function: setColor,
    },
    {
      title: "Wpisz cenę:",
      function: setPrice,
    },
    {
      title: "Wpisz wagę:",
      function: setWeight,
    },
    {
      title: "Wpisz rozmiar paczki:",
      function: setPackageSize,
    },
    {
      title: "Wpisz skład:",
      function: setComposition,
    },
    {
      title: "Wpisz nadruk:",
      function: setOverprint,
    },
  ];

  const firstDropdownData = ["XS", "S", "M", "L", "XL"];
  const secondDropdownData = [
    "Ubrania",
    "Koszulki",
    "Bluzy",
    "Akcesoria",
    "Zawieszki",
    "Kubki",
    "Flagi",
    "Bidony",
    "Pióra",
    "Przypinki",
    "Skarpety",
  ];

  return (
    <div className="w-full font-lato h-auto flex justify-center">
      <div className="my-8 flex flex-col p-8 gap-6 w-[750px] h-auto border-4 items-center border-black rounded-2xl">
        <div className="w-full flex text-2xl font-bold items-center justify-between">
          <p>Jesteś zalogowany jako:</p>
          <p>{username}</p>
        </div>
        {formData.map((data, index) => (
          <FormItem
            key={index}
            labelData={data.title}
            type={"text"}
            onChangeAction={(e) => data.function(e.target.value)}
            inputStyling={
              "w-full bg-custom-gray-200 focus:outline-none focus:border-custom-orange-200 p-4 text-lg h-[50px] font-medium border-4 rounded-2xl border-black resize-none"
            }
            containerStyling={"font-bold text-xl"}
          />
        ))}
        <div className="w-[75%] flex gap-4 justify-between">
          <div className="gap-4 flex flex-col">
            <p className="font-bold text-xl">Wybierz rozmiary:</p>
            <DropdownWithCheckboxes
              title={"rozmiary"}
              options={firstDropdownData}
              selectedOptions={sizes}
              setChosenOptions={setSizes}
            />
          </div>
          <div className="gap-4 flex flex-col">
            <p className="font-bold text-xl">Wybierz kategorie:</p>
            <DropdownWithCheckboxes
              title={"Kategorie"}
              options={secondDropdownData}
              selectedOptions={categories}
              setChosenOptions={setCategories}
            />
          </div>
        </div>
        <div className="w-[75%]">
          <p className="text-xl font-bold ml-4">
            Wybierz zdjęcia ( maksymalnie 4 ):
          </p>
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleFileChange}
            className="w-full file:w-[25%] mt-2 file:border-0 border-4 border-black file:flex-wrap file:border-r-4 file:bg-custom-orange-200 file:text-white file:font-bold file:hover:bg-custom-orange-100 file:text-sm file:uppercase file:rounded-l-xl file:h-full h-[75px] font-bold text-lg flex text-black bg-custom-gray-200 rounded-2xl"
          />
        </div>
        <div className="w-[75%] h-[250px]">
          <p className="text-2xl font-bold ml-4">Wpisz opis:</p>
          <textarea
            value={description}
            maxLength={225}
            className="size-full mt-2 bg-custom-gray-200 focus:outline-none focus:border-custom-orange-200 p-4 text-xl border-4 rounded-2xl border-black resize-none"
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>
        <div className="flex w-full h-[70px] mt-16 text-2xl font-bold text-white gap-4">
          <button
            onClick={() => navigate("/")}
            className="w-full h-full bg-custom-orange-200 rounded-3xl uppercase"
          >
            Anuluj
          </button>
          <button
            onClick={handleSubmit}
            className="w-full h-full relative bg-custom-orange-200 rounded-3xl uppercase"
          >
            dodaj produkt
          </button>
        </div>
      </div>
      {openModal && (
        <DefaultModal
          modalTitle={"Post dodany"}
          modalSubtitle={
            "Nowy post w tęczowych wiadomościach został dodany! Dodaj kolejny lub przejdź na stronę główną."
          }
          fistButtonTitle={"Strona główna"}
          firstButtonLink={"/"}
          secondButtonTitle={"Pozostań na stronie"}
          secondButtonClickAction={() => setOpenModal(false)}
        />
      )}
    </div>
  );
};

export default ProductForm;
