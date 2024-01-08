const mongoose = require('mongoose');

console.log('Connecting to MongoDB Atlas...');

// Load the .env file
require('dotenv').config();

// Create a variable from the MONGODB_ATLAS_URI environment variable
const mongoDBAtlasUri = process.env.MONGODB_ATLAS_URI;

// Connect to MongoDB Atlas
mongoose.connect(mongoDBAtlasUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Connected to MongoDB Atlas successfully!');
}).catch((error) => {
  console.error(`Error connecting to MongoDB Atlas: ${error.message}`);
});

// Export the mongoose connection
module.exports = mongoose;
