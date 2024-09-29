const initialState = {
  isAuthenticated: false,
  accessToken: null,
  refreshToken: null,
  role: null,
};

const authenticationReducer = (state = initialState, action) => {
  console.log(action);
  switch (action.type) {
    case "LOGIN":
      return {
        isAuthenticated: true,
        accessToken: action.payload.response.accessToken,
        refreshToken: action.payload.response.refreshToken,
        role: action.payload.response.role,
      };
    case "LOGOUT":
      return initialState;
    default:
      return state;
  }
};

export default authenticationReducer;
