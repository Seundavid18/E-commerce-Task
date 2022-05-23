// const mongoose =  require('mongoose');
// const { Schema } = mongoose;
// const validator = require('validator')

// const userSchema = new Schema({
//   firstName:  {
//     type:String,
//     required: true,
//     trim: true 
//     },
//     lastName:  {
//         type: String,
//         required: true,
//         trim: true 
//         },
//     storeName:  {
//         type: String,
//         required: true,
//         trim: true 
//         },
//   email: {
//       type: String,
//       required: [true, 'Please Enter Email Address'],
//       unique: true,
//       lowercase: true,
//       validate: [validator.isEmail, 'Enter a valid email address'],
//       trim: true
//     },
//   phoneNumber:  {
//         type: Number,
//         required: true,
//         trim: true,
//   },
//   password:  {
//     type: String,
//     required: [true, 'Please enter a password'],
//     minlength: [6, 'Password must be at least 6 characters'],
//     trim: true,
// },
    
// },

//     {timestamps: true}

// );

// const User = mongoose.model('User', userSchema)

// module.exports = User

const Joi = require('joi');
const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  firstName: {
    type: String,
  },
  lastName: {
    type: String
  },
  storeName: {
    type: String
  },
  email: {
    type: String
  },
  phone: {
    type :Number
  },
  password: {
    type: String
  },
	created: { type: Date, default: Date.now },
})

 function validateUser (user){
    const schema = Joi.object({
      firstName: Joi.string()
      .min(3)
      .max(20)
      .required(),
      lastName: Joi.string()
      .min(3)
      .max(20)
      .required(),
      storeName: Joi.string()
      .min(3)
      .max(30)
      .required(),
      email: Joi.string()
      .min(3)
      .max(50)
      .required()
      .lowercase()
      .email(),
      phoneNumber: Joi.number()
      .min(11)
      .required(),
      password: Joi.string()
      .min(6)
      .required()
      .regex(/^[a-zA-Z0-9]{6,}$/)
    })
    return schema.validate(user);
}


const User = mongoose.model("User", userSchema);

module.exports = {
  User,
  validateUser
}

