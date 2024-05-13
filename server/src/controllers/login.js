const {getUserByEmail} = require('../utils/dbquery')

function login(req, res){
    const user_data = req.body;
    
    if (user_data.email == undefined || user_data.email.length == 0){
        res.status(403).json("Please provide an valid email");
    }
    if(user_data.password == undefined || user_data.password.length < 6){
        res.status(403).json("Please provide an valid password")
    }
    getUserByEmail(res,user_data)

}   

module.exports = { login };