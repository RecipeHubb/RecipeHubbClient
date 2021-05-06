// Login/Signup and Auth service page
const axios = require("axios");
const AuthService = require("./AuthService");
let URL = require("../utility/appUrl");

module.exports = {
  getRecipes: async (data) => {
    try {
      return await axios.post(
        `${URL}public/recipe/search`,
        { query: data },
        {
          headers: {
            token: AuthService.getToken(),
          },
        }
      );
    } catch (err) {
      return err;
    }
  },
};
