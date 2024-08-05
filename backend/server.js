// backend/server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const apiRoutes = require('./routes/api'); 
const complaintRoutes = require('./routes/complaintRoutes/complaintRoute');
const commentRoutes = require('./routes/complaintRoutes/commentRoutes');

// Set proxy environment variables

const app = express();
const PORT = 5000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());

// Connect to MongoDB (replace 'your-mongodb-uri' with your actual MongoDB URI)
mongoose.connect('mongodb+srv://Sourajit:Cybersoura@clusterwebster.ugk1voi.mongodb.net/Students', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});




// Define routes (you'll create these later)
// app.use('/api', require('./routes/api'));
app.use('/api/commentRoutes', commentRoutes);
app.use('/api/complaintRoutes', complaintRoutes);
app.use('/api', apiRoutes);


// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
