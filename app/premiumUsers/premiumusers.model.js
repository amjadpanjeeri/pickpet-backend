const sql = require("../models/db");

// constructor
const PremiumUser = function (premiumUser) {
  this.user_id = premiumUser.user_id;
  this.type_of_subscription = premiumUser.type_of_subscription;
  this.start_date = premiumUser.start_date;
  this.end_date = premiumUser.end_date;
  this.payment_id = premiumUser.payment_id;
  this.is_expired = premiumUser.is_expired;
};

//adding new post to PremiumUser
PremiumUser.create = (newPremiumUser, result) => {
  sql.query(
    "INSERT INTO premium_subsriptions SET ?",
    newPremiumUser,
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }

      console.log("created premium user: ", {
        id: res.insertId,
        ...newPremiumUser,
      });
      result(null, { id: res.insertId, ...newPremiumUser });
    }
  );
};

//a premium user or not
PremiumUser.checkPremiumUser = (user_id, result) => {
  sql.query(
    `SELECT * FROM premium_subsriptions WHERE user_id = ? and is_expired="false"`,
    user_id,
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
      console.log(`premium user with id = ${user_id} \n`, res);
      result(null, res);
      // return;
    }
  );
};

//listing all favourites
PremiumUser.getAuser = (user_id, result) => {
  sql.query(
    "SELECT * from premium_subsriptions WHERE user_id = ?",
    [user_id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      console.log("premium user details: ", res);
      result(null, res);
    }
  );
};

module.exports = PremiumUser;
