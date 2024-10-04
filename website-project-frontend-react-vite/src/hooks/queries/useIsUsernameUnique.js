import React from "react";
import { useQuery } from "react-query";
import { checkUsernameIsUnique } from "../../helpers/api-integration/UserDataHandling.js";
import useAuthentication from "./useAuthentication.js";

function UseIsUsernameUnique() {
  const { userId } = useAuthentication();

  const { refetch: isUsernameUnique } = useQuery(
    ["isUsernameUnique", userId],
    (enteredUsername) => {
      if (enteredUsername) {
        return checkUsernameIsUnique(enteredUsername);
      }
    },
  );

  return { isUsernameUnique };
}

export default UseIsUsernameUnique;
