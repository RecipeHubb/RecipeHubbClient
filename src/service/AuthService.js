// Login/Signup and Auth service page
const axios = require("axios");
let URL = process.env.API_URL || 'https://recipehubbapi.herokuapp.com/'
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
      return false;
    } catch (err) {
      console.log(err);
    }
  },

  updateUser: async (data) => {
    try {
      return axios.put(`${URL}user-auth/`, data, {
          headers: {
              token: this.getToken
          }
      })
    }
    catch(err){
        console.log(err)
    }
  },

  getToken: function() {


    let token = document.cookie
      .split("; ")
      .find((row) => row.startsWith("token="))

//handles undefined token on split
      if(token) {
      token = token.
      split("=")[1];

        return token
      }

      return null
  },
  clearToken: function() {
    document.cookie ="token=;"
  },
  logOut: function() {
    localStorage.clear()
    this.clearToken()
    
    // pushes to home page and refreshes the page for new nav
    this.$router.push('/login')
    // this.$router.go(0)
  },
};
