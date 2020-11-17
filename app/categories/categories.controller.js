const Category = require("./categories.model");

exports.category = (req, res) => {
  Category.getcategories((err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `table doesn't exist`,
        });
      } else {
        res.status(500).send({
          message: "Error while retreiving posts",
        });
      }
    } else res.send(data);
  });
};
