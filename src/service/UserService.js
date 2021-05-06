// Login/Signup and Auth service page
const axios = require("axios");
const AuthService = require("./AuthService");
let URL = require('../utility/appUrl')
module.exports = {
  updateProfile: async (data) => {
    try {
      return axios.put(`${URL}user/${data.oldEmail}`, data, {
        headers: {
          token: AuthService.getToken(),
        },
      });
    } catch (err) {
      console.log(err);
    }
  },

  getUserById: async (ownerId) => {
    try {
      return axios.get(`${URL}user/${ownerId}`, {
        headers: {
          token: AuthService.getToken(),
        },
      });
    } catch (err) {
      console.log(err);
    }
  },

  login: (data) => {
    console.log(data);
    try {
      axios.post(URL, {
        username: data.username,
        email: data.email,
        password: data.password,
      });
    } catch (err) {
      console.log(err);
    }
  },
};
