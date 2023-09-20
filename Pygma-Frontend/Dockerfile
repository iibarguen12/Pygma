# Use the official Node.js image as the base image
FROM node:18

# Set the working directory in the container
WORKDIR /app

# Install Nextjs and React
RUN npm cache clean -f
RUN npm install -g npm@latest
RUN npm install next@latest react@latest react-dom@latest

# Copy package.json and package-lock.json to the container
COPY package.json /app/package.json
COPY jsconfig.json /app/jsconfig.json

# Clean node_modules before installing dependencies
#RUN rm -rf node_modules package-lock.json

# Copy the .next folder and other necessary files
COPY .next /app/.next
COPY next.config.js /app/
COPY public /app/public
COPY src /app/src
COPY .env.local /app/.env.local

# Set environment variables
ENV NODE_OPTIONS=--max-old-space-size=4096
ENV NODE_ENV=production
ENV PATH=/app/node_modules/.bin:$PATH

# Install dependencies
RUN npm install --legacy-peer-deps
RUN npm run build --legacy-peer-deps

# Expose the port that your Next.js application uses
EXPOSE 3000

# Define the command to run your application
CMD ["npm", "run", "start", "--legacy-peer-deps"]
