import axios from "axios";

const API_URL = "https://js-test-api.etnetera.cz/api/v1/login";

export const loginUser = async (username: string | undefined, password: string | undefined) => {
    return await axios
      .post(API_URL, {
        login: username,
        password: password,
      })
      .then((response) => {
        if (response.data.token) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }
  
        return response;
      });
  };
  export const logout = () => {
    localStorage.removeItem("user");
  };

  export const getCurrentUser = () => {
    const userStr = localStorage.getItem("user");
    if (userStr) return JSON.parse(userStr);

    return null;
  }

