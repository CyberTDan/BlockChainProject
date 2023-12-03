# # Use a Node.js base image
FROM node:20.5

# Set working directory
WORKDIR /app

# Install netcat
RUN apt-get update && apt-get install -y netcat-openbsd

# Install Solidity compiler (solc)
RUN npm install -g solc

# Copy your contract files and other necessary files
COPY hardhat-project/hardhat.config.js hardhat-project/package-lock.json hardhat-project/package.json .

# Install project dependencies
RUN npm install

COPY hardhat-project/contracts contracts

# Compile the Solidity contracts
RUN npx hardhat compile

COPY hardhat-project/scripts scripts

RUN chmod +x scripts/wait-for.sh

CMD ["scripts/wait-for.sh", "ganache", "npx", "hardhat", "run", "scripts/deploy.js", "--network", "ganache"]
