# Use the official Node.js 14 image as the base image
FROM node:20.15.0

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install Node.js dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Command to run the application
CMD ["node", "server.js"]
