const sql=require("./db");


//constructor
const User=function(user){
    this.username=user.username;
    this.password=user.password;
    this.phone=user.phone;
    this.email=user.email;
};

User.create = (newUser,result)=>{
    sql.query("INSERT INTO users SET ?",newUser,(err,res)=>{
        if(err){
            console.log("error:",err);
            result(err,null);
            return;
        }

        console.log("created user: ", {id:res.id,...newUser});
        result(null, { id: res.insertId, ...newUser });
    });
};


//sign in

const email="amjad@gmail.com";
const password="123456";
User.findById = (userId,result)=>{
    sql.query(`SELECT * FROM users WHERE user_id=${userId}`,(err,res)=>{
        if(err){
            console.log("error: ",err);
            result(err,null);
            return;
        }

        if(res.length){
            if(password==res[0].password){
                result(null,"successfully logged in");
            }
            else{
                result(null,"Login failed")
            }
            return;
        }

        //not found
        result({kind: "not_found"}, null);
    });
};



//delete
User.remove = (id, result) => {
    sql.query("DELETE FROM users WHERE id = ?", id, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      if (res.affectedRows == 0) {
        // not found user with the id
        result({ kind: "not_found" }, null);
        return;
      }
  
      console.log("deleted user with id: ", id);
      result(null, res);
    });
  };
  



//update
User.updateById = (id, mail, result) => {
    sql.query(
      "UPDATE users SET email = ? WHERE user_id = ?",
      [mail, id],
      (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(null, err);
          return;
        }
  
        if (res.affectedRows == 0) {
          // not found user with the id
          result({ kind: "not_found" }, null);
          return;
        }
  
        console.log("updated user: ", { id: id });
        result(null, { id: id });
      }
    );
  };

module.exports=User;
