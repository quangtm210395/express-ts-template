FROM node:12.20-alpine

# Create work directory
WORKDIR /app

# Install runtime dependencies
# RUN npm install yarn -g

# Copy app source to work directory
COPY . /app

# Install app dependencies
RUN yarn install

# Build and run the app
RUN yarn build

ENV NODE_ENV=production
CMD yarn start
