const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');
const electricalSchema = require('../models/electricalSchema');
const plumbingSchema = require('../models/plumbingSchema');
const complaintSchema = require('../models/complaintsSchema');
const carpentrySchema = require('../models/carpentrySchema');

const { Schema } = mongoose;
const Database = mongoose.model('issues', 'electrical', 'plumbing', 'carpentry')
const Issues = mongoose.model('issues')
const Electric = mongoose.model('electrical', electricalSchema)
const Plumbing = mongoose.model('plumbing', plumbingSchema)
const Complaints = mongoose.model('complaints', complaintSchema)
const Carpentry = mongoose.model('carpentry', carpentrySchema)


module.exports = (server) => {


    server.post('/api/issues', requireLogin, async (req, res) => {

        const { fromTenantMessage, toTenantMessage, _userLandlord } = req.body;
        
        console.log('usas',req.user)


        const issues = new Issues({
            pics: '',    
            fromTenantMessage,
            toTenantMessage,
            // electrical: [electricalSchema],
            _user: req.user.id,
            _userName: req.user.wholeName,
            _userLandlord,
            // _userTenant,
           

        });

        try {
            res.status(201).json(issues)
            //This line saves the issues record to the database

            await issues.save();

          }
        catch(err) {
            res.send.status(422).send(err);
                }

    });

    server.get('/api/tenant-issues', async (req, res) => {
        try {
            const electricIssues = await Electric.find({_user: req.user._id})
            const plumbingIssues = await Plumbing.find({_user: req.user._id})
            const carpentryIssues = await Carpentry.find({_user: req.user._id})
            const complaintsIssues = await Complaints.find({_user: req.user._id})

            res.status(200).json([electricIssues, plumbingIssues, carpentryIssues, complaintsIssues])
            console.log('issue', plumbingSchema)
        }
        catch(err) {
            console.log(err)
        }
    })


    server.post('/api/plumbing', async (req, res) => {
        const { plumbing, image  } = req.body;
        const plumbingSchema = new Plumbing({
            body : plumbing,
            status: 'Pending',
            image: image,
            date: new Date().toDateString(),
            name: req.user.wholeName,
            address: req.user.address,
            category: 'plumbing',
            landlord: req.user.landlord,
            _user: req.user._id
        })
        try {
            res.status(202).json({body: plumbing, pending: true, recieved: false, completed: false})
            await plumbingSchema.save();

        }
        catch(err) {
            console.log(err)
        }
    })

    
    server.post('/api/electrical', async (req, res) => {
        const { electrical, image  } = req.body;
        const electricalSchema = new Electric({
            _user: req.user.id,
            body : electrical,
            status: 'Pending',
            image: image,
            date: new Date().toDateString(),
            name: req.user.wholeName,
            address: req.user.address,
            category: 'electrical',
            landlord: req.user.landlord
               
        })
        try {
            res.status(202).json({body: electrical, pending: true, recieved: false, completed: false})
            await electricalSchema.save();

        }
        catch(err) {
            console.log(err)
        }
    })


    

    server.post('/api/carpentry', async (req, res) => {
        const { carpentry, image  } = req.body;
        const carpentrySchema = new Carpentry({
            body : carpentry,
            status: 'Pending',
            image: image,
            date: new Date().toDateString(),
            name: req.user.wholeName,
            address: req.user.address,
            category: 'carpentry',
            landlord: req.user.landlord,
            _user: req.user._id
   
        })
        try {
            res.status(202).json({body: carpentry, pending: true, recieved: false, completed: false})
            await carpentrySchema.save();

        }
        catch(err) {
            console.log(err)
        }
    })
    server.post('/api/complaints', async (req, res) => {
        const { complaints, image  } = req.body;
        const complaintSchema = new Complaints({
            body : complaints,
            status: 'Pending',
            image: image,
            date: new Date().toDateString(),
            name: req.user.wholeName,
            address: req.user.address,
            category: 'complaints',
            landlord: req.user.landlord,
            _user: req.user._id
  
        })
        try {
            res.status(202).json({body: complaints, pending: true, recieved: false, completed: false})
            await complaintSchema.save();

        }
        catch(err) {
            console.log(err)
        }
    })
    
    server.put('/api/pending', async (req, res) => {
        const {ids, _user, situation} = await req.body;
        try {
            await Issues.findOneAndUpdate({_user: _user, [`${situation}._id`]: ids}, {"$set": {[`${situation}.$.pending`] : true, [`${situation}.$.recieved`]: false, [`${situation}.$.completed`]: false}})
            res.status(202).json(ids)


        }
        catch(err) {
            console.log(err)
        }
    })

    server.put('/api/recieved', async (req, res) => {
        const {ids, _user, situation} = await req.body;
        try {

            await Issues.findOneAndUpdate({_user: _user, [`${situation}._id`]: ids}, {"$set": {[`${situation}.$.pending`] : false, [`${situation}.$.recieved`]: true, [`${situation}.$.completed`]: false}})
            res.status(202).json(ids)

        
        }
        catch(err) {
            console.log(err)
        }
    })

    server.put('/api/completed', async (req, res) => {
        const {ids, _user, situation} = await req.body;
        try {

            await Issues.findOneAndUpdate({_user: _user, [`${situation}._id`]: ids}, {"$set": {[`${situation}.$.pending`] : false, [`${situation}.$.recieved`]: false, [`${situation}.$.completed`]: true}})
            res.status(202).json(ids)


        }
        catch(err) {
            console.log(err)
        }
    })


    //this route is for LandlordDashboard component - sending the user the tenants with their issues
    server.get('/api/tenants-issues', async (req, res) => {
        try {
            //grabbing the issues assigned t landlord
            const electricity = await Electric.find({landlord: req.user._id})
            const plumbing = await Plumbing.find({landlord: req.user._id})
            const carpentry = await Carpentry.find({landlord: req.user._id})
            const complaint = await Complaints.find({landlord: req.user._id})
            let arr = electricity.concat(plumbing).concat(carpentry).concat(complaint)
            //kindly sending it to lanlord
            
            res.status(200).json(arr)
    }
        catch(err) {
            console.log(err)
        }
    })




};




