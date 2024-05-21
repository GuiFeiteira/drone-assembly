const express = require('express');
const mongoose = require('mongoose');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerOptions = require('./docs/swagger');

const app = express();

// Middleware
app.use(express.json());

// Swagger setup
const specs = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

// Routes
const userRoutes = require('./routes/user');
const droneRoutes = require('./routes/drones');

app.use('/api/users', userRoutes);
app.use('/api/drones', droneRoutes);

const PORT = process.env.PORT || 5000;

mongoose.connect('mongodb://0.0.0.0/Users', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => console.log('Server running on port ${PORT}'));
  })
  .catch(err => console.error('Could not connect to MongoDB', err));
