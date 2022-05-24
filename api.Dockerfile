FROM node:16-alpine

# Create app directory
WORKDIR /usr/src/

# Copy workspace config
COPY ./package.json .

# Copy packages
COPY ./api ./api

# Install dependencies for packages
RUN yarn workspace api install

# Run the app
WORKDIR /usr/src/api

ENV PORT 8081
EXPOSE 8081

CMD ["yarn", "run", "dev"]