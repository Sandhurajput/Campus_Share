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
  origin: "http://localhost:5173",
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

    await admin.database().ref("users/" + uid).set({
      username,
      email: decodedToken.email,
      createdAt: new Date().toISOString(),
    });

    return res.status(200).json({ message: "User profile saved successfully" });
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


// ...existing code...

app.post("/api/save-user-firestore", async (req, res) => {
  try {
    const idToken = req.headers.authorization?.split("Bearer ")[1];
    const { email, uid } = req.body;

    if (!idToken) {
      return res.status(401).json({ message: "Missing auth token" });
    }

   
    const decodedToken = await admin.auth().verifyIdToken(idToken);

   
    const db = admin.firestore();
    await db.collection("users").doc(uid).set({
      email,
      uid,
      savedAt: new Date().toISOString(),
    });

    return res.status(200).json({ message: "User data saved to Firestore!" });
  } catch (error) {
    console.error("Firestore save error:", error);
    return res.status(500).json({ message: "Server error", error: error.message });
  }
});



app.listen(5000, () => {
  console.log("✅ Server running on http://localhost:5000");
});