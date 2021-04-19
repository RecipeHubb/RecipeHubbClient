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
        try {
            const res = await axios.post(`${url2}user-auth/login`, {
                email: data.email,
                password: data.password
            })

            let d = new Date();
            d.setTime(d.getTime() + 1 * 24 * 60 * 60 * 1000);
            let expires = "expires=" + d.toUTCString();
            const token = 'token=' + res.data.token + ';' + 'expires=' +  expires + ';'
            document.cookie = token

            //could create a helper function

            const user = await axios.get(`${url2}user/data`, {
                headers: {
                    token: res.data.token
                }
            })
            localStorage.setItem('user', JSON.stringify(user.data))
            
        return res

        }
        catch(err){
            console.log(err)
        }
       
    },
}