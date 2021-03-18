const mongoose = require('mongoose')
const {Schema} = mongoose

const carpentrySchema = new Schema({
    body : String,
    pending : {type : Boolean , default : true},
    recieved: {type: Boolean, default: false},
    completed: {type: Boolean, default: false},
    image: {type: String, default: ''},
    date: {type: String, default: Date.now()}

})

module.exports = carpentrySchema