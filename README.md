# Express Starter App with Class-Based Approach With Mongoose ORM

## Overview

This is a starter template for an Express.js web application that follows a class-based structure. It provides a well-organized and scalable foundation for building robust APIs and web services.

## Table of Contents

- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Configuration](#configuration)
- [Project Structure](#project-structure)
- [Running the App](#running-the-app)

## Getting Started

### Prerequisites

Ensure that you have the following software installed on your machine:

- [Node.js](https://nodejs.org/) (version 14 or later)
- [npm](https://www.npmjs.com/) (Node Package Manager)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/ChandanPatnaik/mongoose-express-starter.git
   ```

2. Navigate to the project directory:

   ```bash
   cd express-starter-class-based
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

### Configuration

Create a .env file in the root directory with the following configuration:

    PORT=3000
    DATABASE_URL=mongodb://localhost:27017/your-database-name
    JWT_SECRET=your-secret-key
    API_VERSION=v1

Replace your-database-name and your-secret-key with your desired values.

### Project Structure

The project follows a class-based approach to maintain a clean and modular structure:

- /src
  - /controllers: Contains controller classes for handling business logic.
  - /helpers: Utility classes or helper functions.
  - /middlewares: Middleware classes for Express.
  - /models: Data models or schemas.
  - /routes: Route classes for defining API routes.
  - /services: Business logic and data manipulation.
  - /validations: Validation classes using express-validator.
  - app.plugin.ts: Main application class where Express app is configured.
  - server.ts: Entry point for starting the server.

### Structure Details

- /controllers: Contains controller classes responsible for handling business logic.
- /helpers: Directory for utility classes or helper functions.
- /middlewares: Middleware classes used by Express for request processing.
- /models: Data models or schemas for interacting with the database.
- /routes: Route classes defining API endpoints and handling HTTP requests.
- /services: Business logic and data manipulation services.
- /validations: Validation classes using express-validator for input validation.
- app.plugin.ts: Main application class where the Express app is configured.
- server.ts: Entry point for starting the server.

### Running the App

Start the development server:

```bash
npm run server
```
