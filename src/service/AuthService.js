// Login/Signup and Auth service page
const axios = require("axios");
let URL = "https://recipehubbapi.herokuapp.com/";

if (process.env.NODE_ENV === "development") {
  URL = "http://localhost:8000/";
}

module.exports = {
  register: (data) => {
    try {
      return axios.post(`${URL}user-auth/`, {
        userName: data.username,
        email: data.email,
        password: data.password,
        firstName: data.firstName,
        lastName: data.lastName,
        bio: data.bio,
        city: data.city,
      });
    } catch (err) {
      console.log(err);
      return { sucess: false };
    }
  },

  login: async (data) => {
    try {
      let query = null;
      if (data.email) query = { email: data.email };
      if (data.username) query = { userName: data.username };

      if (query) {
        const res = await axios.post(`${URL}user-auth/login`, {
          query,
          password: data.password,
        });

        let d = new Date();
        d.setTime(d.getTime() + 1 * 24 * 60 * 60 * 1000);
        let expires = "expires=" + d.toUTCString();
        const token =
          "token=" + res.data.token + ";" + "expires=" + expires + ";";
        document.cookie = token;

        //could create a helper function

        const user = await axios.get(`${URL}user/data`, {
          headers: {
            token: res.data.token,
          },
        });
        localStorage.setItem("user", JSON.stringify(user.data));
            return res;
      }
      return false

    } catch (err) {
      console.log(err);
    }
  },
};