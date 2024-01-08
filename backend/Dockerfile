# Use an official Node.js runtime as a parent image 
FROM node:14

# Set the working directory in the container
WORKDIR /usr/src/app 

# Copy package.json and package-lock.json to the working directory 
COPY package*.json ./

# Install dependencies 
RUN npm install 

# Copy the remaining files to the working directory
COPY . .

# Expose port 5000 to the outside world 
EXPOSE 5000 

# Command to run the application 
CMD ["npm", "start"] 