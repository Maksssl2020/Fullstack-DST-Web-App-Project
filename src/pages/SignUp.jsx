import React, { useState } from "react";
import MainBannerWithoutLogo from "../components/universal/MainBannerWithoutLogo";
import FormItem from "../components/form/FormItem";
import { useNavigate } from "react-router-dom";
import AnimatedPage from "../animation/AnimatedPage";
import axios from "../helpers/AxiosConfig";

const SignUp = () => {
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [dateOfBirth, setDateOfBirth] = React.useState("");
  const [password, setPassword] = useState("");
  const [retypePassword, setRetypePassword] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleRegister = async (event) => {
    event.preventDefault();

    if (password !== retypePassword) {
      setErrors({ retypePassword: "Hasła powinny być identyczne!" });
      return;
    }

    try {
      await axios.post("/auth/register", {
        firstName: firstName,
        lastName: lastName,
        username: username,
        email: email,
        dateOfBirth: dateOfBirth,
        password: password,
        accountCreationDate: new Date().toISOString(),
      });
      navigate("/");
    } catch (error) {
      const errorsMessages = {};
      let errorData = [];

      if (error.response.data.validationErrors) {
        errorData.push(error.response.data.validationErrors);
      }
      if (error.response.data.error) {
        errorData.push(error.response.data.error);
      }

      errorData.forEach((error) => {
        if (error.toString().includes("First name")) {
          errorsMessages.firstName = "Imię nie może być puste!";
        }
        if (error.toString().includes("Last name")) {
          errorsMessages.lastName = "Nazwisko nie może być puste!";
        }
        if (error.toString().includes("Password")) {
          errorsMessages.password = "Hasło musi mieć conajmniej 8 znaków!";
        }
        if (error.toString().includes("Email cannot be blank")) {
          errorsMessages.email = "Nieprawidłowy e-mail!";
        }
        if (error.toString().includes("(email)=")) {
          errorsMessages.email = "Podany adres e-mail istnieje w bazie!";
        }
        if (error.toString().includes("Username cannot be blank")) {
          errorsMessages.username = "Nieprawidłowa nazwa użytkownika!";
        }
        if (error.toString().includes("(username)=")) {
          errorsMessages.username =
            "Podana nazwa użytkownika istnieje w bazie!";
        }
        if (error.toString().includes("Date of birth")) {
          errorsMessages.dateOfBirth = "Data urodzenia nie może być pusta!";
        }
        if (error.toString().includes("Date must be in the past")) {
          errorsMessages.dateOfBirth = "Data urodzenia musi być w przeszłości!";
        }
      });

      console.log(errorsMessages);
      console.log(error);
      setErrors(errorsMessages);
    }
  };

  console.log(errors);
  console.log(password);
  console.log(retypePassword);

  const formData = [
    {
      title: "Imię",
      type: "text",
      function: setFirstName,
      errors: errors.firstName,
    },
    {
      title: "Nazwisko",
      type: "text",
      function: setLastName,
      errors: errors.lastName,
    },
    {
      title: "Nazwa użytkownika",
      type: "text",
      function: setUsername,
      errors: errors.username,
    },
    {
      title: "E-mail",
      type: "text",
      function: setEmail,
      errors: errors.email,
    },
    {
      title: "Data urodzenia",
      type: "date",
      function: setDateOfBirth,
      errors: errors.dateOfBirth,
    },
    {
      title: "Hasło",
      type: "password",
      function: setPassword,
      errors: errors.password,
    },
    {
      title: "Powtórz hasło",
      type: "password",
      function: setRetypePassword,
      errors: errors.retypePassword,
    },
  ];

  return (
    <AnimatedPage>
      <div className="font-lato pt-8 w-full bg-custom-gray-300 flex flex-col items-center justify-center h-auto">
        <MainBannerWithoutLogo bannerTitle={"Zarejestruj się"} />
        <form
          onSubmit={handleRegister}
          className="w-[850px] p-8 flex flex-col items-center rounded-2xl my-12 h-auto bg-custom-gray-100"
        >
          {formData.map((data, index) => (
            <FormItem
              labelData={data.title}
              type={data.type}
              inputStyling={"focus:border-custom-orange-100"}
              onChangeAction={(event) => data.function(event.target.value)}
              errors={data.errors}
            />
          ))}
          <button
            type={"submit"}
            className="bg-custom-orange-200 mt-8 text-2xl w-[75%] h-[50px] rounded-full text-white uppercase font-bold"
          >
            Zarejestruj się
          </button>
        </form>
      </div>
    </AnimatedPage>
  );
};

export default SignUp;
