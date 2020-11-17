const sql = require("../models/db");

const Category = function (category) {
  this.category = category.category;
};

Category.getcategories = (result) => {
  sql.query("SELECT * FROM pet_categories", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    result(null, res);
  });
};

module.exports = Category;
