// backend/server.js
const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config(); 
const cors = require('cors');
const path = require('path');
const apiRoutes = require('./routes/api'); 
const complaintRoutes = require('./routes/complaintRoutes/complaintRoute');
const commentRoutes = require('./routes/complaintRoutes/commentRoutes');
const PORT = process.env.PORT || 5000; 

// Set proxy environment variables

const app = express();


// app.use(express.static(path.join(__dirname, 'frontend/build')));

// // Serve the React app for all other routes
// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, 'frontend/build', 'index.html'));
// });

// Middleware
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());

// Connect to MongoDB (replace 'your-mongodb-uri' with your actual MongoDB URI)
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});




// Define routes (you'll create these later)
// app.use('/api', require('./routes/api'));
app.use('/api/commentRoutes', commentRoutes);
app.use('/api/complaintRoutes', complaintRoutes);
app.use('/api', apiRoutes);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/test', (req, res) => {
  res.send('Test route');
});

app.get('/test2', (req, res) => {
  res.send('Test route2');
});


// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
