import React from "react";
import AnimatedHoverButton from "../button/AnimatedHoverButton.jsx";

const CartPageOptionButtonsSection = ({
  mainContainerClassName,
  secondContainerClassName,
  deleteAllCartItems,
  isWithinModal = false,
}) => {
  return (
    <section className={mainContainerClassName}>
      <AnimatedHoverButton
        link={"/rainbow-shop"}
        backgroundColorOnInit={"#D0D0D0"}
        backgroundColorOnHover={"#FF5A5A"}
        className={`h-[75px] rounded-2xl flex items-center justify-center uppercase font-bold ${isWithinModal ? "w-full" : "w-[300px]"}`}
      >
        Kontynuuj zakupy
      </AnimatedHoverButton>
      <div className={secondContainerClassName}>
        <AnimatedHoverButton
          onClick={deleteAllCartItems}
          backgroundColorOnInit={"#D0D0D0"}
          backgroundColorOnHover={"#FF5A5A"}
          className={`h-[75px] bg-custom-gray-300 rounded-2xl uppercase ${isWithinModal ? "w-full" : "w-[45%] "}`}
        >
          wyczyść
        </AnimatedHoverButton>
        <AnimatedHoverButton
          backgroundColorOnInit={"#D0D0D0"}
          backgroundColorOnHover={"#FF5A5A"}
          className={`h-[75px] bg-custom-gray-300 rounded-2xl uppercase ${isWithinModal ? "w-full" : "w-[45%] "}`}
        >
          odśwież
        </AnimatedHoverButton>
      </div>
    </section>
  );
};

export default CartPageOptionButtonsSection;
