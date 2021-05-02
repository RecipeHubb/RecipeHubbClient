// Login/Signup and Auth service page
const axios = require('axios')
let URL = process.env.API_URL || 'https://recipehubbapi.herokuapp.com/'
if (process.env.NODE_ENV === "development") {
  URL = "http://localhost:8000/";
}
module.exports = {

}