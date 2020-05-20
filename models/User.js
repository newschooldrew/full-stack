const mongoose = require('mongoose');
const {Schema} = mongoose;

const userSchema = new Schema({
    googleId:String
})

//(name of collection,Schema)
mongoose.model('users',userSchema);