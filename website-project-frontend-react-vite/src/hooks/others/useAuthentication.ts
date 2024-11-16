import { useSelector } from "react-redux";
import { RootState } from "../../redux/store/store";

const useAuthentication = () => {
  return useSelector(
    (state: RootState) => state.persistedReducer.authentication,
  );
};

export default useAuthentication;
