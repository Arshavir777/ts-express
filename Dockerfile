FROM node:16

# Update npm and install pm2
RUN npm install -g npm@latest
RUN npm install -g nodemon pm2

# Select app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json ./
RUN npm i

# If you are building your code for production
# RUN npm ci --only=production

COPY . .

RUN npm run build; exit 0

#CMD [ "npm", "pm2" ]
CMD [ "npm", "start" ]
