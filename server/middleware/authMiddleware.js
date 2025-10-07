
const admin = require('firebase-admin');

const verifyToken = async (req, res, next) => {
  
  const idToken = req.headers.authorization?.split('Bearer ')[1];

  if (!idToken) {
    return res.status(401).json({ message: 'Unauthorized: No token provided' });
  }

  try {
   
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    req.user = decodedToken; 
    next(); 
  } catch (error) {
    console.error('Error verifying ID token:', error);
    return res.status(401).json({ message: 'Unauthorized: Invalid token', error: error.message });
  }
};

module.exports = verifyToken;
