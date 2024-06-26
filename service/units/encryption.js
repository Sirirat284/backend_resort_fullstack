const crypto = require('crypto');
require("dotenv").config();
const algorithm = process.env.ALGORITHM_CRYPTO;
const key = Buffer.from(process.env.KEY_CRYPTO, 'utf8');
const iv = Buffer.from(process.env.IV_CRYPTO, 'utf8');

class Encrypt {

    encrypt = (text) => {
        let cipher = crypto.createCipheriv(algorithm, key, iv);
        let encrypted = cipher.update(text, 'utf8', 'hex');
        encrypted += cipher.final('hex');
        return { encryptedData: encrypted }; 
    };
    
    decrypt = (encryptedData) => {
    let encryptedText = Buffer.from(encryptedData, 'hex');
    let decipher = crypto.createDecipheriv(algorithm, key, iv);
    let decrypted = decipher.update(encryptedText, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
    }

}

module.exports = {
    Encrypt
}