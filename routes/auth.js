const router = require('express').Router();
const User = require('../models/users');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const {
    registerValidate,
    loginValidate
} = require('../helpers/validation');




router.post('/register', async (req, res) => {

    // run validate in here
    const {
        error
    } = registerValidate(req.body)
    if (error) return res.status(400).send(error.details[0].message);

    // checking if the mail is already using
    const mailExist = await User.findOne({
        email: req.body.email
    });
    if (mailExist) return res.status(400).send('Email already exists');

    // Hash Password
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt);

    // Create a new user
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashPassword
    });
    try {
        const savedUser = await user.save()
        res.json({
            status_code: 201,
            status_message: 'Success create new user!',
            data: savedUser
        }, 201)
    } catch (err) {
        res.status(400).send(err)
    }
});


// login
router.post('/login', async (req, res) => {
    // validation running
    const {
        error
    } = loginValidate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    // checking if the mail is already using
    const user = await User.findOne({
        email: req.body.email
    });
    if (!user) return res.status(400).send('Email is not found!');
    // Password correct
    const validPass = await bcrypt.compare(req.body.password, user.password);
    if (!validPass) return res.status(400).send('Invalid Password!');

    // Create and assign a token
    const token = jwt.sign({
        _id: user._id
    }, process.env.TOKEN_SECRET)

    res.header('auth-token', token).send(token);
    res.send('Logged in!');

})


module.exports = router;