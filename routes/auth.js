const router = require("express").Router();
const { User } = require("../models/user");
const bcrypt = require("bcrypt"); 
const Joi = require("joi"); 
const crypto = require('crypto');
const jwt = require('jsonwebtoken'); 


const jwtPrivateKey = process.env.JWT_PRIVATE_KEY || 'your-secure-key';

router.post("/", async (req, res) => {
    try {
        
        const { error } = validate(req.body);
        if (error) 
            return res.status(400).send({ message: error.details[0].message });

        
        const user = await User.findOne({ email: req.body.email });
        if (!user)
            return res.status(401).send({ message: "Invalid Email or Password" });

        
        const validPassword = await bcrypt.compare(req.body.password, user.password);
        if (!validPassword)
            return res.status(401).send({ message: "Invalid Email or Password" });

        
        const token = jwt.sign({ _id: user._id }, jwtPrivateKey); 
        res.status(200).send({ data: token, message: "Logged in successfully" });
        
    } catch (error) {
        console.error("Internal Server Error:", error); 
        res.status(500).send({ message: "Internal Server Error" });
    }
});

// Validation function for input
const validate = (data) => {
    const schema = Joi.object({
        email: Joi.string().email().required().label("Email"),
        password: Joi.string().required().label("Password")
    });
    return schema.validate(data);
};

module.exports = router;
