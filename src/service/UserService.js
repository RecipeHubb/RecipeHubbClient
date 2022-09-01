// Login/Signup and Auth service page
const axios = require('axios');
const AuthService = require('./AuthService');
let URL = process.env.API_URL || 'https://recipehubbapi.herokuapp.com/'

module.exports = {

    updateProfile: async (data) => {
        try {
            return axios.put(`${URL}user/${data.oldEmail}`, data, {
                headers: {
                    token: AuthService.getToken()
                }
            })
        }
        catch(err){
            console.log(err)
        }
    },

    login: (data) => {
        console.log(data)
        try {
            axios.post(URL, {
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
