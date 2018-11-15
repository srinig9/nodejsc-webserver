const express = require('express');
//const mustache = require('mustache');
const mustache = require('hbs');
const fs = require('fs');

app = express();

mustache.registerPartials(__dirname + "/views/partials");
mustache.registerHelper("getCurrentYear", ()=>{
    return new Date().getFullYear();
});

mustache.registerHelper("screamIt", (text) => {
    return text.toUpperCase();
});

app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public'));

app.use((req, res, next) => {
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`;
    console.log(log);
    fs.appendFile("server.log", log+'\n', (err) => {
        if (err) {
            console.log('Unable to append');
        }
    });
    next();
})

app.get('/', (req, res) => {
    //res.send('<h1>Hello Express</h1>');
    res.render("home.hbs", {
        pageTitle: "Home Page",
        title: "Srini's Home",
        calc: function() {
            return 74 * 2;
        },
    })
});

var view = {
    pageTitle: "About Page",
    title: "Joe",
    calc: function () {
      return 2 + 4;
    }
  };

app.get('/about', (req, res) => {
    res.render('about.hbs', view);
})
// app.get('/mustache', (req, res) => {
//     res.send(mustache.render("{{title}} spends {{calc}}", view));
// });

app.listen(3000, () => {
    console.log('Server started');
});