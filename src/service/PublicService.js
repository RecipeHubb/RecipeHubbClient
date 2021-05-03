// Login/Signup and Auth service page
const axios = require('axios')
let URL = process.env.API_URL || 'https://recipehubbapi.herokuapp.com/public/recipe/search'
if (process.env.NODE_ENV === "development") {
  URL = "http://localhost:8000/public/recipe/search";
}
module.exports = {
     getRecipes: async (data) => {
        try {
           const recipes = await axios.post(URL, {
               query: data
            })
            return recipes
        }
        catch(err){
            console.log(err)
        }
        
    },
}