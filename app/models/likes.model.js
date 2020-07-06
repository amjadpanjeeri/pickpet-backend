const sql = require("./db");

//constructor
const Likes = function (likes) {
    this.user_id = likes.user_id;
    this.post_id = likes.post_id;
};


Likes.create = (newLike, result) => {
    sql.query("INSERT INTO likes SET ?", newLike, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        result(null, { post_id: res.insertId, ...newLike });
    });
    const likeCount = sql.query("SELECT COUNT(post_id) from likes");
    console.log(likeCount);
};






module.exports = Likes;