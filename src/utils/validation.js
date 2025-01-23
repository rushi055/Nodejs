const validator = require("validator");

const validateSignupData=(req)=>{
    const {firstname,lastname,email,password} = req.body;

    if(!firstname || !lastname ){
        return {error: "Name is required"};
    }
    else if(validator.isEmpty(email)){
        return {error: "Email is required"};
    }
    else if(!validator.isStrongPassword(password)){
        return {error: "Password is not strong enough"};
    }
};

module.exports = {validateSignupData};