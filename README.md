# Hyperledger-Composer

## Configuration Environment Requirments

1. Ubuntu
* Operating System：Ubuntu Linux 14.04 / 16.04 LTS (both 64-bit)
* Docker：Version 17.03+
* Docker-Compose: Version 1.8+
* Node：8.9及以上（Version 9 not supporting）
* npm：v5.x
* git：2.9+
* Python：2.7.x

Precautions for installation
* Log in and install the environment as a general user instead of root user
* Use curl to download and use sudo command to unzip

2. MacOS
* Operation System: MacOS X Version 10.12.6
* Install Node Version Manager(nvm, manage the version of Node.js
* Install Xcode

## Installation of Composer

1. Install CLI
* CLI
``` bash
npm install -g composer-cli
```
* Run REST server to make your network as the tool of REST API
``` bash
npm install -g composer-rest-server
```
* 
generate tools of application assets
``` bash
npm install -g generator-hyperledger-composer
```
* generate tools of application
``` bash
npm install -g yo
```

2. Install Playground
Playground is a browser ap, providing a UI for showing Hyperledger Composer network.

``` bash
npm install -g composer-playground
```

## Set up Hyperledger Fabric

Enter fabric-dev-servers folde, set up Hyperledger Fabric and generate PeerAdmin card
``` bash
cd ~/fabric-dev-servers
./startFabric.sh
./createPeerAdminCard.sh
```
To shut down Hyperledger Fabric, run stopFabric.sh
``` bash
cd ~/fabric-dev-servers
./stopFabric.sh
```
To restart Hyperledger Fabri, run startFabric.sh again。

To stop Hyperledger Fabric, run stopFabric.sh and teardownFabric.sh
``` bash
cd ~/fabric-dev-servers
./stopFabric.sh
./teardownFabric.sh
```
After running teardownFabric.sh, to set up hyperledger Fabric another time，you need to generate PeerAdmin card once again.

## Deploy business network

1、Enter tutorial-network folder, install business network with the following commands
``` bash
cd ~/tutorial-network
composer network install --card PeerAdmin@hlfv1 --archiveFile tutorial-network@0.0.1.bna
```
2、Set up business network
``` bash
composer network start --networkName tutorial-network --networkVersion 0.0.1 --networkAdmin admin --networkAdminEnrollSecret adminpw --card PeerAdmin@hlfv1 --file networkadmin.card
```
3、Import the identity of network administrator into business network card
``` bash
composer card import --file networkadmin.card
```
4、Check whether business network is successfully deployed
``` bash
composer network ping --card admin@tutorial-network
```

## Generate REST server
1、Enter tutorial-network folder and enter the following commands:
``` bash
composer-rest-server
```
2、Input admin@tutorial-network as the name of the card

3、When being asked whether using namespace in the generated API, select never use namespaces

4、When being asked whether protect generated API, select No

5、When being asked whether authorize event publication, select Yes

5、When being asked whther authorize TLS security, select No

The generated API would be associated to the deployed blockchain and business network.

The following output indicates deployment succeed:
<img src="http://paprym8rl.bkt.clouddn.com/tutorial-network-setup.png">

Check API via browser:
<img src="http://paprym8rl.bkt.clouddn.com/apiImage.png">

We have defined two types of data models-Person and Commodity, and three kinds of transactions: Trade、TradeCommodity、GetIncome.
The objects of Person and Commodity support create, delete, edit and view operations:

Person:
<img src="http://paprym8rl.bkt.clouddn.com/Person.png">
Commodity:
<img src="http://paprym8rl.bkt.clouddn.com/Commodity.png">

POST is for creating objects, GET is for viewing, PUT is for editing, and DELETE is for deleting. Id is the only parameter to identify the object.

Using POST to create 3 Person objects:
<img src="http://paprym8rl.bkt.clouddn.com/PersonPost1.png">
<img src="http://paprym8rl.bkt.clouddn.com/PersonPost2.png">
<img src="http://paprym8rl.bkt.clouddn.com/PersonPost3.png">
The outputs are as followings:
<img src="http://paprym8rl.bkt.clouddn.com/PersonPost1Response.png">
<img src="http://paprym8rl.bkt.clouddn.com/PersonPost2Response.png">
<img src="http://paprym8rl.bkt.clouddn.com/PersonPost3Response.png">
Thus, the 3 Person objects have been created successfully, and the personIds are 1, 2 adn 3 respectively. The initial balances of the three objects are all 100.

Using GET to view the object whose personId is 1:
<img src="http://paprym8rl.bkt.clouddn.com/PersonGet1.png">
The outputs are as followings:
<img src="http://paprym8rl.bkt.clouddn.com/PersonGet1Response.png">
Thus, the object whose personId is 1 has been created successfully. 

Next we use POST to create one Commodity object:
<img src="http://paprym8rl.bkt.clouddn.com/CommodityPost1.png">
The outputs are as followings:
<img src="http://paprym8rl.bkt.clouddn.com/CommodityPost1Response.png">
Thus, we created a commodity whose commodityId is 1, and its owner is the Person object whose personId is 1.

Next we create a GetIncome transaction:
<img src="http://paprym8rl.bkt.clouddn.com/GetIncomePost.png">
We define that the person whose personId is 2 getting income 100。The ouputs are as followings:
<img src="http://paprym8rl.bkt.clouddn.com/GetIncomeResponse.png">

Use GET to view the information of the object whose personId is 2:
<img src="http://paprym8rl.bkt.clouddn.com/PersonGet2.png">
The ouputs are as followings:
<img src="http://paprym8rl.bkt.clouddn.com/PersonGet2Response.png">
It shows that, the previous balance of the object is 100, and the current balance becomes 200.

TThen we create a TradeCommodity transaction:
<img src="http://paprym8rl.bkt.clouddn.com/TradeCommodityPost.png">
The ouputs are as followings:
<img src="http://paprym8rl.bkt.clouddn.com/TradeCommodityResponse.png">

In order to verify the transaction results, we check the information off the commodity's owner and the previous owner and the blances of the two:

First, use GET to view the commodity's information:
<img src="http://paprym8rl.bkt.clouddn.com/Commodity_checkOwner.png">
This shows that, the owner of the commodity changes from the person whose personId is 1 to the person whose personId is 2.

Next check the information of the current owner and the previous owner:

Previous owner(personId being 1)：
<img src="http://paprym8rl.bkt.clouddn.com/PersonId1_checkBalance.png">
Current owner(personId being 2)：
<img src="http://paprym8rl.bkt.clouddn.com/PersonId2_checkBalance.png">
This shows that, from the above transaction, the balance of the previoius owner increases by 10, which is the price of the commodity, while the balance of the current owner decreased by 10. Thus, the transaction succeeded.

Then create a Trade transaction：
<img src="http://paprym8rl.bkt.clouddn.com/TradePost.png">
The ouputs are as followings:
<img src="http://paprym8rl.bkt.clouddn.com/TradePostResponse.png">

In order to verify the results of the Trade transaction, check the balances of transferr, transferee and intermediary:

Transferr(personId being 2)：
<img src="http://paprym8rl.bkt.clouddn.com/PersonId2_checkTrade.png">
Transferee(personId being 3)：
<img src="http://paprym8rl.bkt.clouddn.com/PersonId3_checkTrade.png">
Intermediary(personId being 1)：
<img src="http://paprym8rl.bkt.clouddn.com/PersonId1_checkTrade.png">
It shows that, before the transaction, the balance of the transferr(personId being 2) was 190, the balance of the intermediary(personId being 1) was 110, the balance of the transferee was 100, and after transferring 100 to the transferee during the transaction, the balance of the transferr became 90, the balance of the intermediary became 130(110+0.2*100), and the balance of the transferee became 180(100+0.8*100). Thus, the transaction succeeded.
