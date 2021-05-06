// issues with saving env on vercel
let URL = "https://recipehubbapi.herokuapp.com/";
if (process.env.NODE_ENV === "development") {
  URL = "http://localhost:8000/";
}

module.exports = URL