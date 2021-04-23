// Login/Signup and Auth service page
const axios = require('axios')
const AuthService = require('./AuthService')
const url = 'http://localhost:8000/'
// const url = process.env.API_KEY

module.exports = {

    createRecipe: (data) => {
        try {
            return axios.post(`${url}recipe/`, {
                data,
                headers: {
                    token: AuthService.getToken()
                }
            })
        }
        catch(err){
            return console.log(err)
        }
        
    },

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