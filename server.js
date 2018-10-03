const express = require('express');
const hbs = require('hbs')
const fs = require('fs');

const app = express();
const port = 3000;

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');


//my middlewares
app.use((req, res, next)=>{
    let now = new Date().toString();
    console.log(`${now} ${req.method} ${req.path}`)
    fs.appendFile('requstData.log', JSON.stringify({method: req.method, path: req.path}) + '\n' , (err)=>{if(err) throw err})
    next();
});
app.use((req, res, next)=>{
    res.render('maintain.hbs')
})

app.use(express.static(__dirname + '/public')); //static public page
app.get('/', (req, res)=>{
    res.render('home.hbs', {
        pageTitle: 'Home Page',
        welcomeMessage: 'welcome to my website',
        currentYear: new Date().getFullYear()
    })
})
app.get('/about', (req, res)=>{
    res.render('about.hbs',{
        pageTitle: 'about us',
        currentYear: new Date().getFullYear()
    });
});

app.listen(port, ()=>{
    console.log('the app is listning on port 3000')
});