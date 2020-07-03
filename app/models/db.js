const mysql=require("mysql");
const dbConfig=require("../config/db.config");

//Create connection with database
const connection=mysql.createConnection({
    host:dbConfig.HOST,
    user:dbConfig.USER,
    password:dbConfig.PASSWORD,
    database:dbConfig.DB
});

//open mysql connection
connection.connect(error => {
    if(error) throw error;
    console.log("Successfully connected to database");
});

module.exports=connection;