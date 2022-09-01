// Login/Signup and Auth service page
const axios = require("axios");
const AuthService = require('./AuthService')
let URL = process.env.API_URL || 'https://recipehubbapi.herokuapp.com/public'

module.exports = {
    getRecipes: async (data) => {
        try {
            return await axios.post(`${URL}/recipe/search`, {query: data},
                {
                    headers: {
                        token: AuthService.getToken()
                    }
                }
            )
        }
        catch(err){
            return err
        }

    },


};
