var express = require('express');
var router = express.Router();
var User = require('../models/user.model');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var config = require('./config');

var validationErrors = (errors) => {
    var res = {}
    Object.keys(errors.errors).forEach((key)=>{
        res[key] = errors.errors[key].message
    });
    return {errors: res};
}

router.post('/registration', (req, res)=>{

    req.check('email')
        .notEmpty().withMessage('Cant be empty')
        .isEmail().withMessage('Bad email format')
        .custom((value) => {
            return User.findOne({email: value}).then(user => {
                if (user) 
                    return Promise.reject();
            });
        }).withMessage('User already exists');
    req.check('password')
        .notEmpty().withMessage('Пароль не может быть пустым')
        .equals(req.body.password_confirm).withMessage('Пароль не совпадает');

    req.asyncValidationErrors(true).then(()=> {
        var user = new User(req.body);
        bcrypt.hash(user.password, 10, (err, hash)=>{
            user.password = hash;
            user.save((err, user)=>{
                if (err)   
                    return console.log(err);
                res.json({message: 'User created.'});
            })
        });
    }).catch(errors=>{
        res.json({errors: errors});
    });
   
});

router.post('/login', (req, res)=>{
    req.check('email')
        .notEmpty().withMessage('Cant be empty')
        .isEmail().withMessage('Bad email format');
    req.check('password')
        .notEmpty().withMessage('Пароль не может быть пустым');


    req.asyncValidationErrors(true).then(()=>{
        User.findOne({email: req.body.email}).then((user)=>{
            if (!user) {
                return res.json({errors: {"Credentials": "Bad credentials"}});
            }
            bcrypt.compare(req.body.password, user.password).then((validated)=>{
                if (!validated) {
                    return res.json({errors: {"Credentials": "Bad credentials"}});
                }
                token = jwt.sign({
                    user_id: user._id
                }, config.secret);
                return res.json({
                    message: 'ok',
                    token: token
                });
            }).catch(err=>console.log(err));
        }).catch(err=>console.log(err));
    }).catch((errors)=>{
        res.json({errors: errors});
    });
    
});

module.exports = router;