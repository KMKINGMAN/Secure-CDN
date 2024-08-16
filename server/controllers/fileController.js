const fs = require('fs');
const crypto = require('crypto');
const { v4: uuidv4 } = require('uuid');
const database = require('../database.json');
const saveDatabase = require('../utils/saveDatabase');
const path = require('path');

const uploadFile = (req, res) => {
    const userId = req.user.userId;
    const user = database.users.find(user => user.userId === userId);
    const encryptionKey = user.encryptionKey;
    const originalFilename = req.file.originalname;
    
    const fileId = uuidv4();
    const uploadedFilePath = path.join('uploads', fileId);
    const fileBuffer = fs.readFileSync(req.file.path);
    
    const cipher = crypto.createCipheriv('aes-256-ctr', Buffer.from(encryptionKey, 'hex'), Buffer.alloc(16, 0));
    const encryptedBuffer = Buffer.concat([cipher.update(fileBuffer), cipher.final()]);
    fs.writeFileSync(uploadedFilePath, encryptedBuffer);
    
    if (!database.files[userId]) database.files[userId] = [];
    database.files[userId].push({ fileId, originalFilename });
    saveDatabase(database);
    
    res.json({ message: 'File uploaded and encrypted successfully!', fileId });
}
const downloadFile = (req, res) => {
    const userId = req.user.userId;
    const fileId = req.params.fileId;
    
    if (!database.files || !database.files[userId]) {
      return res.status(404).json({ message: 'User or files not found!' });
    }
    
    const fileInfo = database.files[userId].find(file => file.fileId === fileId);
    if (!fileInfo) {
      return res.status(404).json({ message: 'File not found!' });
    }
    
    const user = database.users.find(user => user.userId === userId);
    if (!user || !user.encryptionKey) {
      return res.status(401).json({ message: 'User not authorized or encryption key missing' });
    }
    
    const encryptionKey = user.encryptionKey;
    const filePath = path.join('uploads', fileId);
    
    try {
      const encryptedBuffer = fs.readFileSync(filePath);
      const decipher = crypto.createDecipheriv('aes-256-ctr', Buffer.from(encryptionKey, 'hex'), Buffer.alloc(16, 0));
      const decryptedBuffer = Buffer.concat([decipher.update(encryptedBuffer), decipher.final()]);
      
      res.setHeader('Content-Disposition', `attachment; filename=${fileInfo.originalFilename}`);
      res.send(decryptedBuffer);
    } catch (error) {
      console.error('Download error:', error);
      res.status(500).json({ message: 'Failed to download file' });
    }
};

const files = (req, res) => {
    const userId = req.user.userId;
    
    if (!database.files || !database.files[userId]) {
      return res.status(404).json({ message: 'User or files not found!' });
    }
    
    const files = database.files[userId];
    res.json({ files });
};

const removeFiles = (req, res) => {
    const userId = req.user.userId;
    const fileId = req.params.fileId;
    
    if (!database.files || !database.files[userId]) {
      return res.status(404).json({ message: 'User or files not found!' });
    }
    
    const fileIndex = database.files[userId].findIndex(file => file.fileId === fileId);
    if (fileIndex === -1) {
      return res.status(404).json({ message: 'File not found!' });
    }
    
    const filePath = path.join('uploads', fileId);
    
    try {
      fs.unlinkSync(filePath); 
      database.files[userId].splice(fileIndex, 1);
      saveDatabase(database);
      
      res.json({ message: 'File removed successfully!' });
    } catch (error) {
      console.error('Remove file error:', error);
      res.status(500).json({ message: 'Failed to remove file' });
    }
  }


module.exports = { uploadFile, downloadFile, files, removeFiles };
