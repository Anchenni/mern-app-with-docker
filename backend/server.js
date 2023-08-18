const express = require('express');
const mongoose = require('mongoose');
const app = express();
const PORT = 5000;
  
mongoose.set('strictQuery', true);

mongoose.connect('mongodb://mongodb:27017/your-database-name', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });

app.get('/', (req, res) => {
  res.send('Hello from the backend!');
});

app.listen(PORT, () => {
  console.log(`Backend server is running on port ${PORT}`);
});
