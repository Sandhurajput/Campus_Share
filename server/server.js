// const express = require('express');
// const admin = require('firebase-admin');
// const authRoutes = require('./routes/auth');
// require('dotenv').config();

// const app = express();
// app.use(express.json());


// const serviceAccount = require('./login-singup-9ad66-firebase-adminsdk-fbsvc-7be78488a8.json');

// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount)
// });

// const db = admin.firestore();

// app.use((req, res, next) => {
//   req.db = db;
//   next();
// });

// app.use('/api/auth', authRoutes);


// app.get('/api/protected-data', (req, res) => {
//   res.json({ message: 'This is protected data from the backend!' });
// });


// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
