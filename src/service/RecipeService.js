// Login/Signup and Auth service page
const axios = require('axios')
const AuthService = require('./AuthService')
const url = 'http://localhost:8000/'
// const url = process.env.API_KEY

module.exports = {

    createRecipe: (data) => {
        console.log(AuthService.getToken())
        try {
            return axios.post(`${url}recipe/`, data,
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

    // get all recipes associated with user
    getRecipes: () => {
        try {
            return axios.get(`${url}recipe/`,
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

    getRecipeByID: (id) => {
        try {
            return axios.get( `${url}recipe/${id}`,
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

    updateRecipe: (id, data) => {
        try {
            return axios.put(`${url}recipe/${id}`, data,
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

    deleteRecipe: (id) => {
        try {
            return axios.delete(`${url}recipe/${id}`,
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