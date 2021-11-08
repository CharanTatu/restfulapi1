const mongoose = require("mongoose");
const validator = require("validator");
const studentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3
    },

    email: {
        type: String,
        required: true,
        unique: [true, "email id already present"],
        validator(value) {
            if (validator.isEmail(value)) {
                throw new Error("invalid error")
            }
        }
    },
    phone: {
        type: Number,
        min: 10,
        required: true,
        unique: [true, "Mobile number already present"]
        //unique:true
    },
    address: {
        type: String,
        required: true
    },
    pincode:{
        type:Number,
        required:true
    }
})
//we will create a new collection
 const Student = mongoose.model('Student', studentSchema);
 module.exports = Student;

//  const Work =mongoose.model('Work',studentSchema)
//  module.exports = Work;
