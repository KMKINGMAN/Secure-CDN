const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const fileRoutes = require('./routes/fileRoutes');
const jwt = require("jsonwebtoken");
const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());

app.use('/auth', authRoutes);
app.use('/files', fileRoutes);

app.get('/api/verifyToken', (req, res) => {
  const token = req.headers['authorization']?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: 'Token not provided' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(401).json({ message: 'Invalid token' });
    }
    res.status(200).json({ valid: true, user });
  });
});


app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
