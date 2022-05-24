FROM node:16-alpine

# Create app directory
WORKDIR /usr/src/

# Copy workspace config
COPY ./package.json .

# Copy packages
COPY ./ui ./ui

# Install dependencies for packages
RUN yarn workspace ui install

# Run the app
WORKDIR /usr/src/ui

ENV PORT 3000
EXPOSE 3000

CMD ["yarn", "start"]