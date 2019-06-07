FROM node:latest

RUN mkdir -p /usr/src/digital_menu
WORKDIR /usr/src/digital_menu

COPY package*.json /usr/src/digital_menu/
RUN npm install
COPY . /usr/src/digital_menu

EXPOSE 3000

# ===
# Launch the wait tool and then your application
# Source: https://dev.to/hugodias/wait-for-mongodb-to-start-on-docker-3h8b
# ===

ADD https://github.com/ufoscout/docker-compose-wait/releases/download/2.2.1/wait /wait
RUN chmod +x /wait
CMD /wait && npm start
