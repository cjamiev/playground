FROM node:16.13.0
WORKDIR .
COPY . /

EXPOSE 1000
CMD [ "node", "index.js" ]