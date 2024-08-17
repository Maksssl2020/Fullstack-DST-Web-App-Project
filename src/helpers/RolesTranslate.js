export const GetRole = (role) => {
  switch (role) {
    case "ADMIN": {
      return "Administrator";
    }
    case "REGISTERED": {
      return "Zarejestrowany";
    }
    case "VOLUNTEER": {
      return "Wolontariusz";
    }
    default: {
      return "NIEZNANY!";
    }
  }
};
