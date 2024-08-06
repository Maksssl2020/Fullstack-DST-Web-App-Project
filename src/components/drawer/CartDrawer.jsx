import React, { useContext } from "react";
import CloseIcon from "./icons/CloseIcon";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../helpers/provider/AuthProvider";
import DeleteIcon from "../../icons/DeleteIcon";
import ButtonWithLink from "../universal/ButtonWithLink";

const CartDrawer = ({ isOpen, closeFunction }) => {
  const { logout, isAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <div className="transition-all duration-300 ease-in-out">
      {isOpen && (
        <div
          onClick={closeFunction}
          className="fixed inset-0 z-30 bg-black bg-opacity-40 backdrop-blur-sm"
        ></div>
      )}

      <div
        className={`font-lato flex-col right-0 top-0 flex z-30 overflow-y-auto transition-transform fixed h-screen w-[490px] bg-custom-gray-200 ${isOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="flex flex-col items-center w-full px-8 py-14">
          <button
            className="rounded-full h-fit ml-auto"
            onClick={closeFunction}
          >
            <CloseIcon size="size-12" />
          </button>
          <div className="flex flex-col w-full h-auto mt-6">
            <h1 className="font-bold text-4xl">Koszyk</h1>
            <div className="w-full h-auto gap-4 mt-8">
              <div className="w-full flex items-center border-4 border-black rounded-2xl pr-2">
                <div className="size-[125px] rounded-l-2xl flex items-center justify-center rounded-2xl">
                  <img
                    className="size-full inset-0 object-cover self-center"
                    src="/assets/images/Test_T_Shirt_Photo.png"
                    alt={""}
                  />
                </div>
                <div className="w-auto h-[125px] p-2 flex flex-col">
                  <p className="text-lg">koszulka modnie w Tęczy - xs</p>
                  <p className="text-[20px]">1 x 89,50</p>
                </div>
                <button className="size-10 ml-auto bg-white rounded-full justify-center items-center flex">
                  <CloseIcon size={"size-10"} />
                </button>
              </div>
            </div>
            <div className="w-full h-auto flex text-lg px-2 justify-between mt-4">
              <p>Kwota:</p>
              <p>89,50 zł</p>
            </div>
          </div>
          <div className="w-full h-auto flex flex-col px-2 gap-4 mt-8">
            <ButtonWithLink
              link={""}
              title={"Zobacz koszyk"}
              styling={
                "w-full h-[75px] bg-custom-gray-300 rounded-2xl hover:bg-custom-orange-200 text-white uppercase text-2xl flex justify-center items-center"
              }
              closeModal={undefined}
            />
            <ButtonWithLink
              link={""}
              title={"kup teraz"}
              styling={
                "w-full h-[75px] bg-custom-gray-300 rounded-2xl hover:bg-custom-orange-200 text-white uppercase text-2xl flex justify-center items-center"
              }
              closeModal={undefined}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartDrawer;
