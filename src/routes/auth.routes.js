const express = require('express');
const validate = require('../middlewares/validate.middleware');
const { loginSchema } = require('../validators/auth.validator');
const {login, logout, getMe} = require('../controllers/auth.controller');
const { protect } = require('../middlewares/auth.middleware');

const route = express.Router();

route.post('/login', validate(loginSchema), login);
route.post('/logout', protect, logout);
route.get('/me', protect, getMe);

module.exports = route;