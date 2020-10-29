const User = require("../model/user");
const jwt = require('jsonwebtoken');
const bcyrpt = require('bcrypt');

exports.user_login = async (req, res, next) => {
    User.findOne({where: {login: req.body.login}})
        .then(user => {
            bcyrpt.compare(req.body.password, user.password, (err, result) => {
                if (err) {
                    return res.status(401).json({
                        message: 'Auth failed'
                    });
                }
                if (result) {
                    const token = jwt.sign({
                            login: user.login,
                            userId: user.id
                        },
                        'secret',
                        {
                            expiresIn: "24h"
                        });
                    return res.status(200).json({
                        message: 'Auth successfull',
                        token: token
                    });
                }
                res.status(401).json({
                    message: 'Auth failed'
                });
            })
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
}

exports.user_signup = async (req, res, next) => {

    bcyrpt.hash(req.body.password, 10, (err, hash) => {
        if (err) {
            return res.status(500).json({
                error: err
            });
        } else {
            const user = new User({
                login: req.body.login,
                password: hash
            });
            user.save()
                .then(result => {
                    res.status(201).json({
                        message: "User created"
                    });
                })
                .catch(err => {
                    res.status(500).json({
                        error: err
                    })
                });
        }
    })

}

exports.me = async (req, res, next) => {
    res.status(200).json(req.userData)
}