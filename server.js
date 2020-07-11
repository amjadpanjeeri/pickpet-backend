const express = require("express");
var session = require('express-session');
const app = express();

const bodyparser = require("body-parser");


// parse requests of content-type: application/json
app.use(bodyparser.json());

// parse requests of content-type: application/x-www-form-urlencoded
app.use(bodyparser.urlencoded({ extended: true }));

const {

    NODE_ENV = 'development',
    SESS_NAME = 'sid',
    SESS_SECRET = 'ssh!quiet,it\*asecret!',
    SESS_LIFETIME = 1000 * 60 * 60 * 2
} = process.env


const IN_PROD = NODE_ENV === 'production'

//connecting to database

const sql = require("./app/models/db");
const query = sql.query("SELECT * FROM users ", (err, res) => {
    if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
    }
    users = res;
});


app.use(session({
    name: SESS_NAME,
    resave: false,
    saveUninitialized: false,
    secret: SESS_SECRET,
    cookie: {
        maxAge: SESS_LIFETIME,
        sameSite: true,
        secure: IN_PROD
    }
}))


const redirectLogin = (req, res, next) => {
    if (!req.session.userId) {
        res.redirect('/login')
    }
    else {
        next()
    }
}

const redirectHome = (req, res, next) => {
    if (req.session.userId) {
        res.redirect('/home')
    }
    else {
        next()
    }
}

//simple route
app.get("/", (req, res) => {

    const { userId } = req.session;

    res.send(`Welcome to pickpet`)
});

//login

const userCred = {
    email: "m@gmail.com",
    password: "miju"
}

app.post('/login', redirectHome, (req, res) => {
    const { email, password } = userCred

    if (email && password) {
        const user = users.find(
            user => user.email === email && user.password === password
        )

        if (user) {
            req.session.userId = user.user_id
            console.log(req.session.userId);

            return res.redirect('/home')
        }
    }

    res.redirect('/login')
})


const userReg = {
    username: "Mihjah",
    email: "m@gmail.com",
    password: "miju",
    phone: '9865743210'
}
app.post('/register', redirectHome, (req, res) => {
    const { username, email, password, phone } = userReg
    console.log(req.body);

    if (username && email && password) {
        const exists = users.some(
            user => user.email === email
        )
        console.log(exists);

        if (!exists) {
            const user = {
                user_id: users.length + 1,
                email,
                username,
                password,
                phone
            }
            sql.query("INSERT INTO users SET ?", user, (err, res) => {
                if (err) {
                    console.log("error:", err);
                    return;
                }

                console.log("created user: ", user);
                return res;
            });
            req.session.userId = user.user_id
            return res.redirect('/home')
        }
    }

    res.redirect('/register')

})

app.post('/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) {
            return res.redirect('/home')
        }
        res.clearCookie(SESS_NAME)
        res.redirect('/')

    })
})

app.get('/home', redirectLogin, (req, res) => {

    const user = users.find(user => user.id === req.session.userId)

    res.send(`at home`);
    global.user_id=req.session.userId;
    require("./app/posts/posts.routes")(app);
    require("./app/userprofile/profile.routes")(app);
    require("./app/subscription/subscription.routes")(app);
    require("./app/favourites/favourites.routes")(app);

})



app.listen(3000, () => {
    console.log("server is running");

});