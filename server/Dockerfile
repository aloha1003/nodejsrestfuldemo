FROM node:argon

# Create app directory
RUN mkdir -p /app
WORKDIR /app

# Install app dependencies
ADD . /app
RUN npm install

#EXPOSE 3000
CMD [ "npm", "start" ]