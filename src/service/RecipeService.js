// Login/Signup and Auth service page
const axios = require("axios");
const AuthService = require("./AuthService");
let URL = require("../utility/appUrl");
module.exports = {
  createRecipe: (data) => {
    try {
      return axios.post(`${URL}recipe/`, data, {
        headers: {
          token: AuthService.getToken(),
        },
      });
    } catch (err) {
      return err;
    }
  },

  // get all recipes associated with user
  getRecipes: () => {
    try {
      return axios.get(`${URL}recipe/user/`, {
        headers: {
          token: AuthService.getToken(),
        },
      });
    } catch (err) {
      return err;
    }
  },

  // get all Public recipes
  getPublicRecipes: () => {
    try {
      return axios.get(`${URL}public/recipe/`, {
        headers: {
          token: AuthService.getToken(),
        },
      });
    } catch (err) {
      return err;
    }
  },

  getRecipeByID: (id) => {
    try {
      return axios.get(`${URL}recipe/${id}`, {
        headers: {
          token: AuthService.getToken(),
        },
      });
    } catch (err) {
      return err;
    }
  },

  updateRecipe: (id, data) => {
    try {
      return axios.put(`${URL}recipe/${id}`, data, {
        headers: {
          token: AuthService.getToken(),
        },
      });
    } catch (err) {
      return err;
    }
  },

  deleteRecipe: (id) => {
    try {
      return axios.delete(`${URL}recipe/${id}`, {
        headers: {
          token: AuthService.getToken(),
        },
      });
    } catch (err) {
      return err;
    }
  },
};
