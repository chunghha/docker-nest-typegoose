FROM keymetrics/pm2:latest-alpine

# Create own api folder
RUN mkdir -p /api
WORKDIR /api

# Bundle APP files
COPY src src/
COPY package.json .
COPY yarn.lock .
COPY ecosystem.config.js .
COPY tsconfig.json .

# Install app dependencies
ENV NPM_CONFIG_LOGLEVEL warn
RUN npm i -g yarn
RUN yarn
RUN yarn build

# Expose the listening port of your app
EXPOSE 3100

# Show current folder structure in logs
# SRUN ls -al -R

CMD [ "pm2-runtime", "start", "ecosystem.config.js" ]
