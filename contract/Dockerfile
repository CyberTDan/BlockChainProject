# Use a Node.js base image
FROM node:20.5

# Set the working directory in the container
WORKDIR /usr/src/app

COPY hardhat-project/hardhat.config.js hardhat-project/package-lock.json hardhat-project/package.json .
COPY hardhat-project/contracts contracts
COPY hardhat-project/scripts scripts
COPY hardhat-project/node_modules node_modules
COPY hardhat-project/artifacts artifacts
COPY hardhat-project/cache cache

# Expose the port the app runs on
EXPOSE 8545

# RUN npx harhat compile

# # Command to run Hardhat deploy script
CMD ["npx", "hardhat", "run", "scripts/deploy.js", "--network", "ganache"]
# CMD ["echo", "Hello world"]