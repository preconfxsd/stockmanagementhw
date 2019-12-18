const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')
const pug = require('pug')


require('dotenv').config()

const dbController = require("./db_controller");

const app = express();


//db tests
dbController.createAllTables();

dbController.deleteLab(2, (err, result)=>{
    if(err) return console.log(err);
    return console.log(result);
});


app.use(express.static(path.join(__dirname, 'public')));


app.use(bodyParser.urlencoded({ extended: false }))

app.set('view engine', 'pug')
app.set("views", path.join(__dirname, "views"));

app.get('/', (req, res)=>{
    res.render('home')
})


app.get('/experiment', (req, res)=> {
    res.render('experiment', {title: req.query.id})
})

app.get('/laboratory', (req, res)=> {
    res.render('laboratory', {title: req.query.title})
})

app.get('/experiments', (req, res)=> {
    res.render('experiments')
})

app.get('/submit_experiment', (req, res)=> {
    res.render('submit_experiment')
})

app.post('/submit_experiment', (req, res)=> {
    res.render('after_submit_experiment', {lab: req.body.lab, exp: req.body.exp})
})

app.get('/laboratories', (req, res)=> {
    res.render('laboratories')
})

app.listen(3001, (e)=>{
    console.log("port 3001")
})

