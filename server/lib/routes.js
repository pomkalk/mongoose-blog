var express = require('express');
var router = express.Router();
var User = require('../models/user.model');

var validationErrors = (errors) => {
    var res = {}
    Object.keys(errors.errors).forEach((key)=>{
        res[key] = errors.errors[key].message
    });
    return {errors: res};
}

router.post('/registration', (req, res)=>{
    var user = new User(req.body);
    if (!req.body.password || !req.body.password_confirm)
        user.invalidate('password', 'Passwords are not same.');
    if (req.body.password != req.body.password_confirm)
        user.invalidate('password', 'Passwords are not same.');
    user.save((err, user)=>{
        if (err) {
            if (err.code == 11000) {
                return res.json({"errors": {"email": "Email already exists"}});
            }
            return res.json(validationErrors(err));
        }
        res.json({message: "User created."});
    })
});

module.exports = router;