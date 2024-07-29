export const GetRole = (role) => {
  switch (role) {
    case "ADMIN": {
      return "Administrator";
    }
    case "REGISTERED": {
      return "Zarejestrowany";
    }
    default: {
      return "NIEZNANY!";
    }
  }
};
