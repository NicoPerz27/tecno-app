const { Schema, model } = require("mongoose");
const UserSchema = new Schema({
    CC: {
        type: Number,
        require: true,
        unique: true
    },
    username:{
        type: String,
        require:true,
        unique: true
    },
    password:{
        type:String,
        require: true
    },
    name:{
        type: String,
        require:true,
        trim: true
    },
    lastname:{
        type: String,
        require:true, 
        trim: true
    },
    rol:{
        type: String,
        require:true
    },
    phone:{
        type: String,
        require:true
    },

})
module.exports = model("User", UserSchema)