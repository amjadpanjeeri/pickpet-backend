module.exports = app => {
    const follower = require("./subscription.controller");
  
    // Create a new Customer
    app.post("/subscriber/:follower_id", follower.create);
  
    // Retrieve all subscriber
    app.get("/subscriber", follower.findAll);
  
    // Delete a Customer with customerId
    app.delete("/subscriber/:follower_id", follower.delete);

  };