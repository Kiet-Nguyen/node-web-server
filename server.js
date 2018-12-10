const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;

const app = express();
hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');
// Middleware
// Create a log file to keep track of server
app.use((req, res, next) => {
  const now = new Date().toString();
  const log = `${now}: ${req.method} ${req.originalUrl}`;

  console.log(log);
  fs.appendFile('server.log', log + '\n', err => {
    if (err) {
      console.log('Unable to append to server.log');
    }
  });

  next();
});
// Maintenance page
// app.use((req, res, next) => {
//   res.render('maintenance.hbs');
// });
app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear();
});

hbs.registerHelper('screamIt', test => {
  return test.toUpperCase();
})

app.get('/', (req, res) => {
  // res.send('<h1>Hello Express</h1>');
  // res.send({
  //   name: 'Kiet',
  //   likes: [
  //     'games',
  //     'movies',
  //   ],
  // });
  res.render('home.hbs', {
    pageTitle: 'Home Page',
    welcomeMessage: 'Welcome to Node Web Server!'
  });
});

app.get('/about', (req, res) => {
  res.render('about.hbs', {
    pageTitle: 'About Page'
  });
});

app.get('/projects', (req, res) => {
  res.render('projects.hbs', {
    pageTitle: 'Projects Page',
    message: 'My latest projects'
  })
});

app.get('/bad', (req, res) => {
  res.send({
    errorMessage: 'Unable to handle request',
  });
});

app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
