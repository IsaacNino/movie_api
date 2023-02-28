

const express = require('express'),
    morgan = require('morgan'),
    app = express(),
    bodyParser = require('body-parser'),
    methodOverride = require('method-override');

app.use(morgan('common'));

let topMovies = [
  {
    title: 'Placeholder',
    director: 'Placeholder',
    genre: 'Placeholder',
    year: 'Placeholder',
    rating: 'Placeholder'
  },
  {
    title: 'Placeholder',
    director: 'Placeholder',
    genre: 'Placeholder',
    year: 'Placeholder',
    rating: 'Placeholder'
  },
  {
    title: 'Placeholder',
    director: 'Placeholder',
    genre: 'Placeholder',
    year: 'Placeholder',
    rating: 'Placeholder'
  },
  {
    title: 'Placeholder',
    director: 'Placeholder',
    genre: 'Placeholder',
    year: 'Placeholder',
    rating: 'Placeholder'
  },
  {
    title: 'Placeholder',
    director: 'Placeholder',
    genre: 'Placeholder',
    year: 'Placeholder',
    rating: 'Placeholder'
  },
  {
    title: 'Placeholder',
    director: 'Placeholder',
    genre: 'Placeholder',
    year: 'Placeholder',
    rating: 'Placeholder'
  },
  {
    title: 'Placeholder',
    director: 'Placeholder',
    genre: 'Placeholder',
    year: 'Placeholder',
    rating: 'Placeholder'
  },
  {
    title: 'Placeholder',
    director: 'Placeholder',
    genre: 'Placeholder',
    year: 'Placeholder',
    rating: 'Placeholder'
  },
  {
    title: 'Placeholder',
    director: 'Placeholder',
    genre: 'Placeholder',
    year: 'Placeholder',
    rating: 'Placeholder'
  }
];

// GET requests
app.get('/', (req, res) => {
    res.send('Welcome to my app!');
  });
  
  app.get('/documentation', (req, res) => {                  
    res.sendFile('public/documentation.html', { root: __dirname });
  });
  
  app.get('/movies', (req, res) => {
    res.json(topMovies);
  });
  
  
  // listen for requests
  app.listen(8080, () => {
    console.log('Your app is listening on port 8080.');
  });
  app.use(express.static('public'));


  //error handling
  app.use(bodyParser.urlencoded({
    extended: true
  }));
  
  app.use(bodyParser.json());
  app.use(methodOverride());
  
  app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something\'s not quite right!');
  });