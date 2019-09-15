# WalletCS ![GitHub package.json version](https://img.shields.io/github/package-json/v/walletcs/walletcs-app) [![GitHub license](https://img.shields.io/github/license/walletcs/walletcs-app.svg)](https://github.com/walletcs/walletcs-app/blob/master/LICENSE) [![build status](https://gitlab.com/walletcs/walletcs-app/badges/master/pipeline.svg)](https://gitlab.com/walletcs/walletcs-app/commits/master)

<p align="center">
    <a href="https://github.com/walletcs/walletcs-app/graphs/contributors" alt="Contributors">
        <img src="https://img.shields.io/github/contributors/badges/shields" /></a>
    <a href="#backers" alt="Backers on Open Collective">
        <img src="https://img.shields.io/opencollective/backers/shields" /></a>
    <a href="https://github.com/walletcs/walletcs-app/pulse" alt="Activity">
        <img src="https://img.shields.io/github/commit-activity/m/badges/shields" /></a>
</p>
Cold-storage based security suite for blockchain assets

> - Main site: https://www.walletcs.com [![Website walletcs.com](https://img.shields.io/website-up-down-green-red/http/monip.org.svg)](https://www.walletcs.com/)
> - Web app : https://app.walletcs.com [![Website app.walletcs.com](https://img.shields.io/website-up-down-green-red/http/monip.org.svg)](https://app.walletcs.com/)
> - Testnet app: https://testnet.walletcs.com [![Website testnet.walletcs.com](https://img.shields.io/website-up-down-green-red/http/monip.org.svg)](https://testnet.walletcs.com/)


**Table of contents**

[Features](https://github.com/walletcs/walletcs-app/blob/master/README.md#features)

[Components](https://github.com/walletcs/walletcs-app/blob/master/README.md#components)

[Hardware requirements](https://github.com/walletcs/walletcs-app/blob/master/README.md#offline-computer-hardware-requirements)

[Installation](https://github.com/walletcs/walletcs-app/blob/master/README.md#Installation)

[FAQ](https://github.com/walletcs/walletcs-app/blob/master/README.md#FAQ)

[Creating an account](https://github.com/walletcs/walletcs-app/blob/master/README.md#creating-an-account)

[Transferring coins or tokens and invoking smart contract methods](https://github.com/walletcs/walletcs-app/blob/master/README.md#transferring-coins-or-tokens-and-invoking-smart-contract-methods)

[Constructing a bitcoin transaction](https://github.com/walletcs/walletcs-app/blob/master/README.md#constructing-a-bitcoin-transaction)

[FAQ](https://github.com/walletcs/walletcs-app/blob/master/README.md#faq)

[Support](https://github.com/walletcs/walletcs-app/blob/master/README.md#getting-support)

[Enterprise features](https://github.com/walletcs/walletcs-app/blob/master/README.md#enterprise-features)


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

   **Important**: 
   - check the url and SSL certificate to make sure you are downloading from the right site.
   - verify GPG signature to ensure download integrity

2. Install application on the offline computer that will be used for offline operations
  
   **Important**: 
   Do not connect your offline computer to the internet as long as it is being used for signing offline transactions.

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
   For Coin Transfer: specify address and amount to transfer
   For Smart Contract Transaction: choose method to execute, specify parameters 

2. Download unsigned transaction to the flash drive. Let’s call it “Transactions” drive.

3. Insert “Transactions” flash drive with unsigned transaction  to the offline computer, where WalletCS Offline Application is installed.

4. Click “Sign transaction”. WalletCS Offline App will ask you to:
   - Insert your Private Key flash drive
   - Check transfer / method details and sign your transaction
   - Insert “Transactions” flash drive to save signed transaction.  

5. go back to [app.walletcs.com](https://app.walletcs.com), click “Broadcast Transaction” button and upload  signed transaction file from “Transactions” flash drive. Once you verify transaction details, click “Broadcast” to broadcast transactions.

## Constructing a bitcoin transaction
You have an option to create complex bitcoin transaction that contains multiple inputs and outputs.

Order of inputs is important. When constructing transaction, WalletCS iterates through "from" addresses to collect necessary amount. 
For example, let's consider following input:

From:

_3Er5EKhLNqaq1tKHH5g91tq6yC6PvDM8DE_

_3E6tXnuXnapWfJWspsitd2BFUC27Gswfxk_


To:

_3CiHdL6KmCpPBL93QJ6PcNovWpBnDVwaTH_ amount: 0.1 

_3DfTLsfGCnzejVc6iYbWjnYBXXbxyA33DL_ amount: 0.5

In the example above, to collect total of BTC 0.6 walletcs will first take all available funds from _3Er5EK..._, and the reminder from _3E6tX..._. If balances on both input adresses do not have at least BTC 0.6, transaction will not be generated.
if address _3Er5EK..._ contains more than BTC 0.6, nothing will be taken from the second address _3E6tX..._.


## Validating account and regenerating addresses
Click “Validate account” on WalletCS Offline Application and follow the instructions. You have an option to generate xPub.

## Backing up flash drive
Click “Backup Private Keys” on WalletCS Offline Application and follow the instructions.
We recommend keeping backup flash drive at a secure alternative physical location.

**Important**: 
- While it is technically possible to create a copy of the flash drive using online computer, we strongly recommend secure copy using WalletCS Offline Application to avoid online exposure of your private keys.
- Clearly mark private key drive so you don't use it accidentaly for any other purpose

## FAQ
**Why should I trust WalletCS**  
  You do not. We encourage you to examine source code and build from source or verify GPG signatures of binary files

**How WalletDS is different from hardware wallets**
   - With WalletCS you store only flash drive offline. There is no need to keep the device securely stored.
   - WalletCS supports smart contracts.
   - WalletCS is customizable.
**How do I check balance on my account**
  When you have created an account, WalletCS created a public address for you and stored on public address flash drive.
  Use it in public explorers, like [blockexplorer.com](https://blockexplorer.com/) for BTC or [etherscan.io](https://etherscan.io/) for    ETH to check your balance.

## Getting support
If you experience a problem, please create an issue [here](https://github.com/walletcs/walletcs-app/issues)

## Enterprise features
Wallet CS Enterprise Integration Suite is a product designed to integrate your enterprise with the blockchain.
- Mass address generation and management
- Secure Batch transaction operations, e.g. mass payments in cryptocurrency
- Multisignature operations for Bitcoin and Ethereum
- Transaction reporting and verification

We will be happy to assist you with customization and integration! Contact us at sales@exilion.com
