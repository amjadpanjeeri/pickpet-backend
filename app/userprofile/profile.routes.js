module.exports = app => {
    const userprofile = require("./profile.controller");
  
    // Create a new Customer
    app.post("/userprofile", userprofile.create);
  
    // Retrieve a single Customer with customerId
    app.get("/userprofile/:user_id", userprofile.findOne);
  
    // Update a Customer with customerId
    // app.put("/userprofile/:user_id", userprofile.update);
  
  };