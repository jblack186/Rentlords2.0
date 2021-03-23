const mongoose = require('mongoose')
const {Schema} = mongoose

const electricalSchema = new Schema({
    body : String,
    _userLandlordId: String,
    status: {type: String, default: 'Pending'},
    image: {type: String, default: ''},
    date: {type: String, default:  new Date().toDateString()},
    name: {type: String, default: ''},
    address: {type: String, default: ''},
    category: {type: String, default: 'electrical'},
    landlord: {type: String, default: ''},
    _user: {type: mongoose.Types.ObjectId, ref: 'User'},

  

})
mongoose.model('electrical', electricalSchema);

module.exports = electricalSchema