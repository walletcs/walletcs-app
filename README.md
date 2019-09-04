# WalletCS
A cold storage system for secure handling of the blockchain assets.

> - Main site:   https://www.walletcs.com
> - Web app :    https://app.walletcs.com
> - Testnet app: https://testnet.walletcs.com


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
Features like support of smart contracts and batch transactions make WalletCS suitable for enterprise-grade environments.



## Features
- Supports Ethereum and Bitcoin blockchains, cryptocurrency and smart contracts
- Offline creation of blockchain account
- Offline recovery of private keys from passphrase
- Offline [xPUB](https://support.blockchain.com/hc/en-us/articles/360000939843-Understanding-the-xPub-and-address-generation) keys generation
- Offline address validation with the private key
- Offline recovery of an address (public key) from the private key 
- Offline backup of private keys flash drive
- Offline signing of coin transfer transaction
- Offline signing of smart contract transaction, including multisignature transactions
- Batch transaction operations, e.g. mass payments in cryptocurrency
- Broadcast transaction signed offline
- Supports Bitcoin Testnet and Ethereum Rinkeby blockchains

__Our general design guideline is: as long as private keys are generated and handled offline and physically secured, your assets are safe__


![alt text](https://github.com/exiliontech/walletcs-app/blob/master/diagram.png "High-level diagram")

## Components
### WalletCS Web Application
WalletCS Web Application is used to create and broadcast transactions and transaction batches.

### WalletCS Offline Application
WalletCS Offline Application is used to generate accounts, sign transactions and perform other offline operations.
This applicaiton is designed to be installed on the offline computer.

#### Offline computer hardware requirements
- Linux OS, Windows 10, Mac OS
- At least 200MB hard drive space
- At least 2GB RAM
- USB drive
- Make sure network adapters are disconnected or disabled

## Installation

1. Build from the source or download the application from www.walletcs.com to the flash drive. 

   ...**Important**: 
  
   ... - check the url and SSL certificate to make sure you are downloading from the right site.
   
   ... - verify GPG signature to ensure download integrity

2. Install application on the offline computer that will be used for offline operations
  
  ... **Important**: 
  
  ... Do not connect your offline computer to the internet as long as it is being used for signing offline transactions.

## Creating an Account
To create an account, open WalletCS Offline Application on the offline computer, click “Create account”, and follow the instructions. 
Blockchain account is represented by private key and the address. Optionally, you can create [xPub](https://support.blockchain.com/hc/en-us/articles/360000939843-Understanding-the-xPub-and-address-generation).
 
**Private key** is secret and must be stored stored in physically secure and safe location. Flash drive with private key should never be inserted to any device that is currently online or will be online in the future, e.g. it will be used only with our offline computer. 
It is a good idea to always clearly mark Private key flash drive.

**Address** can be used online. For example, address can be provided to another party to transfer coins to.
Following creation of the Account, we highly recommend validating your key and address and creating a backup copy of a Private keys flash drive using WalletCS Offline App.

**xPub** is a master public key that can be used to safely generate new addresses for your bitcoin account. While xPub itself can't be used to withdraw funds, we recommend keeping it safe for privacy: Anyone in posession of your xPub can monitor on all your transactions.


**Important**
- Do not insert Private key flash drive to any device that is currently online or will be online at any point in the future.
- Ensure physical security and safety of a Private key flash drive.
- It is strongly recommended to make a backup of the Private key flash drive. Use “backup private keys” function of a WalletCS Offline Application.
- Following account creation, it is strongly recommended to verify the account. Use “Verify account” function of WalletCS Offline Application.  


## Transferring coins or tokens and invoking smart contract methods
1. Fill a form at [app.walletcs.com](https://app.walletcs.com): 
..* For Coin Transfer: specify address and amount to transfer 
..* For Smart Contract Transaction: choose method to execute, specify parameters 

2. Download unsigned transaction to the flash drive. Let’s call it “Transactions” drive.

3. Insert “Transactions” flash drive with unsigned transaction  to the offline computer, where WalletCS Offline Application is installed.

4. Click “Sign transaction”. WalletCS Offline App will ask you to:
   
   ..* insert your Private Key flash drive
   
   ..* check transfer / method details and sign your transaction
   
   ..* insert “Transactions” flash drive to save signed transaction.  

5. go back to [app.walletcs.com](https://app.walletcs.com), click “Broadcast Transaction” button and upload  signed transaction file from “Transactions” flash drive. Once you verify transaction details, click “Broadcast” to broadcast transactions.

## Batch operations
To construct complex transaction featuring inputs and outputs, you have an option to upload a csv file

### Bitcoin csv file format
https://app.walletcs.com/bitcoin/single

| address | address_type | amount | change   |
| ---------------------------- | ------| ----- | -------- |
| 3Er5EKhLNqaq1tKHH5g91tq6yC6PvDM8DE |  from |       |          |
| 3E6tXnuXnapWfJWspsitd2BFUC27Gswfxk |  from |       |  true    |
| 3CiHdL6KmCpPBL93QJ6PcNovWpBnDVwaTH |  to   | 0.1 |          |
| 3DfTLsfGCnzejVc6iYbWjnYBXXbxyA33DL |  to   | 0.5 |          |

- specify only one change address
- order is important. When constructing transaction, WalletCS iterates through "from" addresses to collect necessary amount. 
In the example above, to collect total of BTC 0.6 walletcs will first take all available funds from _3Er5EK..._, and the reminder from _3E6tX..._. If balances on both input adresses do not have at least BTC 0.6, transaction will not be generated.

### Batch transaction Ethereum operations
https://app.walletcs.com/ether/contract/batch

For Ethereum batch transaction, enter source address online on the form and upload csv file with destination addresses and amounts:


| address | amount |
| -------------------------------------------| --------|
| 0x323e0df78eef962e425959dbdb0e7cb82e19cb67 |  0.01   |
| 0xdc97c8a2aeb281af14a755d8f6b0c6bd7debbdf7 |  1      |


## Validating account and regenerating addresses
Click “Validate account” on WalletCS Offline Application and follow the instructions. You have an option to generate xPub.

## Backing up flash drive
Click “Backup Private Keys” on WalletCS Offline Application and follow the instructions.
We recommend keeping backup flash drive at a secure alternative physical location.

**Important**: 
- While it is technically possible to create a copy of the flash drive using online computer, we strongly recommend secure copy using WalletCS Offline Application to avoid online exposure of your private keys.
- Clearly mark private key drive so you don't use it accidentaly for any other purpose

## FAQ
* **Why should I trust WalletCS**
   
   ..* You do not. We encourage you to examine source code and build from source or verify GPG signatures of binary files

* **How WalletDS is different from hardware wallets**

   ..* With WalletCS you store only flash drive offline. There is no need to keep the device securely stored.

   ..* WalletCS supports smart contracts. 
   
   ..* WalletCS is customizable.


## Getting support
If you experience a problem, please create an issue [here](https://github.com/walletcs/walletcs-app/issues)

We will be happy to assist you with customization and integration! Contact us at sales@exilion.com
