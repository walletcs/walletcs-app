# WalletCS
A cold storage system that enables secure handling of blockchain assets.

**Table of contents**

[Features](https://github.com/walletcs/walletcs-app/blob/master/README.md#features)

[Components](https://github.com/walletcs/walletcs-app/blob/master/README.md#components)

[Hardware requirements](https://github.com/walletcs/walletcs-app/blob/master/README.md#offline-computer-hardware-requirements)

[Installation](https://github.com/walletcs/walletcs-app/blob/master/README.md#Installation)

[FAQ](https://github.com/walletcs/walletcs-app/blob/master/README.md#FAQ)

[Creating an account](https://github.com/walletcs/walletcs-app/blob/master/README.md#creating-an-account)

[Support](https://github.com/walletcs/walletcs-app/blob/master/README.md#getting-support)


## Overview

WalletCS is a cold storage-based security platform for blockchain assets.
In WalletCS system, your private keys are generated and handled in the offline, "air-gapped" environment which is never connected to the internet.
Features like smart contract support and batch transactions make WalletCS suitable for enterprise-grade environments.



## Features
- Supports Ethereum and Bitcoin blockchains, cryptocurrency and smart contracts
- Offline creation of blockchain accounts
- Offline address validation with private key
- Offline regeneration of an address (public key) from the private key 
- Offline backup of private keys flash drive
- Offline signing of coin transfer transaction
- Offline signing of smart contract transaction, including multisignature transactions
- Batch transaction operations, e.g. mass paymentsin cryptocurrency
- Broadcast

__Our general design guideline is: as long as private keys are generated and handled offline and physically secured, your assets are safe__


![alt text](https://github.com/exiliontech/walletcs-app/blob/master/diagram.png "Hiigh-level diagram")

## Components
### WalletCS Web Application
WalletCS Web Application is used to create and broadcast transactions and transaction batches.
> URL: https://app.walletcs.com
> Testnet URL: https://testnet.walletcs.com

### WalletCS Offline Application
WalletCS Offline Application is used to generate accounts, sign transactions and perform other offline operations.
This applicaiton is designed to be installed on the offline computer.

#### Offline computer hardware requirements
- Linux OS
- At least 100MB hard drive space
- At least 1GB RAM
- USB drive
- Make sure network adapters are disconnected or disabled

__Contact us about dedicated devices at sales@exilion.com__

## Installation
1. Build from the source or download the application from www.walletcs.com to the flash drive. 

**Important**: 
- check the url and SSL certificate to make sure you are downloading from the right site.
- verify GPG signature to ensure download integrity
3. Install application on the offline computer that will be used for offline operations

**Important**: 
Do not connect your offline computer to the internet as long as it is being used for signing offline transactions.

## Creating an Account
To create an account, open WalletCS Offline Application on the offline computer, click “Create account”, and follow the instructions. 
Blockchain account is represented by Private key and the address.
 
**Private key** is secret and must be stored stored in physically secure and safe location. Flash drive with private key should never be inserted to any device that is currently online or will be online in the future, e.g. it will be used only with our offline computer. 
It is a good idea to always clearly mark Private key flash drive.

**Address** can be used online. For example, address can be provided to another party to transfer coins to.
Following creation of the Account, we highly recommend validating your key and address and creating a backup copy of a Private keys flash drive using WalletCS Offline App.

**Important**
- Do not insert Private key flash drive to any device that is currently online or will be online at any point in the future.
- Ensure physical security and safety of a Private key flash drive.
- It is strongly recommended to make a backup of the Private key flash drive. Use “backup private keys” function of a WalletCS Offline Application.
- Following account creation, it is strongly recommended to verify the account. Use “Verify account” function of WalletCS Offline Application.  


## Transferring coins or tokens and invoking smart contract methods
1. Fill a form at app.walletcs.com: 
* For Coin Transfer: specify address and amount to transfer 
* For Smart Contract Transaction: choose method to execute, specify parameters 

2. Download unsigned transaction to the flash drive. Let’s call it “Transactions” drive.

3. Insert “Transactions” flash drive with unsigned transaction  to the offline computer, where WalletCS Offline Application is installed.

4. Click “Sign transaction”. WalletCS Offline App will:
* Ask you to insert your Private Key flash drive
* Ask you to check transfer details and sign your transaction
* Ask you to insert “Transactions” flash drive to save signed transaction.  

5. go back to app.walletcs.com, click “Broadcast Transaction” button and upload  signed transaction file from “Transactions” flash drive. Once you verify transaction details, click “Broadcast” to broadcast transactions. 

## Batch operations
TODO: csv format

## Validating account and regenerating addresses
Click “Validate account” on WalletCS Offline Application and follow the instructions. 

## Backing up flash drive

Click “Backup Private Keys” on WalletCS Offline Application and follow the instructions.
We recommend keeping backup flash drive at a secure alternative location.

**Important**: 
- While it is technically possible to create a copy of the flash drive using online computer, we strongly recommend secure copy using WalletCS Offline Application to avoid online exposure of your private keys.
- Clearly mark private key drive so you don't use it accidentaly for any other purpose

## FAQ
TODO:

## Getting support
If you experience a problem, please create an issue [here](https://github.com/walletcs/walletcs-app/issues)

We will be happy to assist you with customization and integration! Contact us at sales@exilion.com
