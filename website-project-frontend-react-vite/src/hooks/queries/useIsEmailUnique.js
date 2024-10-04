import { useQuery } from "react-query";
import { checkEmailIsUnique } from "../../helpers/api-integration/UserDataHandling.js";
import useAuthentication from "./useAuthentication.js";

function UseIsEmailUnique() {
  const { userId } = useAuthentication();

  const { refetch: isEmailUnique } = useQuery(
    ["isEmailUnique", userId],
    (enteredEmail) => {
      if (enteredEmail) {
        return checkEmailIsUnique(enteredEmail);
      }
    },
    {
      enabled: false,
    },
  );

  return { isEmailUnique };
}

export default UseIsEmailUnique;
