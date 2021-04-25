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
            return console.log(err)
        }
        
    },

    // get all recipes associated with ID
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
            console.log(err)
        }
        
    },

    // get 1 recipe with ID
    getRecipe: (data) => {
        console.log('here')
        try {
            axios.post(url, {
                username: data.username,
                email: data.email,
                password: data.password
            })
        }
        catch(err){
            console.log(err)
        }
        
    },
}