const mongoose = require('mongoose')
const {Schema} = mongoose

const complaintSchema = new Schema({
    body : String,
    status: {type: String, default: 'Pending'},
    image: {type: String, default: ''},
    date: {type: String, default:  new Date().toDateString()},
    name: {type: String, default: ''},
    address: {type: String, default: ''},
    category: {type: String, default: 'complaints'},
    _user: {type: mongoose.Types.ObjectId, ref: 'User'},
    landlord: {type: String, default: ''}

})

module.exports = complaintSchema