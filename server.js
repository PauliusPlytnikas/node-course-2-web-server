const express = require('express');//Loadinamas express
const hbs = require('hbs');
const fs = require('fs');

//naujas express app;
var app = express();

hbs.registerPartials(__dirname + '/views/partials');

//kai serveryje norime atvaizduoti HTML/CSS/JS esančius
//kitame folderyje
app.set('view engine', 'hbs');


//next
app.use((req, res, next) =>{
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`
  console.log(log);//logas: data: GET metodas; URL adresas
  fs.appendFile('server.log', log + '\n', (err)=> {
    if(err){
      console.log('Unable to append to server.log.')
    }
  });
  next();//next praneša kada middleware funkcija yra įvykdyta
});


// app.use((req, res, next) =>{//kai next nenurodoma
//     res.render('maintenance.hbs');//middleware nesibaigia
// });

app.use(express.static(__dirname + '/public'));//middleware
//registerHelper funkcijos pirmas kintamasis
//yra funkcijos pavadinimas, antras - pati funkicja
hbs.registerHelper('getCurrentYear', () =>{
  return new Date().getFullYear();
});
hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase();
});

//static nurodo kelia iki folderio
//__dirname talpina kelia iki folderio kur yra norimas folderis
//pridedamas /public ir turimas pilnas kelias iki failų

//handleris, pirmas yra url(root)
//antras yra funkcija ką siusti vartotojui
app.get('/', (req, res) =>{//request ir response
  res.render('home.hbs', {
  pageTitle: 'Home Page',
  currentYear: new Date().getFullYear(),
  welcomeMessage: "Welcome to my website!"
  })
});


app.get('/about', (req, res)=>{
  res.render('about.hbs', {
  pageTitle: 'About Page',
  currentYear: new Date().getFullYear()
});
} );

// /bad -- send back json with errorMessage property

app.get('/bad', (req, res)=>{
  res.send({
    errorMessage: "Unable to fulfil this request"
  });
});

//app listen bindina aplikacija prie porto
app.listen(3000, ()=>{
  console.log("Server is up on port 3000")
});
