const bcrypt = require('bcryptjs');
const users = [];

function registerUser(req, res) {
  const { username, password } = req.body;

  const userExists = users.some(user => user.username === username);
  if (userExists) {
    return res.status(400).send('Username already taken , choose another username');
  }

  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(password, salt, (err, hash) => {
      if (err) throw err;

      users.push({ username, password: hash });
      res.status(200).send('Registration successful, go back and login to get access');
    });
  });
}


function loginUser(req, res) {
  const { username, password } = req.body;

  const user = users.find(user => user.username === username);
  if (!user) {
    return res.status(401).send('User not found');
  }

  bcrypt.compare(password, user.password, (err, result) => {
    if (err) throw err;

    if (result) {
      res.status(200).send('Login successful, it is a secure page , only have access for authorized users');
    } else {
      res.status(401).send('Invalid password');
    }
  });
}

module.exports = {
  registerUser,
  loginUser
};
