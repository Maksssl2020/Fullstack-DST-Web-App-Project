import React, { useContext, useState } from "react";
import DefaultModal from "../components/modal/DefaultModal";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../helpers/provider/AuthProvider";
import FormItem from "../components/form/FormItem";
import axiosConfig from "../helpers/AxiosConfig";

const ProductForm = () => {
  const { username } = useContext(AuthContext);
  const [title, setTitle] = useState("Modnie Kolorowo");
  const [name, setName] = useState("Koszulka bawełniana Tęcza x Elen");
  const [description, setDescription] = useState(
    "Bawełniany, jasno-czerwony T-shirt. Z przodu z nadrukiem w tęczowych kolorach i identycznym tyłem.",
  );
  const [price, setPrice] = useState("135");
  const [composition, setComposition] = useState("100% bawełna");
  const [overprint, setOverprint] = useState("sitodruk");
  const [weight, setWeight] = useState("0.2 kg");
  const [packageSize, setPackageSize] = useState("25 x 20 x 15 (cm)");
  const [sizes, setSizes] = useState(["XS", "S", "M", "L", "XL"]);
  const [categories, setCategories] = useState([
    "Ubrania",
    "Koszulki",
    "Bluzy",
  ]);
  const [color, setColor] = useState("różowy");
  const [file, setFile] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    try {
      axiosConfig.post(
        "/products/add-product",
        {
          title: title,
          name: name,
          color: color,
          description: description,
          packageSize: packageSize,
          weight: weight,
          composition: composition,
          overprint: overprint,
          price: price,
          sizes: sizes,
          categories: categories,
          images: file,
        },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );
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
      <div className="my-8 flex flex-col p-8 gap-6 w-[750px] h-[2500px] border-4 items-center border-black rounded-2xl">
        <div className="w-full flex text-2xl font-bold items-center justify-between">
          <p>Jesteś zalogowany jako:</p>
          <p>{username}</p>
        </div>
        <FormItem
          labelData={"Wpisz tytuł:"}
          type={"text"}
          onChangeAction={(e) => setTitle(e.target.value)}
          inputStyling={
            "w-full bg-custom-gray-200 focus:outline-none focus:border-custom-orange-200 p-4 text-xl h-[50px] border-4 rounded-2xl border-black resize-none"
          }
        />
        <FormItem
          labelData={"Wpisz pełną nazwę:"}
          type={"text"}
          onChangeAction={(e) => setName(e.target.value)}
          inputStyling={
            "w-full bg-custom-gray-200 focus:outline-none focus:border-custom-orange-200 p-4 text-xl h-[50px] border-4 rounded-2xl border-black resize-none"
          }
        />
        <FormItem
          labelData={"Wpisz cenę:"}
          type={"text"}
          onChangeAction={(e) => setPrice(e.target.value)}
          inputStyling={
            "w-full bg-custom-gray-200 focus:outline-none focus:border-custom-orange-200 p-4 text-xl h-[50px] border-4 rounded-2xl border-black resize-none"
          }
        />
        <FormItem
          labelData={"Wpisz wagę:"}
          type={"text"}
          onChangeAction={(e) => setWeight(e.target.value)}
          inputStyling={
            "w-full bg-custom-gray-200 focus:outline-none focus:border-custom-orange-200 p-4 text-xl h-[50px] border-4 rounded-2xl border-black resize-none"
          }
        />
        <FormItem
          labelData={"Wpisz rozmiar paczki:"}
          type={"text"}
          onChangeAction={(e) => setPackageSize(e.target.value)}
          inputStyling={
            "w-full bg-custom-gray-200 focus:outline-none focus:border-custom-orange-200 p-4 text-xl h-[50px] border-4 rounded-2xl border-black resize-none"
          }
        />
        <FormItem
          labelData={"Wpisz kategorie:"}
          type={"text"}
          inputStyling={
            "w-full bg-custom-gray-200 focus:outline-none focus:border-custom-orange-200 p-4 text-xl h-[50px] border-4 rounded-2xl border-black resize-none"
          }
        />
        <FormItem
          labelData={"Wpisz rozmiary:"}
          type={"text"}
          inputStyling={
            "w-full bg-custom-gray-200 focus:outline-none focus:border-custom-orange-200 p-4 text-xl h-[50px] border-4 rounded-2xl border-black resize-none"
          }
        />
        <p className="text-2xl font-bold mt-6 ml-4">Wybierz zdjęcie:</p>
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="w-full file:w-[25%] file:border-0 border-4 border-black file:flex-wrap file:border-r-4 file:bg-custom-orange-200 file:text-white file:font-bold file:hover:bg-custom-orange-100 file:text-lg file:uppercase file:rounded-l-full file:h-full h-[75px] font-bold text-lg flex text-black bg-custom-gray-200 rounded-full"
        />
        <p className="text-2xl font-bold mt-6 ml-4">"Wpisz treść:"</p>
        <textarea
          value={description}
          maxLength={225}
          className="w-full bg-custom-gray-200 focus:outline-none focus:border-custom-orange-200 p-4 text-xl h-[15%] border-4 rounded-2xl border-black resize-none"
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
        <div className="flex w-full h-[70px] text-3xl font-bold text-white gap-4">
          <button
            onClick={() => navigate("/")}
            className="w-full h-full bg-custom-orange-200 rounded-3xl uppercase"
          >
            Anuluj
          </button>
          <button
            onClick={handleSubmit}
            // disabled={d.length < 5 || file === null}
            className="w-full h-full relative bg-custom-orange-200 rounded-3xl uppercase"
          >
            dodaj post
            {/*{(content.length < 5 || file === null) && (*/}
            {/*  <div className="w-full absolute inset-0 h-full bg-black opacity-20 rounded-3xl"></div>*/}
            {/*)}*/}
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
