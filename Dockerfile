FROM keymetrics/pm2:latest-alpine

# Create own api folder
RUN mkdir -p /api
WORKDIR /api

# Install the dependencies
ENV NPM_CONFIG_LOGLEVEL warn
RUN npm i -g yarn
COPY package.json .
COPY yarn.lock .
RUN yarn

# Build the API
COPY tsconfig.json .
COPY tsconfig.build.json .
COPY env env/
COPY src src/
RUN yarn build

# Expose the API port
EXPOSE 3100

# Run the API with pm2
COPY ecosystem.config.js .
ENTRYPOINT [ "pm2-runtime" ]
CMD [ "start", "ecosystem.config.js" ]
