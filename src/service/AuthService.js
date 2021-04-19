// Login/Signup and Auth service page
const axios = require('axios')
// const url = 'http://recipeapi-env.eba-mrkgc9ge.us-east-1.elasticbeanstalk.com/'
const url2 = 'http://localhost:8000/'

module.exports = {

    register: (data) => {
        try {
            return axios.post(`${url2}user-auth/`, {
                username: data.username,
                email: data.email,
                password: data.password
            })
        }
        catch(err){
            console.log(err)
            return {sucess: false}
        }

    },

    login: async (data) => {
        try {
            const res = await axios.post(`${url2}user-auth/login`, {
                email: data.email,
                password: data.password
            })

        // set created user in Local Storage
        let expirationDate = new Date()
        expirationDate.getHours() + 2
        document.cookie = 'token=' + res.data.token + 'expires=' + expirationDate

        return res

        }
        catch(err){
            console.log(err)
        }
       
    },
}