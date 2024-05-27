const options = {
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'Drone Assembly API',
        version: '1.0.0',
        description: 'API for managing drone assembly process',
      },
      servers: [
        {
          url: 'http://localhost:5000/api',
        },
      ],
      components: {
        securitySchemes: {
          bearerAuth: {
            type: 'http',
            scheme: 'bearer',
            bearerFormat: 'JWT',
          },
        },
      },
      security: [
        {
          bearerAuth: [],
        },
      ],
    },
    apis: ['./routes/*.js'],
  };

  module.exports = options;