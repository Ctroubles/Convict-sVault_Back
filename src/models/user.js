const { Schema, model }= require("mongoose");

const userSchema= new Schema({
    isActive: {
        type: Boolean,
        default: true
    },
    isAdmin:{
        type: Boolean,
        default: false,
    },
    phone: {
        type: Number,
        required:false,
    },    
    dni: {
        type: Number,
        required:false,
    },
    picture:{
        type: String,
    },    
    name:{
        type: String,
        required: true
    },    
    gender:{
        type: String,
        enum:["H","M","S"],
        default: "S",
    },    
    surname:{
        type: String,
    },
    email:{
        type: String,
        required: true,
        unique: true,
    },
   userid:{
    type: String,
   },
   addresses: {
    type: Array,
    default: [],
   },
   orders:{
    type:Array,
    required: false,
   },
   verified:{
    type: Boolean
   },
   cart:{
    type:Array,
    default: [],
   }
});


userSchema.pre('save', function(next) {
    if(this.gender) {
        this.gender = this.gender.toUpperCase();
    }   next();
});


const User= model("users", userSchema)

module.exports= User;