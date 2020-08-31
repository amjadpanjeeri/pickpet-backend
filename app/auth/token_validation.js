module.exports = {
  checkToken: (req, res, next) => {
    var str = req.get("Authorization");
    try {
      jwt.verify(str, KEY, { algorithm: "HS256" });
      next();
    } catch {
      res.status(401);
      res.send("Bad Token");
    }
  },
};
