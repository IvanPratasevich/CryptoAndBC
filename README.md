# Module 8

## The contract design and how it enforces multi-signature approval

Unlike conventional wallets secured by a single private key, a multi‑sig wallet requires a predefined number of authorized owners to confirm a transaction before it can be executed.  
In the contract this is enforced by:
- **Confirmation tracking**: each owner must call `confirmTransaction`.
- **Confirmations check**: without meeting this confirmations, execution reverts.
- **Modifiers**: `onlyOwner`, `notConfirmed`, and `notExecuted` prevent unauthorized access, duplicate confirmations, or double execution.

**Functions:**

1. `submitTransaction()`: Only an owner can submit a new transaction
2. `confirmTransaction()`: Owners can approve a transaction
3. `revokeConfirmation()`: Owners can revoke their approval before execution.
4. `executeTransaction()`


This design distributes control among multiple parties, reducing the risk of unauthorized access or accidental loss, and ensures that no single owner can unilaterally move funds.

## Deployment in Local Hardhat Tests and Scripts

In the unit tests, the contract is deployed locally in the `beforeEach()` hook.

How to run:

```bash
# 1. Compile Solidity contract
npx hardhat compile

# 2. Start local server
npx hardhat node

# 3. Run tests
npm run test
```

## Security Considerations
- Checks-Effects-Interactions Pattern: Used in executeTransaction to prevent reentrancy attacks.

- Access Control: onlyOwner modifier ensures only designated owners can interact with sensitive functions.

### Validation:

- Owners must be unique and non-zero addresses.

- Confirmation threshold must be valid

- Error Handling

- Event Logging: All critical actions emit events for transparency and monitoring.

## Potential Vulnerabilities Addressed
- Duplicate Confirmations

- Unauthorized Access

- Replay/Double Execution

- Invalid Transactions



Multi-sig wallets enhance security by requiring multiple approvals before a transaction executes. They eliminate single points of failure, protect against hacks or lost keys, and enable trustless collaboration—ideal for DAOs, teams, and treasury management. While slower to operate, they provide critical protection for high-value accounts in decentralized apps, making them a cornerstone of secure on-chain governance.