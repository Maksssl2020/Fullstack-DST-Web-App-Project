import React from "react";
import AnimatedPage from "../animation/AnimatedPage.jsx";
import { useParams } from "react-router-dom";
import DefaultModal from "../components/modal/DefaultModal.jsx";
import ButtonWithLink from "../components/universal/ButtonWithLink.jsx";
import Spinner from "../components/universal/Spinner.jsx";
import OrderUserViewCard from "../components/card/OrderUserViewCard.jsx";
import useUserOrders from "../hooks/queries/useUserOrders.js";

const UserOrdersPage = () => {
  const { userId } = useParams();
  const { userOrders, fetchingUserOrders } = useUserOrders(userId);

  if (fetchingUserOrders) {
    return <Spinner />;
  }

  console.log(userOrders);

  return (
    <AnimatedPage>
      <div className="w-full min-h-[550px] h-auto flex flex-col items-center py-8 bg-custom-gray-400">
        {userOrders?.length === 0 && (
          <DefaultModal
            title={"Brak zamówień"}
            subtitle={"Złóż zamówienie w sklepie!"}
            blur={"backdrop-blur-xl"}
          >
            <div className={"flex gap-4"}>
              <ButtonWithLink
                title={"Strona główna"}
                link={"/"}
                className={
                  "uppercase font-bold text-white rounded-2xl bg-custom-orange-200 h-[75px] w-[250px] text-xl flex items-center justify-center border-4 border-black"
                }
              />
              <ButtonWithLink
                title={"Sklep"}
                link={"/rainbow-shop"}
                className={
                  "uppercase font-bold text-white rounded-2xl bg-custom-orange-200 h-[75px] w-[250px] text-xl flex items-center justify-center border-4 border-black"
                }
              />
            </div>
          </DefaultModal>
        )}
        <div
          className={
            "w-[1150px] h-auto bg-custom-gray-100 rounded-2xl flex flex-col p-4 gap-4"
          }
        >
          <div className={"w-full h-auto flex flex-col gap-4"}>
            {userOrders?.map((data, index) => (
              <OrderUserViewCard key={index} orderData={data} />
            ))}
          </div>
        </div>
      </div>
    </AnimatedPage>
  );
};

export default UserOrdersPage;
