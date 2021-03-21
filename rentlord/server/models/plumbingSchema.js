const mongoose = require('mongoose')
const {Schema} = mongoose

const plumbingSchema = new Schema({
    body : String,
    pending : {type : Boolean , default : true},
    recieved: {type: Boolean, default: false},
    completed: {type: Boolean, default: false},
    image: {type: String, default: ''},
    date: {type: String, default:  new Date().toDateString()},
    name: {type: String, default: '' },
    address: {type: String, default: ''},
    category: {type: String, default: 'plumbing'},
    _user: {type: mongoose.Types.ObjectId, ref: 'User'},
    landlord: {type: String, default: ''}
})

module.exports = plumbingSchema