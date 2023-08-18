# Mern application with Docker

Certainly! Here's an introduction to the MERN stack and how to set up a MERN application using Docker:

**Introduction to the MERN Stack:**

The MERN stack is a popular combination of technologies used to build modern web applications. It consists of four core components:

1. **MongoDB:** A NoSQL database that stores data in a flexible, JSON-like format.
2. **Express:** A web application framework for building APIs and handling server-side logic.
3. **React:** A JavaScript library for building user interfaces, enabling dynamic and interactive frontends.
4. **Node.js:** A runtime environment that allows running JavaScript code on the server-side.

The MERN stack allows developers to build full-stack applications with a unified language (JavaScript) across both the frontend and backend. Docker can be used to containerize and deploy these components, making it easier to manage development environments and deploy applications to various environments.


**Step 1: Create the Project Directory**

```sh
mkdir my-mern-app
cd my-mern-app
```

**Step 2: Frontend Setup**

```sh
mkdir frontend
cd frontend
```

Create a file named `Dockerfile` in the `frontend` directory with the following content:

```Dockerfile
# Use an official Node.js runtime as the base image
FROM node:14

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY frontend/package*.json ./

# Install frontend dependencies using Yarn
RUN yarn install

# Copy the rest of the frontend code
COPY frontend/ .

# Expose the port that your React app will run on
EXPOSE 3000

# Command to start your React app
CMD [ "yarn", "start" ]
```

Now, create a file named `package.json` in the `frontend` directory:

```json
{
  "name": "frontend",
  "version": "1.0.0",
  "dependencies": {
    // Add your frontend dependencies here
  }
}
```

**Step 3: Backend Setup**

Navigate back to the main project directory:

```sh
cd ..
mkdir backend
cd backend
```

Create a file named `Dockerfile` in the `backend` directory with the following content:

```Dockerfile
# Use an official Node.js runtime as the base image
FROM node:14

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY backend/package*.json ./

# Install backend dependencies using Yarn
RUN yarn install

# Copy the rest of the backend code
COPY backend/ .

# Expose the port that your Express app will run on
EXPOSE 5001

# Command to start your Express app
CMD [ "node", "server.js" ]
```

Create a file named `package.json` in the `backend` directory with the following content:

```json
{
  "name": "backend",
  "version": "1.0.0",
  "dependencies": {
    "express": "^4.17.1",
    "mongoose": "^6.0.1"
  }
}
```

Create a file named `server.js` in the `backend` directory with the following content:

```js
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const PORT = 5001;

mongoose.set('strictQuery', true);

mongoose.connect('mongodb://mongodb:27017/your-database-name', { 
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });

app.get('/', (req, res) => {
  res.send('Hello from the backend!');
});

app.listen(PORT, () => {
  console.log(`Backend server is running on port ${PORT}`);
});
```

**Step 4: Docker Compose Setup**

Go back to the main project directory and create the `docker-compose.yml` file:

```yaml
version: '3'
services:
  backend:
    build:
      context: .
      dockerfile: backend/Dockerfile
    ports:
      - "5001:5001"
    networks:
      - app-network
  frontend:
    build:
      context: .
      dockerfile: frontend/Dockerfile
    ports:
      - "3000:3000"
    networks:
      - app-network
networks:
  app-network:
    driver: bridge
```

**Step 5: Build and Run Containers**

Navigate to the main project directory using your terminal and run:

```sh
docker-compose up
```

**Step 6: Access Your Applications**

- The backend will be accessible at `http://localhost:5001`.
- The frontend will be accessible at `http://localhost:3000`.

Remember, this guide sets up a Dockerized environment for your MERN (MongoDB, Express, React, Node.js) application. You can customize the Dockerfiles, `docker-compose.yml`, and other files to match your project's specific requirements.
