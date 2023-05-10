
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const {registerSchema, loginSchema} = require('../helpers/validators')
const Model = require('../models/userModel');



//REGISTER
const registerUser =  async (req, res)=>{
 
    // let validate data before using
    const {error} = await registerSchema.validateAsync(req.body);
    if(error) return res.status(400).send(err.details[0].message);

    // let check if email exist
    const emailExist = Promise.resolve(Model.findOne({email: req.body.email}));
    const result = await emailExist;
    if(result) return res.status(400).send('Email already exists.');

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashpassword = await bcrypt.hash(req.body.password, salt);

    // creating new user
    const user = new Model({
        name: req.body.name,
        email: req.body.email,
        password: hashpassword

    });
    try{
        const saveUser = await user.save();
        res.send({user: saveUser._id});

    }catch (err){
        res.status(400).json(err);
    }
 
};

//LOGIN
const loginUser =  async (req, res)=>{
     // let validate data before using
    const {error} = await loginSchema.validateAsync(req.body);
    if(error)return res.status(400).send(error.details[0].message);

     // let check if email doen't exist in our DB
    const user = await Model.findOne({email: req.body.email});
    if(!user) return res.status(400).send(`Email or password doesn't exists.`);
    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if(!validPassword) return res.status(400).send(`password or email doesn't exists.`);


    // JWT TOKEN
    const token = jwt.sign({ _id: user._id },
         process.env.SECRET_KEY,
         {expiresIn: '24h'}
         );
    res.header('auth-token', token).send(token);

};

module.exports = {registerUser, loginUser};

