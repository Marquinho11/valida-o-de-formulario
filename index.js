const bodyParser = require('body-parser');
const express = require('express');
const session =  require('express-session');
const flash = require('express-flash');
const cookie = require('cookie-parser');
const e = require('express');
const app = express();

const port = 3000;

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended:false}));
app.use(bodyParser.json());
app.use(express.static('views'));



app.use(cookie('qualquer coisa'));
app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: true,
    cookie: {maxAge: 60000}
}));

app.use(flash());

app.get('/',(req, res)=>{
    var nameErr = req.flash("nameErr");
    nameErr = (nameErr == undefined || nameErr.length == 0) ? undefined : nameErr;
    res.render('index', {nameErr: nameErr});
});


app.post('/login',(req, res)=>{
    var {name,email} = req.body;

    
    var emailError;
    var pontosError;
    var nameErr;

    if(email == undefined || email == ""){
        emailError = "O e-mail não pode ser vazio";
    }

    if(name == undefined || name == ""){
        nameErr = "O nome não pode ser vazio";
    }

    if(name.length < 4){
        nameErr = "O nome é mt pequeno";
    }

    if(emailError != undefined ||  nameErr != undefined){
        req.flash("emailError",emailError);
        req.flash("nomeError",nameErr);

        req.flash("email",email);

        res.redirect("/");
    }else{
        res.send("SHOW DE BOLA ESSE FORM!");
    }
});





app.listen(port,()=>{
    console.log(`server is running on port http://localhost:${port}`);
});