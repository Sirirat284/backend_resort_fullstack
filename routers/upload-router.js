const fs = require('fs');
const { unlink } = require('fs/promises');
const multer = require('multer');
const path = require('path');
const express = require('express');
const {Storage} = require('@google-cloud/storage');
const router = express.Router();
const {EndpointUpload} = require ('../service/upload/upload_enpoint.js');
const jwt = require('jsonwebtoken');

const endpointUpload = new EndpointUpload();

// Specify the directory for uploads relative to the current file
const uploadDirNews = path.join(__dirname, '../upload/');

// Ensure the upload directory exists
if (!fs.existsSync(uploadDirNews)) {
    fs.mkdirSync(uploadDirNews, { recursive: true });
}

// Configure multer storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDirNews);
    },
    filename: (req, file, cb) => {
        const timestamp = Date.now();
        const extension = path.extname(file.originalname);
        cb(null, `${timestamp}${extension}`);
    }
});

// Filter for file type
function fileFilter(req, file, cb) {
    const allowedExtensions = ['.png', '.jpg', '.jpeg', '.gif'];
    if (!allowedExtensions.includes(path.extname(file.originalname).toLowerCase())) {
        return cb(new Error('Only images are allowed'));
    }
    cb(null, true);
}

// Initialize multer
const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: { fileSize: 1024 * 1024 } // 1MB limit
});

// Configure the route
router.post("/reserveRoom", upload.single("file"), async(req, res, next) => {
    const token = req.cookies['accessToken'];
    if (!token) {
        return res.status(401).send('Access Denied: No token provided.');
      }
    // Verify token with your secret key
    const decoded = jwt.verify(token, process.env.SECRET_KEY);

    // ตรวจสอบ role
    if (decoded.role !== 'User') {
        return res.status(403).send('Access Denied: You do not have correct permission.');
    }

    // ใช้ uuid จาก payload ของ token ถ้าจำเป็น
    const uuid = decoded.userID ;
    console.log(decoded)
    // console.log(req.file.path)
    if (req.file) {
        const filePath = req.file.path; // Use the path from multer
        const mimeType = req.file.mimetype;

        try {
            // Configure Google Cloud Storage
            const storage = new Storage({keyFilename: 'nimble-gate-419112-57d4e79f40e8.json'});
            const bucketName = 'full_stack_rimnam';
            const bucket = storage.bucket(bucketName);
            const destinationFileName = `uploads/${req.file.filename}`; // Customize path as needed

            // Upload the file
            await bucket.upload(filePath, {
                destination: destinationFileName,
                metadata: { contentType: mimeType },
            });

            // Make the file public and get the URL
            await bucket.file(destinationFileName).makePublic();
            const publicUrl = `https://storage.googleapis.com/${bucketName}/${destinationFileName}`;
            await unlink(filePath);
            console.log('Local file deleted.');

            endpointUpload.reserveRoomEndpoint(uuid,publicUrl,req,res);

            // Response with the public URL
            // return res.status(200).json({ message: 'File uploaded successfully', url: publicUrl });
        } catch (error) {
            console.error('Upload to Google Cloud Storage failed:', error);
            return res.status(500).json({ error: 'Failed to upload the file' });
        }
    } else {
        return res.status(400).json({ error: 'No file uploaded' });
    }
});

module.exports = router;
