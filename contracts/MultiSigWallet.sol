// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

contract MultiSigWallet {
    // events for logging actions
    event Deposit(address indexed sender, uint256 amount, uint256 balance);
    event SubmitTransaction(address indexed owner, uint256 indexed txIndex, address indexed to, uint256 value, bytes data);
    event ConfirmTransaction(address indexed owner, uint256 indexed txIndex);
    event RevokeConfirmation(address indexed owner, uint256 indexed txIndex);
    event ExecuteTransaction(address indexed owner, uint256 indexed txIndex);

    address[] public owners;

    // if an address is one of the wallet owners
    mapping(address => bool) public isOwner;

    // minimum number of confirmations required to execute a transaction
    uint256 public numConfirmationsRequired;

    struct Transaction {
        address to; // recipient address
        uint256 value; // amount
        bytes data;
        bool executed; // whether transaction has been executed
        uint256 numConfirmations;
    }
    Transaction[] public transactions;

    // who confirmed which transaction
    mapping(uint256 => mapping(address => bool)) public isConfirmed;

    modifier onlyOwner() {
        require(isOwner[msg.sender], "Not owner");
        _;
    }

    modifier txExists(uint256 _txIndex) {
        require(_txIndex < transactions.length, "Tx does not exist");
        _;
    }

    modifier notExecuted(uint256 _txIndex) {
        require(!transactions[_txIndex].executed, "Tx already executed");
        _;
    }

    modifier notConfirmed(uint256 _txIndex) {
        require(!isConfirmed[_txIndex][msg.sender], "Tx already confirmed");
        _;
    }

    constructor(address[] memory _owners, uint256 _numConfirmationsRequired) {
        require(_owners.length > 0, "Owners required");
        //  required confirmations must be between 1 and the number of owners
        require(_numConfirmationsRequired > 0 && _numConfirmationsRequired <= _owners.length, "Invalid num confirmations");
        // add owners
        for (uint i = 0; i < _owners.length; i++) {
            address owner = _owners[i];
            // non zero and unique address
            require(owner != address(0) && !isOwner[owner], "Invalid owner");
            isOwner[owner] = true;
            owners.push(owner);
        }

        // save how many owners must approve a transaction into contract storage
        numConfirmationsRequired = _numConfirmationsRequired;
    }

    receive() external payable {
        emit Deposit(msg.sender, msg.value, address(this).balance);
    }

    function submitTransaction(address _to, uint256 _value, bytes calldata _data) external onlyOwner returns (uint256) {
        // new transaction index
        uint256 txIndex = transactions.length;
        transactions.push(Transaction(_to, _value, _data, false, 0));
        emit SubmitTransaction(msg.sender, txIndex, _to, _value, _data);
        return txIndex;
    }

    function confirmTransaction(uint256 _txIndex) external onlyOwner txExists(_txIndex) notExecuted(_txIndex) notConfirmed(_txIndex) {
        Transaction storage transaction = transactions[_txIndex];
        transaction.numConfirmations += 1;
        // record confirmation
        isConfirmed[_txIndex][msg.sender] = true;
        emit ConfirmTransaction(msg.sender, _txIndex);
    }

    function revokeConfirmation(uint256 _txIndex) external onlyOwner txExists(_txIndex) notExecuted(_txIndex) {
        // must have confirmed before
        require(isConfirmed[_txIndex][msg.sender], "Not confirmed!");
        Transaction storage transaction = transactions[_txIndex];
        transaction.numConfirmations -= 1;
        isConfirmed[_txIndex][msg.sender] = false; // remove confirmation
        emit RevokeConfirmation(msg.sender, _txIndex);
    }

    function executeTransaction(uint256 _txIndex) external onlyOwner txExists(_txIndex) notExecuted(_txIndex) {
        Transaction storage transaction = transactions[_txIndex];
        // checks-effects-interactions pattern
        // 1. checks
        require(transaction.numConfirmations >= numConfirmationsRequired, "Not enough confirmations");

        // 2. effects
        transaction.executed = true;

        // 3. interactions
        (bool success, ) = transaction.to.call{value: transaction.value}(transaction.data);
        require(success, "Tx failed");
        emit ExecuteTransaction(msg.sender, _txIndex);
    }

    function getTransactionCount() external view returns (uint256) {
        return transactions.length;
    }
}