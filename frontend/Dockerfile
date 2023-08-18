# Use an official Node.js runtime as the base image
FROM node:20

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
