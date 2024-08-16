const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const fs = require('fs');
const database = require('../database.json');
const saveDatabase = require('../utils/saveDatabase');

const register = (req, res) => {
    const { username, password, name, dob } = req.body;
  
    if (database.users.find(user => user.username === username)) {
      return res.status(400).json({ message: 'Username already exists' });
    }
  
    const userId = Date.now().toString();
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '1h' });
    const encryptionKey = crypto.randomBytes(32).toString('hex');
  
    database.users.push({ userId, username, password, name, dob, encryptionKey });
    saveDatabase(database);
  
    res.json({ userId, token });
};

const login = (req, res) => {
    const { username, password } = req.body;
  
    const user = database.users.find(user => user.username === username && user.password === password);
  
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
  
    const userId = user.userId;
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '1h' });
  
    res.json({ userId, token });
};

const settings = (req, res) => {
  const userId = req.user.userId;

  const user = database.users.find(user => user.userId === userId);
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  res.json({ name: user.name, dob: user.dob });
}
const editSettings = (req, res) => {
  const userId = req.user.userId;
  const { name, dob, password } = req.body;

  const user = database.users.find(user => user.userId === userId);
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  if (name) user.name = name;
  if (dob) user.dob = dob;
  if (password) user.password = password;

  saveDatabase(database);

  res.json({ message: 'Settings updated successfully!' });
}

module.exports = { register, login, settings, editSettings };
