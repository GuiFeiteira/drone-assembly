const jwt = require('jsonwebtoken');


const userId = '12345';
const secretKey = '1234567894125';

const payload = {
    id: userId,
};

const token = jwt.sign(payload, secretKey, { expiresIn: '1h' });

console.log('Generated JWT Token:', token);