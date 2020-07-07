const express=require("express");
var session = require('express-session');
const app=express();

const bodyparser=require("body-parser");


// parse requests of content-type: application/json
app.use(bodyparser.json());

// parse requests of content-type: application/x-www-form-urlencoded
app.use(bodyparser.urlencoded({extended:true}));

const{

    NODE_ENV= 'development',
    SESS_NAME='sid',
    SESS_SECRET='ssh!quiet,it\*asecret!',
    SESS_LIFETIME=1000*60*60*2
}=process.env


const IN_PROD = NODE_ENV === 'production'

const users = [
    { id: 1, name: 'Amjad', email: 'amjad@gmail.com', password: '123456' },
    { id: 2, name: 'Amj', email: 'amj@gmail.com', password: '654321' },
    { id: 3, name: 'amjadamju', email: 'amjadamju@gmail.com', password: '987654' }
]

app.use(session({
    name: SESS_NAME,
    resave:false,
    saveUninitialized:false,
    secret:SESS_SECRET,
    cookie:{
        maxAge: SESS_LIFETIME,
        sameSite:true,
        secure: IN_PROD
    }
}))


const redirectLogin = (req,res,next) => {
    if(!req.session.userId) {
        res.redirect('/login')
    }
    else{
        next()
    }
}

const redirectHome = (req,res,next) => {
    if(req.session.userId) {
        res.redirect('/home')
    }
    else{
        next()
    }
}

//simple route
app.get("/",(req,res)=>{

    const { userId } = req.session;
    
    res.send(`
    
        <h1>Welcome</h1>
        ${userId ? ` 
        <a href='/home'>Home</a>
        <form method='post' action='/logout'>
            <button>Logout</button>
        </form>` : `
        <a href='/login'>Login</a>
        <a href='/register'>Register</a>
        `}
       
    `)
});


app.get('/login',(req,res)=>{
    res.send(`
        <h1>Login</h1>
        <form method='post' action='/login'>
            <input name="email" type="email" placeholder="Email" require/>
            <input name="password" type="password" placeholder="Password" require/>
            <input type="submit"/>
        </form>
        <a href='/register'>Register</a>
    `)
})

app.get('/register',(req,res)=>{
    res.send(`
    <h1>Register</h1>
    <form method='post' action='/register'>
        <input name="name" placeholder="Name" require/>
        <input name="email" type="email" placeholder="Email" require/>
        <input name="password" type="password" placeholder="Password" require/>
        <input type="submit"/>
    </form>
    <a href='/login'>Login</a>

`)
})

app.post('/login',redirectHome,(req,res)=>{
    const { email, password } = req.body

    if(email && password){
        const user = users.find(
            user => user.email === email && user.password === password
        )

        if(user){
            req.session.userId =user.id
            return res.redirect('/home')
        }
    }

    res.redirect('/login')
})

app.post('/register',redirectHome,(req,res)=>{
    const { name, email, password } = req.body
    console.log(req.body);
    
    if(name && email && password){
         const exists = users.some(
             user => user.email === email
         )

         if(!exists) {
             const user = {
                 id: users.length + 1,
                 name,
                 email,
                 password
             }

             users.push(user)
             req.session.userId = user.id
             return res.redirect('/home')
         }
    }

    res.redirect('/register')

})

app.post('/logout',(req,res)=>{
    req.session.destroy(err=>{
        if(err){
            return res.redirect('/home')
        }

        res.clearCookie(SESS_NAME)
        res.redirect('/home')
    })
})

app.get('/home',redirectLogin,(req,res)=>{

    const user = users.find(user => user.id === req.session.userId)
    console.log(req.sessionID);
    
    res.send(`
        <h1>Home</h1>
        <a href='/'>Main</a>
        <ul>
            <li>Name: ${user.name}</li>
            <li>Email: ${user.email}</li>
        </ul>
    `)
})


// require("./app/routes/user.routes")(app);
require("./app/routes/likes.routes")(app);

app.listen(3000,()=>{
    console.log("server is running");
    
});