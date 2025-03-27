# Auth API

Authentication API developed with Express, TypeScript, Docker, and Prisma ORM.

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Introduction

This project is an Authentication API designed to handle user authentication processes using modern web development technologies. It provides a robust and scalable solution for securing web applications.

## Features

- User registration and login
- Password hashing and validation
- JWT token generation and verification
- Role-based access control
- Secure password reset functionality

## Technologies Used

- **Express**: A web application framework for Node.js, used for building the API's server-side logic.
- **TypeScript**: A statically typed superset of JavaScript, enhancing code quality and maintainability.
- **Docker**: A platform for containerizing applications, ensuring consistent environments across different stages of development and deployment.
- **Prisma ORM**: An Object-Relational Mapper that simplifies database interactions and management, providing a type-safe database client.

## Installation

To install and run this project locally, follow these steps:

1. Clone the repository:

```bash
git clone https://github.com/nicolasjoaquinparisi/auth-api.git
```

2. Navigate to the project directory:

```bash
cd auth-api
```

3. Install the dependencies:

```bash
npm install
```

4. Set up the environment variables:

Create a `.env` file in the root directory and add the necessary environment variables. Refer to the `.env.example` file for the required variables.


5. Run postgres docker container:

```bash
make up
```

6. Run database migrations:

```bash
make migrate
```

7. Run the development server:

```bash
npm run dev
```

## Usage

Once the server is running, you can interact with the API using tools like Postman or cURL. The available endpoints include:

- `POST /api/auth/signup`: Register a new user
- `POST /api/auth/signin`: Authenticate a user and retrieve a JWT token
- `GET /api/users/profile`: Retrieve the authenticated user's profile (requires JWT token)

Refer to the API documentation for detailed information on each endpoint and their required parameters.
