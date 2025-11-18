require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */

// https://v2.hardhat.org/hardhat-runner/docs/guides/deploying
// npx hardhat ignition deploy ./ignition/modules/Lock.js --network arbitrumSepolia
// npm install --save-dev hardhat@2.26.5

const PRIVATE_KEY = vars.get("TEST_PK");

module.exports = {
    solidity: "0.8.28",
    networks: {
        arbitrumSepolia: {
            url: `https://sepolia-rollup.arbitrum.io/rpc`,
            accounts: [PRIVATE_KEY],
            chainId: 421614,
        },
    },
};