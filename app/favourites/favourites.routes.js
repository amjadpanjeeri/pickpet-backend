module.exports = app => {
    const favourite = require("./favourites.controller");
  
    // Create a new Customer
    app.post("/favourite", favourite.create);
  
    // Retrieve all favourite
    app.get("/favourite", favourite.findAll);
  
    // Delete a Customer with customerId
    app.delete("/favourite/:post_id", favourite.delete);
  
  };