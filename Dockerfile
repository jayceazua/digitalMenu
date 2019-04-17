FROM node:latest
RUN mkdir -p /usr/src/digital_menu
WORKDIR /usr/src/digital_menu
COPY package*.json /usr/src/digital_menu/
RUN npm install
COPY . /usr/src/digital_menu
EXPOSE 3000
ENTRYPOINT npm start
CMD ["npm", "start"]
