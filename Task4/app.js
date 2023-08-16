
const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const userController = require('./userController');


const app = express();
const port = 5000;


app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

app.post('/register', userController.registerUser);
app.post('/login', userController.loginUser);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
