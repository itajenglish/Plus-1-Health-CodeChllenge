//Require NPM Packages
const express = require('express'),
app = express(),
mustache = require('mustache-express'),
methodOverride = require('method-override'),
bdPars = require('body-parser');

//configure express and related packages
  app.engine('html',mustache());
  app.set('view','html');
  app.use(express.static(__dirname+'/public'));
  app.set('views',__dirname+'/views');
  app.use(methodOverride('_method')); //method override
  app.use(bdPars.urlencoded({ extended: false })); //body parser
  app.use(bdPars.json()); //body parser

//start the server
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server running on PORT ${PORT}!`);
    console.log(`Server running at http://localhost:${PORT}`);
  });

// Define Routes
app.get('', (req, res, next) => {
  res.send('Hello');
});
