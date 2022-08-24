FROM node:16.10.0
WORKDIR /home/node
COPY ./ ./
RUN yarn
RUN yarn build
EXPOSE 3000
ENV PORT 3000
#Launch the node command externally from npm to prevent him swallowing logs
CMD ["yarn", "start"]