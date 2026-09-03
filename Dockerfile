# Base Image
FROM node:22

# directory
WORKDIR /app

# dependencies
COPY package*.json ./

# install them
RUN npm install

# copy whole directory to app
COPY . .

# build ts to js
RUN npm run build

# expose
EXPOSE 8010

# start server
CMD [ "node", "./dist/server.js"]