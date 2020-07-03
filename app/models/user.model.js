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

        console.log("created customer: ", {id:res.id,...newUser});
        result(null, { id: res.insertId, ...newCustomer });
    });
};


//sign in

const email="amjad@gmail.com";
const password="123456";
User.findById = (userId,result)=>{
    sql.query(`SELECT * FROM users WHERE id=${userId}`,(err,res)=>{
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



//put method
User.updateById = (id,user,result)=>{
    sql.query(
        "UPDATE users SET username=? WHERE id=?",
        [user.email,id],
        (err, res) => {
            if (err) {
              console.log("error: ", err);
              result(null, err);
              return;
            }
            if (res.affectedRows == 0) {
                // not found Customer with the id
                result({ kind: "not_found" }, null);
                return;
              }
              console.log("updated customer: ", { id: id, ...user });
              result(null, { id: id, ...user });
            }
    );
};



module.exports=User;
