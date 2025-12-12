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
# Logs LOCALHOST
# npx hardhat run scripts/network/batchMint-batchTransfer-ERC155.js --network sepolia 
Balance before. owner

Token ID | Balance (0x94d139bf...) (owner)
-------------------
Token 1: 1
Token 2: 1
Token 3: 1
Token 4: 1
Token 5: 1
Token 6: 1
Token 7: 1
Token 8: 1
Token 9: 1
Token 10: 1
--------------------
BATCH MINT
Minted!!!!!

Token ID | Balance (0x94d139bf...) (owner)
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

Token ID | Balance (0x94d139bf...) (owner)
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

Token ID | Balance (0x173e2fb3...) (student2)
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

 


```bash
# Logs LOCALHOST
#0. npx hardat compile
# 1. deploy network npx hardhat run scripts/localhost/deployERC1155.js --network localhost
Deployed to: 0x5FbDB2315678afecb367f032d93F642f64180aa3

# 2 batchMint, batchTransfer. 
# npx hardhat run scripts/localhost/batchMint-batchTransfer-ERC155.js --network localhost
Token 1 URI: ipfs://bafkreiahcxyuxetm3qirthefpeh523ccb7t6besfvnvkypkoc52vecnv4q
Metadata for token 1: {
  name: 'Azure Vortex',
  description: 'A swirling world of teal currents and deep blue oceans.',
  image: 'ipfs://bafybeih2yl4mpl7uadcdb4sugpbabedoss4wer5uom77ew4m622o3wxkoq',
  attributes: [
    { trait_type: 'Rarity', value: 'Rare' },
    { trait_type: 'Terrain Type', value: 'Fluid Swirl' },
    { trait_type: 'Energy Level', value: 75 },
    { trait_type: 'Resource Density', value: 60 }
  ]
}
Token 2 URI: ipfs://bafkreifoet4s7amkkcwquku5sqbtaeqbpfbir6fw7p4pcy7cavfc77rjp4
Metadata for token 2: {
  name: 'Neon Nebula',
  description: 'A vibrant planet featuring mint green and deep violet camo patterns.',
  image: 'ipfs://bafybeih4o7grmtajjxxmqam2wgs66xsr5nqvhvuuvt5x2e4ifjl7lmblni',
  attributes: [
    { trait_type: 'Rarity', value: 'Epic' },
    { trait_type: 'Terrain Type', value: 'Neon Camo' },
    { trait_type: 'Energy Level', value: 85 },
    { trait_type: 'Resource Density', value: 70 }
  ]
}
Token 3 URI: ipfs://bafkreifanvm3dcwm4vtvx3yeqmywosgou5jhlmuofttxaqu2ltahdcdm5i
Metadata for token 3: {
  name: 'Ember Crust',
  description: 'A hot surface of orange, red, and dark brown mineral deposits.',
  image: 'ipfs://bafkreif7jkrze2is6julpsvat3rwqv7cm5f2g6db4acx5ltzss6zvjgcrq',
  attributes: [
    { trait_type: 'Rarity', value: 'Common' },
    { trait_type: 'Terrain Type', value: 'Mottled Rock' },
    { trait_type: 'Energy Level', value: 40 },
    { trait_type: 'Resource Density', value: 30 }
  ]
}
Token 4 URI: ipfs://bafkreih7zgn32h4e3rxggjedjzlpsgixbqcj3ymg2k6fcky2rfofoeb2hi
Metadata for token 4: {
  name: 'Gaia Green',
  description: 'A lush terrestrial world with blue oceans and green continents.',
  image: 'ipfs://bafybeibtmlxmjddqvz2ofrhqlqk7kwyohx5p7cf2jrmbz6npv7fddlhu3e',
  attributes: [
    { trait_type: 'Rarity', value: 'Rare' },
    { trait_type: 'Terrain Type', value: 'Continental' },
    { trait_type: 'Energy Level', value: 60 },
    { trait_type: 'Resource Density', value: 85 }
  ]
}
Token 5 URI: ipfs://bafkreiasia5tlp7bycn72ozt2hhro52huwhr4ok3m64aakwqcwdywowd3e
Metadata for token 5: {
  name: 'Cobalt Void',
  description: 'A dark, rocky sphere with deep blue crater-like spots.',
  image: 'ipfs://bafybeieyy6huprhyim3tusxxuykaatrnc4ljwdsbgj66qhvwsvx77cnfde',
  attributes: [
    { trait_type: 'Rarity', value: 'Uncommon' },
    { trait_type: 'Terrain Type', value: 'Spotted Crust' },
    { trait_type: 'Energy Level', value: 35 },
    { trait_type: 'Resource Density', value: 45 }
  ]
}
Token 6 URI: ipfs://bafkreigpzr4mltujdlcmpuzkss4homu5yru6viy3jwniwgsi2hnqabm4j4
Metadata for token 6: {
  name: 'Desert Mirage',
  description: 'A sandy world covered in beige and brown desert dunes.',
  image: 'ipfs://bafybeic24ipdtlwpplweqwajacx4yqwuczallqsreugq63bdnsayv5ulyu',
  attributes: [
    { trait_type: 'Rarity', value: 'Common' },
    { trait_type: 'Terrain Type', value: 'Sand Camo' },
    { trait_type: 'Energy Level', value: 25 },
    { trait_type: 'Resource Density', value: 20 }
  ]
}
Token 7 URI: ipfs://bafkreihn3rjcmtjfpxllr5damkicy73yocxz42v2aebsu22xpr72xiedtm
Metadata for token 7: {
  name: 'Rose Quartz',
  description: 'A dusty pink planet with deep maroon tectonic patterns.',
  image: 'ipfs://bafybeidiswg7jxqhbt5z43b3xuoxyl5ujtsjwconuwoqyel5vw7qgusdbi',
  attributes: [
    { trait_type: 'Rarity', value: 'Uncommon' },
    { trait_type: 'Terrain Type', value: 'Crystalline' },
    { trait_type: 'Energy Level', value: 50 },
    { trait_type: 'Resource Density', value: 55 }
  ]
}
Token 8 URI: ipfs://bafkreicedgufihulo3xevpsiqz74al6iye4yjhhzhlv4r7aofukpwi4f6e
Metadata for token 8: {
  name: 'Glacial Tide',
  description: 'A cold, bright blue world with scattered white ice floes.',
  image: 'ipfs://bafybeid2m5l26e2wmbeem52q62wnao6tzqcuwpxpuwurvoicc52a7lff2y',
  attributes: [
    { trait_type: 'Rarity', value: 'Epic' },
    { trait_type: 'Terrain Type', value: 'Frozen Glacial' },
    { trait_type: 'Energy Level', value: 80 },
    { trait_type: 'Resource Density', value: 65 }
  ]
}
Token 9 URI: ipfs://bafkreiditbqlceij5a6cynyde7xc4zybtapfzeli3jl72lb2rjzissuwvi
Metadata for token 9: {
  name: 'Magma Stripes',
  description: 'A volatile world of flowing magma and red-hot gas bands.',
  image: 'ipfs://bafybeif4okwbtr5tntyfmfwdmnxkm5hpypmjgdbkdtyrdsapyabnlqsisq',
  attributes: [
    { trait_type: 'Rarity', value: 'Legendary' },
    { trait_type: 'Terrain Type', value: 'Molten Banded' },
    { trait_type: 'Energy Level', value: 95 },
    { trait_type: 'Resource Density', value: 90 }
  ]
}
Token 10 URI: ipfs://bafkreiexuyuxbem4qa47culffcbyj3zm3mamamizimryacmaf4zxob57zq
Metadata for token 10: {
  name: 'Void Purple',
  description: 'A mysterious sphere draped in deep purple and lavender cosmic mist.',
  image: 'ipfs://bafkreiemnpoz6iqgi2vgyazr4ira7s7eqtbda7aqyy5omjgjazjelusuiq',
  attributes: [
    { trait_type: 'Rarity', value: 'Legendary' },
    { trait_type: 'Terrain Type', value: 'Dark Matter' },
    { trait_type: 'Energy Level', value: 99 },
    { trait_type: 'Resource Density', value: 98 }
  ]
}
Balance before. owner

Token ID | Balance (0xf39Fd6e5...) (owner)
-------------------
Token 1: 1
Token 2: 1
Token 3: 1
Token 4: 1
Token 5: 1
Token 6: 1
Token 7: 1
Token 8: 1
Token 9: 1
Token 10: 1
--------------------
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
