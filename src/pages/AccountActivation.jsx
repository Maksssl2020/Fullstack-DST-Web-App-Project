import React, { useRef, useState } from "react";
import AnimatedPage from "../animation/AnimatedPage";
import toast from "react-hot-toast";
import { useMutation } from "react-query";
import { handleAccountActivation } from "../helpers/api-integration/AuthenticationHandling";
import { useNavigate } from "react-router-dom";
import Spinner from "../components/universal/Spinner";

const AccountActivation = () => {
  const inputRefs = useRef([]);
  const [code, setCode] = useState(Array(6).fill(""));
  const navigate = useNavigate();

  const { mutate: activateAccount, isLoading: activatingAccount } = useMutation(
    {
      mutationKey: ["activateAccount"],
      mutationFn: (code) => handleAccountActivation(code),
      onSuccess: () => {
        toast.success("Konto zostało aktywowane! Możesz się zalogować.");
        navigate("/sign-in");
      },
      onError: (error) => {
        console.log(error);
        if (error?.response?.data?.errorMessage?.includes("There is no code")) {
          toast.error("Podano nieprawidłowy kod!");
          setCode(Array(6).fill(""));
        }
        if (
          error?.response?.data?.errorMessage.includes(
            "Activation code has expired",
          )
        ) {
          toast.error("Kod aktywacyjny wygasł! Wysłano nowy e-mail z kodem.");
        }
      },
    },
  );

  const submitCode = () => {
    activateAccount(code);
  };

  const handleInputChange = (e, index) => {
    const num = e.target.value;
    if (/[^0-9]/.test(num)) return;
    const length = inputRefs.current.length;
    const newCode = [...code];
    newCode[index] = num;
    setCode(newCode);

    if (index < length - 1 && e.keyCode !== 8) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleInputKeyDown = (e, index) => {
    if (e.keyCode === 8 && index > 0) {
      const newCode = [...code];
      newCode[index - 1] = "";
      setCode(newCode);
      inputRefs.current[index - 1].focus();
    }
  };

  if (activatingAccount) {
    return <Spinner />;
  }

  return (
    <AnimatedPage>
      <div
        className={
          "w-full min-h-[550px] font-lato h-auto flex flex-col items-center py-8 bg-custom-gray-400"
        }
      >
        <div
          className={
            "w-[850px] border-4  items-center justify-center border-black gap-6 h-[350px] flex flex-col p-4 bg-custom-gray-200 rounded-2xl"
          }
        >
          <h1 className={"text-4xl font-bold self-center"}>
            Wpisz swój kod aktywacyjny
          </h1>
          <div className={"w-[75%] h-[75px] self-center flex justify-between"}>
            {code.map((number, index) => (
              <input
                key={index}
                value={number}
                type={"text"}
                maxLength={1}
                inputMode={"numeric"}
                className={
                  "h-full spinner-none bg-white focus:text-white focus:border-black focus:bg-custom-orange-200 focus:outline-none text-xl font-bold rounded-2xl w-[65px] text-center border-2 border-custom-gray-300"
                }
                onChange={(e) => handleInputChange(e, index)}
                onKeyUp={(e) => handleInputKeyDown(e, index)}
                ref={(ref) => (inputRefs.current[index] = ref)}
              />
            ))}
          </div>
          <button
            className={
              "h-[75px] rounded-2xl border-4 border-black text-xl bg-custom-orange-200 w-[75%] uppercase text-white font-bold"
            }
            onClick={submitCode}
          >
            Aktywuj Konto
          </button>
        </div>
      </div>
    </AnimatedPage>
  );
};

export default AccountActivation;
