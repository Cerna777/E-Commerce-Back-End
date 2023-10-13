const express = require('express');
const routes = require('./routes/api');
const sequelize = require('./config/connection'); // Import sequelize connection

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', routes);

// Sync sequelize models to the database, then turn on the server
sequelize.sync({ force: false }).then(() => { // Set force to true for development, false for production
  app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}!`);
  });
});
