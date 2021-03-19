const mongoose = require('mongoose')
const {Schema} = mongoose

const complaintSchema = new Schema({
    body : String,
    pending : {type : Boolean , default : true},
    recieved: {type: Boolean, default: false},
    completed: {type: Boolean, default: false},
    image: {type: String, default: ''},
    date: {type: String, default:  new Date().toDateString()}

})

module.exports = complaintSchema