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

# Expose port 3000 to the outside world 
EXPOSE 3000 

# Copy the SSL certificates into the container
# COPY .csr/* /app/frontend/.cert/
# COPY .key/* /app/frontend/.cert/

# Command to run the application 
CMD ["npm", "start"]