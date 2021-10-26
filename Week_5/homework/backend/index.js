const express = require("express");
const cors = require("cors");
const admin = require("firebase-admin");
const dotenv = require("dotenv").config();
const credentials = require("./penis-d3328-firebase-adminsdk-51wmg-7d145cabfe.json");

// Connect to firebase and use firestore
admin.initializeApp({
  credential: admin.credential.cert(credentials),
  databaseURL: "YOUR_DATABASE_URL_HERE",
});

// Intialize firestore instance
const db = admin.firestore();

// Define app and port
const app = express();
const port = process.env.PORT;

// More Middlware
app.use(cors());
app.use(express.json());

// Get all Users
app.get("/users/", async (req, res) => {
  const snapshot = await db.collection("users").get();
  const users = [];
  snapshot.forEach((doc) => {
    console.log(doc.data());
    users.push(doc.data());
  });
  return res.json({data: users });
});

// Create user
app.post("/users", async (req, res) => {
  const body = req.body;
  console.log(body);
  const docRef = await db.collection("users").doc(body.name);
  const exists = await docRef.get().then((doc) => {
    if (doc.exists) {
      return true;
    } else {
      return false;
    }
  });

  if (exists) {
    return res.send({ msg: "Error, user already exists" });
  } else {
    const data = await docRef.set(req.body);
    return res.send({ msg: "Success", data: data });
  }
});

// TODO: Create query for users that are older than a given value

app.get("/users/:ageMin", async (req, res) => {
  const snapshot = await db.collection("users").get();
  const users = [];
  const ageMin = req.params.ageMin
  snapshot.forEach((doc) => {
    const doc_data = doc.data()
    if(parseInt(doc_data['age']) > parseInt(ageMin)) {
      users.push(doc.data());
    }
    
  });
  return res.json({data: users });
});
// OPTIONAL: Write a function to delete users from the database
// OPTIONAL: Write a function to update user information



app.listen(port, () => console.log(`Listening on Port ${port}!`));
