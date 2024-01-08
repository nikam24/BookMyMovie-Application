const express = require('express');
// const https = require('https');
const bodyParser = require('body-parser');
const path = require('path');
const db = require('./config/db.js');
const cors = require('cors');
const User = require('./models/Users.js');
const Movie = require('./models/Movie.js');
// const fs = require('fs');
const os = require('os');
require('dotenv').config({ path: './.env' });

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2020-08-27',
  appInfo: { // For sample support and debugging, not required for production:
    name: "stripe-samples/checkout-one-time-payments",
    version: "0.0.1",
    url: "https://github.com/stripe-samples/checkout-one-time-payments"
  }
});

const app = express();
const PORT = 5000;

// Middleware to log incoming requests
app.use((req, res, next) => {
  console.log(`Request received on ${os.hostname()} - ${req.method} ${req.url}`);
  next();
});

// Load your SSL/TLS certificates and private key
// const privateKey = fs.readFileSync('./.cert/key.pem', 'utf8');
// const certificate = fs.readFileSync('./.cert/cert.pem', 'utf8');
// const credentials = { key: privateKey, cert: certificate };

// Configure body-parser to parse JSON and URL-encoded data
app.use(bodyParser.json()); // To parse JSON data
app.use(bodyParser.urlencoded({ extended: true })); // To parse URL-encoded data
app.use('/static', express.static(path.join(__dirname, 'Static Files')));
app.use(cors({
  origin: ['http://localhost:3000', 'https://localhost:3000', 'http://frontend:3000', 'http://frontend', "https://checkout.stripe.com"],
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
}));

// Create a HTTPS server with your SSL/TLS certificates and private key
// const httpsServer = https.createServer(credentials, app);

// Start the Express server
// httpsServer.listen(PORT, (error) => {
//   if (!error) {
//     console.log(`Server is running on port ${PORT} (HTTPS)`);
//   } else {
//     console.log(`Error occurred: ${error}`);
//   }
// });

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT} Hostname : ${os.hostname}`);
});

app.get('/', (req, res) => {
  res.status(200);
  res.send('Welcome to the root URL of the server (HTTP)!');
});

app.post('/', (req, res) => {
  const { name } = req.body;
  res.send(`Welcome ${name}`);
});

app.post('/send', async (req, res) => {
  console.log('Email received by the server!');
  const name = req.body.name;
  const email = req.body.email;
  console.log(`Name: ${name}`);
  console.log(`Email: ${email}`);

  await User.create({ name: name, email: email });

  res.status(200).send('Email sent successfully!');
});


app.post('/payment', async (req, res) => {
  console.log("Payment request received by the server!");
  const { amount, currency, title, releaseDate, imageUrl, userEmail, selectedSeats } = req.body;

  console.log("Selected Seats received by the server are " + selectedSeats);

  // Create a new Checkout Session for the order
  const session = await stripe.checkout.sessions.create({
    mode: 'payment',
    payment_method_types: ['card'],
    line_items: [
      {
        amount: amount,
        currency: currency,
        name: title, // Use the title as the product name
        quantity: 1,
      },
    ],
    success_url: `http://localhost:3000/success?title=${title}&releaseDate=${releaseDate}&imageUrl=${imageUrl}&userEmail=${userEmail}&selectedSeats=${selectedSeats}`, // Specify your success URL
    cancel_url: 'http://localhost:3000/homepage', // Specify your cancel URL
  });

  console.log("Session created successfully!" + session.url);

  return res.json({ url: session.url });
});

app.post('/success', async (req, res) => {
  try {
    const { title, releaseDate, imageUrl, userEmail, selectedSeats } =  req.body; 

    const selectedSeatsArray = selectedSeats.split(',').map(seat => parseInt(seat.trim()));

    let movie = await Movie.findOne({ title: title });

    if(!movie || !movie.seatMatrix) {
      return res.status(404).send('Movie not found!');
    } 
    else {
      updatedSeatMatrix = movie.seatMatrix;

      selectedSeatsArray.forEach(seat => {
        const seatIndex = seat - 1;
        if (seatIndex >= 0 && seatIndex < updatedSeatMatrix.length) {
          updatedSeatMatrix[seatIndex].booked = true;
          updatedSeatMatrix[seatIndex].selected = false;
        }
      });

      try {
        await Movie.findOneAndUpdate({ title: title }, { seatMatrix: updatedSeatMatrix }, {new: true, upsert: true} );
        console.log("Seat matrix updated successfully!");
      } catch (error) {
        console.error("Error updating seat matrix: " + error);
        return res.status(500).send('Internal Server Error!');
      }
      
    }

    const user = await User.findOne({ email: userEmail });

    if(!user) {
      return res.status(404).send('User not found!');
    }
    else {
      console.log('User found in database!');
    }

    user.bookings.push({
      title: title,
      releaseDate: releaseDate,
      imageUrl: imageUrl,
      seatNumber: selectedSeatsArray
    });

    await user.save();
  } catch (error) {
    console.error('Error saving booking: ' + error);
    res.status(500).send('Internal Server Error!');
  }
});

app.get('/get-seat-matrix/:title', async (req, res) => {
  try {
    const title = req.params.title;
    let movie = await Movie.findOne({ title: title });

    if (!movie || !movie.seatMatrix) {
      movie = await Movie.create({
        title: title,
        seatMatrix: Array(50).fill().map((_, index) => ({
          seatNumber: index + 1,
          booked: false,
          selected: false,
        })),
      });
    }
    else {
      console.log('Seat matrix found in database!');
      const hostname = os.hostname();
      console.log("Hostname is " + hostname);
      // movie.seatMatrix.forEach(seat => {
      //   console.log(seat.seatNumber + " " + seat.booked + " " + seat.selected);
      // });
    }

    res.status(200).json({ seatMatrix: movie.seatMatrix });
  } catch (error) {
    console.error('Error fetching seat matrix: ' + error);
    res.status(500).send('Internal Server Error!');
  }
});

app.post('/save-seat-matrix', async (req, res) => {
  try {
    const { title, seatMatrix } = req.body;
    const movie = await Movie.findOneAndUpdate({ title: title }, { seatMatrix: seatMatrix }, {new: true, upsert: true} );

    res.status(200).send('Seat matrix saved successfully!');
  } catch(error) {
    console.error('Error saving seat matrix: ' + error);
    res.status(500).send('Internal Server Error!');
  }
});

app.get('/get-user-bookings/:userId/:userEmail', async (req, res) => {
  const { userId, userEmail } = req.params;

  console.log("received email : " + userEmail);

  try{
    const user = await User.findOne({ email: userEmail });

    if(!user) {
      res.status(404).send('404 Not found!');
    }
    
    res.status(200).send(user.bookings);
  } catch(error) {
    console.log("Ërror in getting booking details : " + error);
  }

});