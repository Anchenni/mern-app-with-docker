# Use an official Node.js runtime as the base image
FROM node:20

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
