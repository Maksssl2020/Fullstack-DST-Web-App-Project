import React from "react";
import AnimatedPage from "../animation/AnimatedPage";
import MainBannerWithoutLogo from "../components/universal/MainBannerWithoutLogo";
import { useParams } from "react-router-dom";
import CartItemsTable from "../components/table/CartItemsTable";
import ButtonWithLink from "../components/universal/ButtonWithLink";

const CartPage = () => {
  const { identifier } = useParams();

  return (
    <AnimatedPage>
      <div className="w-full gap-8 h-auto font-lato flex py-8 flex-col items-center bg-custom-gray-400">
        <MainBannerWithoutLogo bannerTitle={"Koszyk"} />
        <div className="w-[1650px] h-auto flex flex-col gap-4 items-center py-8 px-12 bg-custom-gray-100 rounded-2xl">
          <div className="w-[90%] h-[100px] bg-custom-gray-300 rounded-2xl"></div>
          <CartItemsTable cartIdentifier={identifier} />
          <div className="w-[90%] mt-12 flex justify-between">
            <ButtonWithLink
              link={"/rainbow-shop"}
              title={"Kontynuuj zakupy"}
              styling={
                "h-[75px] rounded-2xl flex items-center justify-center w-[350px] uppercase font-bold text-2xl bg-custom-gray-300 hover:bg-custom-orange-200 hover:text-white"
              }
            />
            <div className="w-[550px] h-[75px] flex justify-between text-white text-xl">
              <button className="w-[48%] h-full bg-custom-gray-300 rounded-2xl uppercase hover:bg-custom-orange-200">
                wyczyść
              </button>
              <button className="w-[48%] h-full bg-custom-gray-300 rounded-2xl uppercase hover:bg-custom-orange-200">
                odśwież
              </button>
            </div>
          </div>
        </div>
      </div>
    </AnimatedPage>
  );
};

export default CartPage;
