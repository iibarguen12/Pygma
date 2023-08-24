# Use the official Node.js image as the base image
FROM node:18-alpine

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install dependencies
RUN  npm install country-cities --force
RUN  npm install --legacy-peer-deps

# Copy the .next folder and other necessary files
COPY .next ./.next
COPY public ./public

# Expose the port that your Next.js application uses
EXPOSE 3000

# Define the command to run your application
CMD ["npm", "start"]
