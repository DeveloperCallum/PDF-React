# Use an official node image as a base
FROM node:22.11.0

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package.json package-lock.json ./

# Install a lightweight web server to serve the app
RUN npm install -g serve

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the React app for production
RUN npm run build

# Expose the port the app runs on
EXPOSE 5000

# Command to run the app
CMD ["serve", "-s", "build", "-l", "5000"]
