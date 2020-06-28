
const express = require("express");
const router = express.Router();

//require the admin
var admin = require("firebase-admin");


//init sdk


var serviceAccount = require('../permissions.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://pickpet-d9c41.firebaseio.com"
});





//init an instance of cloud firestore
const db = admin.firestore();

//reference to the database collection
const userCollection = db.collection('users');




//api for checking during sign in

const uname="Amjad";
const upass="789";

router.get('/users/:userId', (req, res) => {

  const userId = req.params.userId;
  db.collection('users').doc(userId).get()
    .then((doc) => {
      return res.status(200).json(
        {
          username: doc.data().username,
          password: doc.data().password
        }
      )
    })
    .catch(error => {
      res.status(500).send(error)
    }
    )

});



//post method

const email = "amjadn@gmail.com";
const password = "789";
const username="Amjad";
const phone="9876543210";
router.post('/users', async (req, res) => {
  try {
      const user = {
          username: username,
          email:email ,
          phone:phone,
          password: password
      }

      const newDoc = await db.collection('users').add(user);
      res.status(201).send(`Created a new user: ${newDoc.id}`);
  } catch (error) {
      res.status(400).send(`failed`)
  }
});



module.exports = router;



