FROM node:16.10.0
WORKDIR /home/node
COPY ./ ./
RUN npm install
RUN npm run build
EXPOSE 3001
CMD ["node", "dist/server.js"]