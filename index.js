// library
const express = require('express');
const app = express();
const dotenv = require('dotenv');
const mongoose = require('mongoose');

// Import routes
const authRoute = require('./routes/auth');
const postRoute = require('./routes/post');

dotenv.config();

// connect to db
mongoose.connect(process.env.DB_CONNECT, {
    useNewUrlParser: true
}, () => console.log(new Date().toString()));



// Middleware
app.use(express.json());

// Route middleware
// send message to default url
app.get('/', (req, res) => res.send('Welcome to rest-api with authorization jwt'))
app.use('/api/user', authRoute);
app.use('/api/post', postRoute);

// set port
const port = process.env.port || 3000

// listen for request
app.listen(port, () => {
    console.log(`Running RestApi on port http://localhost:${port}`);
})