const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const admin = require("firebase-admin");
const verifyToken = require("./middleware/authMiddleware");
const serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://login-singup-9ad66-default-rtdb.firebaseio.com",
});

const app = express();
app.use(cors({
  origin: ["http://localhost:5173", "http://localhost:5174", "http://localhost:5175", "http://localhost:5176", "http://localhost:5177"],
  credentials: true,
}));
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Hello from the backend!");
})
app.post("/api/signup-profile", async (req, res) => {
  try {
    const idToken = req.headers.authorization?.split("Bearer ")[1];
    const { username } = req.body;

    if (!idToken) {
      return res.status(401).json({ message: "Missing auth token" });
    }

    const decodedToken = await admin.auth().verifyIdToken(idToken);
    const uid = decodedToken.uid;

    const userData = {
      username,
      email: decodedToken.email,
      uid: uid,
      createdAt: new Date().toISOString(),
      lastLogin: new Date().toISOString(),
      profileComplete: true
    };

    // Save to Realtime Database
    await admin.database().ref("users/" + uid).set(userData);

    // Also save to Firestore
    const db = admin.firestore();
    await db.collection("users").doc(uid).set(userData);

    return res.status(200).json({ 
      message: "User profile saved successfully to both databases",
      user: userData 
    });
  } catch (error) {
    console.error("Signup backend error:", error);
    return res.status(500).json({ message: "Server error", error: error.message });
  }
});

// Login Route
app.post("/api/login", verifyToken, async (req, res) => {
  try {
    const uid = req.user.uid;
    const snapshot = await admin.database().ref("users/" + uid).once("value");
    const userData = snapshot.val();

    if (!userData) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({ message: "Login successful", user: userData });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({ message: "Server error", error: error.message });
  }
});

// Login Profile Route (for frontend compatibility)
app.post("/api/login-profile", async (req, res) => {
  try {
    const idToken = req.headers.authorization?.split("Bearer ")[1];
    const { lastLogin } = req.body;

    if (!idToken) {
      return res.status(401).json({ message: "Missing auth token" });
    }

    const decodedToken = await admin.auth().verifyIdToken(idToken);
    const uid = decodedToken.uid;

    // Update user's last login time
    await admin.database().ref("users/" + uid).update({
      lastLogin: lastLogin || new Date().toISOString(),
    });

    return res.status(200).json({ message: "Login successful and profile updated" });
  } catch (error) {
    console.error("Login profile error:", error);
    return res.status(500).json({ message: "Server error", error: error.message });
  }
});


// ...existing code...

// Save/Update user profile to Firestore
app.post("/api/save-user-firestore", async (req, res) => {
  try {
    const idToken = req.headers.authorization?.split("Bearer ")[1];
    const { email, uid, username, additionalData } = req.body;

    if (!idToken) {
      return res.status(401).json({ message: "Missing auth token" });
    }

    const decodedToken = await admin.auth().verifyIdToken(idToken);

    const updateData = {
      email: email || decodedToken.email,
      uid: uid || decodedToken.uid,
      updatedAt: new Date().toISOString(),
    };

    // Add username if provided
    if (username) {
      updateData.username = username;
    }

    // Add any additional data if provided
    if (additionalData) {
      Object.assign(updateData, additionalData);
    }

    const db = admin.firestore();
    await db.collection("users").doc(decodedToken.uid).set(updateData, { merge: true });

    return res.status(200).json({ 
      message: "User data saved to Firestore successfully!",
      data: updateData 
    });
  } catch (error) {
    console.error("Firestore save error:", error);
    return res.status(500).json({ message: "Server error", error: error.message });
  }
});

// Get user profile from Firestore
app.get("/api/get-user-profile", async (req, res) => {
  try {
    const idToken = req.headers.authorization?.split("Bearer ")[1];

    if (!idToken) {
      return res.status(401).json({ message: "Missing auth token" });
    }

    const decodedToken = await admin.auth().verifyIdToken(idToken);
    const uid = decodedToken.uid;

    const db = admin.firestore();
    const userDoc = await db.collection("users").doc(uid).get();

    if (!userDoc.exists) {
      return res.status(404).json({ message: "User profile not found" });
    }

    return res.status(200).json({ 
      message: "User profile retrieved successfully",
      user: userDoc.data() 
    });
  } catch (error) {
    console.error("Get profile error:", error);
    return res.status(500).json({ message: "Server error", error: error.message });
  }
});



app.listen(5000, () => {
  console.log("✅ Server running on http://localhost:5000");
});