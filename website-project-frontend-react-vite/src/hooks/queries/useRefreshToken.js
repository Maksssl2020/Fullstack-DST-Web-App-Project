import axios from "../../helpers/AxiosConfig.js";
import useAuthentication from "./useAuthentication.js";

function UseRefreshToken() {
  const { setAuthenticated } = useAuthentication();

  return async () => {
    const response = await axios.post(
      "/auth/refresh-token",
      {},
      {
        withCredentials: true,
      },
    );
    console.log(response.data);
    setAuthenticated((prev) => {
      return {
        ...prev,
        accessToken: response.data.accessToken,
      };
    });

    return response.data.accessToken;
  };
}

export default UseRefreshToken;
