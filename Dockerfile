FROM node:12.22
RUN mkdir /usr/src/app
WORKDIR /usr/src/app
RUN npm install -g @angular/cli
COPY ./angular/ .
