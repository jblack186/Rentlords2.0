const mongoose = require('mongoose')
const {Schema} = mongoose

const electricalSchema = new Schema({
    body : String,
    _userLandlordId: String,
    pending : {type : Boolean , default : true},
    recieved: {type: Boolean, default: false},
    completed: {type: Boolean, default: false},
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