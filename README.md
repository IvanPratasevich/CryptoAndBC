# Module 9

## ERC-721 Soulbound Student Visit Card Contract
```bash
# Logs
# 0.
#npx hardat compile
# 1. deploy network
#npx hardhat run scripts/localhost/deployERC721.js --network sepolia
deployer: 0x94d139bfc9FeDfcA50BeB63909FB3FF7F067E31e
VisitCard deployed at: 0xdEFAA689AFE32E8984c72ebFB45d5Ba353B4f8cd

# 2. mint
# npx hardhat run scripts/network/interactERC721VisitCard.js --network sepolia
student1: 0x94d139bfc9FeDfcA50BeB63909FB3FF7F067E31e
student2: 0x173e2fb370ad50961ebd369caddbb2c8ef1084b8
--------------------------
Student1 minted! Tx: 0x4db8fd6f9f118f7795b05b1a8ea99fb82a713cdd0198e5cfd3de6e1f42d72add
Token ID Student1: 1
Student Student1: 0x94d139bfc9FeDfcA50BeB63909FB3FF7F067E31e
URI Student1: ipfs://bafkreigtuuhoxl7zzus6f6n7ozqaj362yqn7bu5zcwhrfxx64oxickpqqi
tokenURI check Student1: ipfs://bafkreigtuuhoxl7zzus6f6n7ozqaj362yqn7bu5zcwhrfxx64oxickpqqi
--------------------------
MINT STUDENT 2
Student2 minted! Tx: 0xd2f4638705a428d9da1de0831680934a9c073b398bf4179b6ef49ff7f9b0ed8f
Token ID Student2: 2
Student Student2: 0x173E2fb370Ad50961EBD369CaddbB2c8Ef1084B8
URI Student2: ipfs://bafkreibojiiltf5hlbabtpzybrfqlx26ay4elj77ogzvej4nrd7z5ufxwa
tokenURI check: ipfs://bafkreibojiiltf5hlbabtpzybrfqlx26ay4elj77ogzvej4nrd7z5ufxwa

FINAL STATS
Student1 balance: 1
Student2 balance: 1
```

### MetaMask
<img width="1421" height="710" alt="image" src="https://github.com/user-attachments/assets/2527f6d6-915b-4856-8c19-64161a08bc26" />
<img width="905" height="240" alt="image" src="https://github.com/user-attachments/assets/87f54356-cdcd-4426-86f5-c7644e1794bf" />
<img width="816" height="712" alt="image" src="https://github.com/user-attachments/assets/d6f3b63f-52e8-4990-9ba5-4f45d7550c6a" />
<img width="452" height="499" alt="image" src="https://github.com/user-attachments/assets/1220ea5d-391f-4b16-a145-c92fdc6c5f33" />
<img width="832" height="729" alt="image" src="https://github.com/user-attachments/assets/95d6f6d7-ad72-404d-a3e7-b3d47b5be2ff" />
<img width="449" height="408" alt="image" src="https://github.com/user-attachments/assets/d1c5c22a-39fd-447d-ae44-c8d5e9ebc95d" />

### &nbsp;&nbsp;&nbsp;&nbsp;

## ERC-1155 Game Character Collection Contract
```bash
# Logs
#0. npx hardat compile
# 1. deploy network npx hardhat run scripts/localhost/deployERC1155.js --network localhost
Deployed to: 0x5FbDB2315678afecb367f032d93F642f64180aa3

# 2 batchMint, batchTransfer. 
# npx hardhat run scripts/localhost/batchMint-batchTransfer-ERC155.js --network localhost
BATCH MINT
Minted!!!!!

Token ID | Balance (0xf39Fd6e5...) (owner)
-------------------
Token 1: 2
Token 2: 2
Token 3: 1
Token 4: 1
Token 5: 1
Token 6: 1
Token 7: 1
Token 8: 1
Token 9: 1
Token 10: 1
SENT Token 5 and 6 to STUDENT2!
--------OWNER AFTER------------

Token ID | Balance (0xf39Fd6e5...) (owner)
-------------------
Token 1: 2
Token 2: 2
Token 3: 1
Token 4: 1
Token 5: 0
Token 6: 0
Token 7: 1
Token 8: 1
Token 9: 1
Token 10: 1
---------STUDENT2 AFTER----------

Token ID | Balance (0x70997970...) (student2)
-------------------
Token 1: 0
Token 2: 0
Token 3: 0
Token 4: 0
Token 5: 1
Token 6: 1
Token 7: 0
Token 8: 0
Token 9: 0
Token 10: 0
```
