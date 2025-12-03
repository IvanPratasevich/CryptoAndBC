# Module 7

- **Proxy Address:** `0x8dE9Ee2754d1C42192fc4E7aDE74c788eF812111`  
  [View on Etherscan](https://sepolia.etherscan.io/address/0x8dE9Ee2754d1C42192fc4E7aDE74c788eF812111)
- **Implementation V1 Address:** `0xcE7E9b70F182eBbD5157Ef6821DfB99f18d5A513`  
  [View on Etherscan](https://sepolia.etherscan.io/address/0xcE7E9b70F182eBbD5157Ef6821DfB99f18d5A513)
- **ProxyAdmin Address:** `0x8644F902AEc0642210d73eBF760714759648E384`  
[View on Etherscan](https://sepolia.etherscan.io/address/0x8644F902AEc0642210d73eBF760714759648E384)
- **Implementation V2:** `0x4D7A89878b2c4a20040e336b1BC5c130cdf7071F`  



## Deployment Scripts


```bash
# 1. 
npx hardhat run scripts/deploy.js --network sepolia

# 2.
npx hardhat run scripts/interact.js --network sepolia

# 3.
npx hardhat run scripts/upgrade.js --network sepolia
```

## Logs

```bash
# 1. 
npx hardhat run scripts/deploy.js --network sepolia

my address: 0x94d139bfc9FeDfcA50BeB63909FB3FF7F067E31e
proxy address: 0x8dE9Ee2754d1C42192fc4E7aDE74c788eF812111
implementation address: 0xcE7E9b70F182eBbD5157Ef6821DfB99f18d5A513
proxyAdmin address: 0x8644F902AEc0642210d73eBF760714759648E384

# 2.
npx hardhat run scripts/interact.js --network sepolia

ivan: 0x94d139bfc9FeDfcA50BeB63909FB3FF7F067E31e
token: GreenToken GNT
ivan balance: 3000000.0

-----------------------------------------
Minting
ivan2 balance before minting: 0.0
minting 500 tokens to ivan2:
ivan2 balance after minting: 500.0
-----------------------------------------
ivan1 balance before transfer: 3000000.0
ivan2 balance before transfer: 500.0

transfer tokens
transferring 200 tokens

balances:
ivan1 owner: 2999800.0
ivan2: 700.0
-----------------------------------------

# 3.
npx hardhat run scripts/upgrade.js --network sepolia

before upgrade:
balance: 2999800.0
upgraded to v2
implementation v2: 0x4D7A89878b2c4a20040e336b1BC5c130cdf7071F

after upgrade:
balance: 2999800.0
balance unchanged: 2999800.0
version: V2

```