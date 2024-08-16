const express = require('express');
const { uploadFile, downloadFile, files, removeFiles } = require('../controllers/fileController');
const authenticateToken = require('../middleware/authMiddleware');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const router = express.Router();

router.post('/upload', authenticateToken, upload.single('file'), uploadFile);
router.get('/download/:fileId', authenticateToken, downloadFile);
router.get('/files', authenticateToken, files);
router.delete('/files/:fileId', authenticateToken, removeFiles);

module.exports = router;
