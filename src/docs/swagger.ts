import swaggerJsdoc from "swagger-jsdoc";
import path from "path";

const swaggerOptions: swaggerJsdoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "User Authentication and Management API",
      version: "1.0.0",
      description:
        "API for user registration, authentication, and profile management",
    },
    servers: [
      {
        url: "http://localhost:9000/api",
        description: "Local development server",
      },
    ],
    paths: {
      "/auth/signup": {
        post: {
          summary: "Register a new user",
          description: "Endpoint to create a new user account",
          operationId: "signUp",
          tags: ["Authentication"],
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  required: ["email", "password", "firstName", "lastName"],
                  properties: {
                    email: {
                      type: "string",
                      format: "email",
                      example: "user@example.com",
                    },
                    password: {
                      type: "string",
                      format: "password",
                      minLength: 8,
                      example: "StrongPassword123!",
                    },
                    firstName: {
                      type: "string",
                      example: "John",
                    },
                    lastName: {
                      type: "string",
                      example: "Doe",
                    },
                  },
                },
              },
            },
          },
          responses: {
            "201": {
              description: "User successfully registered",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      id: {
                        type: "string",
                        example: "user123",
                      },
                      firstName: {
                        type: "string",
                        example: "John",
                      },
                      lastName: {
                        type: "string",
                        example: "Doe",
                      },
                      email: {
                        type: "string",
                        format: "email",
                        example: "user@example.com",
                      },
                    },
                  },
                },
              },
            },
            "400": {
              description: "Validation error",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      message: {
                        type: "string",
                        example: "Validation failed",
                      },
                      errors: {
                        type: "array",
                        items: {
                          type: "string",
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
      "/auth/signin": {
        post: {
          summary: "User login",
          description: "Authenticate user and return access token",
          operationId: "signIn",
          tags: ["Authentication"],
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  required: ["email", "password"],
                  properties: {
                    email: {
                      type: "string",
                      format: "email",
                      example: "user@example.com",
                    },
                    password: {
                      type: "string",
                      format: "password",
                      example: "StrongPassword123!",
                    },
                  },
                },
              },
            },
          },
          responses: {
            "200": {
              description: "Successful login",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      user: {
                        type: "object",
                        properties: {
                          id: {
                            type: "string",
                            example: "user123",
                          },
                          email: {
                            type: "string",
                            format: "email",
                            example: "user@example.com",
                          },
                          firstName: {
                            type: "string",
                            example: "John",
                          },
                          lastName: {
                            type: "string",
                            example: "Doe",
                          },
                        },
                      },
                      accessToken: {
                        type: "string",
                        example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
                      },
                      expiresAt: {
                        type: "string",
                        format: "date-time",
                        example: "2024-03-27T15:30:45.123Z",
                      },
                    },
                  },
                },
              },
            },
            "400": {
              description: "Invalid credentials",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      message: {
                        type: "string",
                        example: "Invalid email or password",
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
      "/users/profile": {
        get: {
          summary: "Get user profile",
          description: "Retrieve the profile of the authenticated user",
          operationId: "getUserProfile",
          tags: ["Users"],
          security: [
            {
              bearerAuth: [],
            },
          ],
          responses: {
            "200": {
              description: "User profile retrieved successfully",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      id: {
                        type: "string",
                        example: "user123",
                      },
                      firstName: {
                        type: "string",
                        example: "John",
                      },
                      lastName: {
                        type: "string",
                        example: "Doe",
                      },
                      email: {
                        type: "string",
                        format: "email",
                        example: "user@example.com",
                      },
                    },
                  },
                },
              },
            },
            "401": {
              description: "Unauthorized - Invalid or missing token",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      message: {
                        type: "string",
                        example: "Unauthorized",
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
  },
  apis: [
    path.join(__dirname, "../api/auth/authRouter.ts"),
    path.join(__dirname, "../api/users/usersRouter.ts"),
  ],
};

export default swaggerOptions;
