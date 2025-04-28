const userModel = require('../models/user.model');


module.exports.createUser = async ({
    firstname, lastname, username, password
}) => {
    if (!firstname || !username || !password) {
        throw new Error('All fields are required');
    }
    const user = userModel.create({
        firstname,
        lastname,  
        username,
        password
    })

    return user;
}