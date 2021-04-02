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
    plusOne: Boolean
  });

const Address = mongoose.model('Address', addressSchema);

const itemSchema = new mongoose.Schema({
    address: {
        type: mongoose.Schema.ObjectId,
        ref: 'Address'
    },
    name: String,
    id: Number,
    price: Number,
    mustHave: Boolean,
    image: String
});

const Item = mongoose.model('Item', itemSchema);

// Create an Address
app.post('/api/address', async (req, res) => {
    const address = new Address({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        addressOne: req.body.addressOne,
        addressTwo: req.body.addressTwo,
        city: req.body.city,
        state: req.body.state,
        zipcode: req.body.zipcode,
        plusOne: req.body.plusOne
    });
    try {
      await address.save();
      res.send(address);
    } catch (error) {
      console.log(error);
      res.sendStatus(500);
    }
  });

// Get a list of all Addresses
app.get('/api/addresses', async (req, res) => {
    try {
      let addresses = await Address.find();
      res.send(addresses);
    } catch (error) {
      console.log(error);
      res.sendStatus(500);
    }
  });

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
        console.log(error);
        res.sendStatus(500);
    }
});

app.listen(3000, () => console.log('Server listening on port 3000!'));