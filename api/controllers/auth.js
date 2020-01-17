const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const keys = require('../../config/keys');

exports.loginUser = function(req, res){
    const user = {
        email: req.body.email,
        password: req.body.password
    }
    db.auth.findOne({where: {email: req.body.email}}).then(user => {
        if(user == null){
            const errors = {
                email: 'user not found with this email'
            };
            return res.status(404).json(errors);
        } else {
            // check for password
            bcrypt.compare(req.body.password, user.dataValues.password, (err, isMatch) => {
                if(!isMatch){
                    const errors = {
                        password:'Password not match'
                    };
                    return res.status(404).json(errors);
                } else {
                    // password match
                    const payload = {
                        id: user.dataValues.id,
                        firstName: user.dataValues.firstName,
                        lastName: user.dataValues.lastName,
                        email: user.dataValues.email
                    }
                    // create token
                    jwt.sign(payload, keys.secret,{expiresIn:'1h'}, (err, token) => {
                        if(err){
                            console.log(err);
                        } else {
                            // send token
                            token = `Bearer ${token}`;
                            res.status(200).json({success: true, token});
                        }
                    });
                }
            });
        }
    })
    .catch(error => console.log(error));
}

exports.registerUser = function(req, res){
    const newUser = {
        firstName: req.body.firstName,
        lastName: req.body.firstName,
        email: req.body.email,
        password: req.body.password
    }

    // generate salt
    bcrypt.genSalt(10, (err, salt) => {
        // has to password
        bcrypt.hash(newUser.password, salt, (err, hash) => {
            newUser.password = hash;
            // save to db
            db.auth.create(newUser)
              .then(() => res.status(200).json({success: true}))
              .catch(error => console.log(error));
        });
    });
}

exports.logoutUser = function(req, res){
    console.log('logoutUser', req.body);
    return res.send('logoutUser')
}
