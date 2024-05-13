const {insertNewUser} = require('../utils/dbquery')
const bcrypt = require('bcrypt')
const saltround = Number(process.env.SALT)

function register(req, res){
    const user_data = req.body;

    if (user_data.email == undefined || user_data.email.length == 0){
        res.status(403).json("Please provide an valid email");
    }
    if(user_data.password == undefined || user_data.password.length < 6){
        res.status(403).json("Please provide an valid password");
    }
    if (user_data.username == undefined || user_data.username.length == 0){
        res.status(403).json("Please provide an valid email");
    }

    bcrypt.hash(user_data.password, saltround, async(err,hash)=>{
        if(err){
            console.log(err)
            return res.status(403).json("There is a problem creating an account. Try again after sometime.")
        }
        user_data.password = hash
        insertNewUser(res,user_data)
        
    });
    

}

module.exports = { register };