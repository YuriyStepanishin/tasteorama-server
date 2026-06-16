import swaggerJsdoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.3',
    info: {
      title: 'Tasteorama API',
      version: '1.0.0',
      description: 'API documentation for Tasteorama project',
    },

    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Local server',
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

      schemas: {
        RegisterRequest: {
          type: 'object',
          required: ['name', 'email', 'password'],
          properties: {
            name: {
              type: 'string',
              minLength: 3,
              maxLength: 20,
              example: 'John Doe',
            },
            email: {
              type: 'string',
              format: 'email',
              example: 'john@example.com',
            },
            password: {
              type: 'string',
              example: 'password123',
            },
          },
        },

        LoginRequest: {
          type: 'object',
          required: ['email', 'password'],
          properties: {
            email: {
              type: 'string',
              format: 'email',
              example: 'john@example.com',
            },
            password: {
              type: 'string',
              example: 'password123',
            },
          },
        },

        CreateRecipeRequest: {
          type: 'object',
          required: [
            'name',
            'decr',
            'cookiesTime',
            'category',
            'ingredients',
            'instruction',
          ],

          properties: {
            name: {
              type: 'string',
              maxLength: 64,
              example: 'Pizza',
            },

            decr: {
              type: 'string',
              maxLength: 200,
              example: 'Traditional Italian pizza',
            },

            cookiesTime: {
              type: 'integer',
              minimum: 1,
              maximum: 360,
              example: 30,
            },

            cals: {
              type: 'integer',
              minimum: 1,
              maximum: 10000,
              example: 500,
            },

            category: {
              type: 'string',
              example: 'Main course',
            },

            ingredients: {
              type: 'array',
              items: {
                type: 'object',
                required: ['ingredient', 'ingredientAmount'],
                properties: {
                  ingredient: {
                    type: 'string',
                    example: '68407f3c1234567890123456',
                  },

                  ingredientAmount: {
                    type: 'string',
                    example: '200 g',
                  },
                },
              },
            },

            instruction: {
              type: 'string',
              maxLength: 1200,
              example: 'Bake for 30 minutes',
            },
          },
        },
      },
    },
  },

  apis: ['./src/routes/*.js'],
};

export const swaggerSpec = swaggerJsdoc(options);