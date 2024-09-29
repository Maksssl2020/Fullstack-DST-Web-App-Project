export const loginUserAction = (response) => ({
  type: "LOGIN",
  payload: { response },
});

export const logoutUserAction = () => ({
  type: "LOGOUT",
});
