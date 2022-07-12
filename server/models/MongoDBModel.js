const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const MONGO_URI = '';

// connecting MongoDB
mongoose.connect(MONGO_URI)
  .then(() => console.log('Connected to Mongo DB.'))
  .catch(err => console.log(err));

// create xxx Schema
const xxxSchema = new Schema({

});

// create xxx model
const Xxx = mongoose.model('Xxx', xxxSchema);

// export model
module.exports = Xxx;
