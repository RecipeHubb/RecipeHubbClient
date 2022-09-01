// Login/Signup and Auth service page
const axios = require('axios')
const AuthService = require('./AuthService')
let URL = process.env.API_URL || 'https://recipehubbapi.herokuapp.com/'
module.exports = {

    createComment: (data) => {
        try {
            return axios.post(`${URL}comments/`, data,
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

    // get all comments associated with Recipe
    getCommentsToRecipe: (recipeId) => {
        try {
            return axios.get(`${URL}comments/${recipeId}/`,
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

    deleteComment: (id) => {
        try {
            return axios.delete(`${URL}comments/${id}`,
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
}
