const express = require('express');
const passport = require('passport');
const router = express.Router();


// middlewares
const moduleName_auth = require('./middlewares/module_middlewares/moduleName_auth');
const moduleName_test = require('./middlewares/module_middlewares/moduleName_test');

// controllers
const authController = require('./controllers/auth');
const testController = require('./controllers/test');

// auth routes
//moduleName == "auth"
router.post('/:moduleName/user/login', moduleName_auth, authController.loginUser);
router.post('/:moduleName/user/register', moduleName_auth, authController.registerUser);
router.get('/:moduleName/user/logout', moduleName_auth, authController.logoutUser);


// test routes
//moduleName == "test"
router.get('/:moduleName/user', moduleName_test, passport.authenticate('jwt', {session: false}), testController.testAuth);

module.exports = router;