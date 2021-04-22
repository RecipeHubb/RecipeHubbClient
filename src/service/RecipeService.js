// Login/Signup and Auth service page
const axios = require('axios')
const url = 'http://recipeapi-env.eba-mrkgc9ge.us-east-1.elasticbeanstalk.com/'

module.exports = {

    createRecipe: (data) => {
        console.log(data)
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

    getRecipe: (data) => {
        console.log(data)
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