// Login/Signup and Auth service page
const axios = require('axios')
// const prod = 'http://recipeapi-env.eba-mrkgc9ge.us-east-1.elasticbeanstalk.com/'
const dev = 'http://localhost:8000/'

module.exports = {

    register: (data) => {
        try {
            return axios.post(`${dev}user-auth/`, {
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
        // fconsole.log(data)
        let res = {}
        try {
            res = await axios.post(`${dev}user-auth/login`, {
                email: data.email,
                password: data.password
            })
        }
        catch(err){
            console.log(err)
        }
        console.log(res)
        // set created user in Local Storage
        let expirationDate = new Date()
        expirationDate.getHours() + 2
        console.log(expirationDate)
        document.cookie = `token=${res.data.token}; expires=${expirationDate}`
        console.log(document.cookie)
        localStorage.setItem('token', res.data.token)
    },
}