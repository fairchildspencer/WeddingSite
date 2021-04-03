const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
  extended: false
}));

// parse application/json
app.use(bodyParser.json());

// connect to the database
mongoose.connect('mongodb://localhost:27017/wedding', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const addressSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    addressOne: String,
    addressTwo: String,
    city: String,
    state: String,
    zipcode: String,
    plusOne: Boolean,
    group: { 
      type: mongoose.Schema.ObjectId,
      ref: 'Group'
    }
  });

const Address = mongoose.model('Address', addressSchema);

const groupSchema = new mongoose.Schema({
    name: String
});

const Group = mongoose.model('Group', groupSchema);

// Create an Group
app.post('/api/group', async (req, res) => {
  const group = new Group({
      name: req.body.name
  });
  try {
    await group.save();
    res.send(group);
  } catch (error) {
    //console.log(error);
    res.sendStatus(500);
  }
});

// Get a list of all groups
app.get('/api/groups', async (req, res) => {
  try {
    let groups = await Group.find();
    res.send(groups);
  } catch (error) {
    //console.log(error);
    res.sendStatus(500);
  }
});

// Create an Address
app.post('/api/address', async (req, res) => {
    let group = await Group.findOne({_id: req.body.group});
    if (!group) {
        const address = new Address({
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          addressOne: req.body.addressOne,
          addressTwo: req.body.addressTwo,
          city: req.body.city,
          state: req.body.state,
          zipcode: req.body.zipcode,
          plusOne: req.body.plusOne,
          group: null
      });
      try {
        await address.save();
        res.send(address);
      } catch (error) {
        //console.log(error);
        res.sendStatus(500);
      }
    }
    else {
        const address = new Address({
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          addressOne: req.body.addressOne,
          addressTwo: req.body.addressTwo,
          city: req.body.city,
          state: req.body.state,
          zipcode: req.body.zipcode,
          plusOne: req.body.plusOne,
          group: group
      });
      try {
        await address.save();
        res.send(address);
      } catch (error) {
        //console.log(error);
        res.sendStatus(500);
      }
    }
  });

// Get a list of all Addresses
app.get('/api/addresses', async (req, res) => {
    try {
      let addresses = await Address.find();
      res.send(addresses);
    } catch (error) {
      //console.log(error);
      res.sendStatus(500);
    }
  });

//delete an address
app.delete('/api/address/:addressID', async (req, res) => {
    try {
        let address = await Address.findOne({_id:req.params.addressID});
        if (!address) {
            res.send(404);
            return;
        }
        await address.delete();
        res.sendStatus(200);
    } catch (error) {
        //console.log(error);
        res.sendStatus(500);
    }
});

//add an address to a group  by updating the address
app.put('/api/groups/:groupID/addresses/:addressID', async (req, res) => {
  try {
      let address = await Address.findOne({_id:req.params.addressID});
      if (!address) {
          res.sendStatus(404);
          return;
      }
      let group = await Group.findOne({_id:req.params.groupID});
      if (!group) {
        res.sendStatus(404);
        return
      }
      address.group = group;
      await address.save();
      res.send(address);
  } catch (error) {
      //console.log(error);
      res.sendStatus(500);
  }
});

//delete the group
app.delete('/api/group/:groupID', async (req, res) => {
  try {
      let group = await Group.findOne({_id:req.params.groupID});
      if (!group) {
          res.send(404);
          return;
      }
      await group.delete();
      res.sendStatus(200);
  } catch (error) {
      //console.log(error);
      res.sendStatus(500);
  }
});

app.listen(3000, () => console.log('Server listening on port 3000!'));