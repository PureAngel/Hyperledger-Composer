# Hyperledger-Composer

## 配置环境要求

1. Ubuntu下配置环境要求
* 操作系统：Ubuntu Linux 14.04 / 16.04 LTS (both 64-bit)
* Docker：Version 17.03及以上
* Docker-Compose: Version 1.8及以上
* Node：8.9及以上（Version 9不支持）
* npm：v5.x
* git：2.9及以上
* Python：2.7.x

环境安装注意事项
* 用普通用户登录和安装环境，不要用root用户登录配置
* 下载安装环境时使用curl并使用sudo命令解压

2. MacOS下配置环境要求
* 操作系统：MacOS X Version 10.12.6
* 安装Node Version Manager(nvm)，管理Node.js版本
* 安装Xcode

## Composer环境安装

1. 安装CLI
* CLI
``` bash
npm install -g composer-cli
```
* 在你的机器上运行REST服务器来将你的网络作为REST API的工具
``` bash
npm install -g composer-rest-server
```
* 生成应用资产的工具
``` bash
npm install -g generator-hyperledger-composer
```
* 生成应用的工具
``` bash
npm install -g yo
```

2. 安装Playground
Playground是一个浏览器app，提供一个可以浏览和展示Hyperledger Composer网络的UI。

``` bash
npm install -g composer-playground
```

## 开启Hyperledger Fabric

进入fabric-dev-servers文件夹，开启Hyperledger Fabric并生成PeerAdmin card
``` bash
cd ~/fabric-dev-servers
./startFabric.sh
./createPeerAdminCard.sh
```
若要停止Hyperledger Fabric, 运行stopFabric.sh
``` bash
cd ~/fabric-dev-servers
./stopFabric.sh
```
当下次开启Hyperledger Fabric时，重新运行startFabric.sh。

当结束Hyperledger Fabric开发后，运行stopFabric.sh和teardownFabric.sh
``` bash
cd ~/fabric-dev-servers
./stopFabric.sh
./teardownFabric.sh
```
运行了teardownFabric.sh，当下次开启Hyperledger Fabric时，需要重新生成PeerAdmin card。

## 部署business network

1、进入tutorial-network目录下，运行以下命令安装business network
``` bash
cd ~/tutorial-network
composer network install --card PeerAdmin@hlfv1 --archiveFile tutorial-network@0.0.1.bna
```
2、启动business network
``` bash
composer network start --networkName tutorial-network --networkVersion 0.0.1 --networkAdmin admin --networkAdminEnrollSecret adminpw --card PeerAdmin@hlfv1 --file networkadmin.card
```
3、将网络管理员身份导入business network card
``` bash
composer card import --file networkadmin.card
```
4、查看business network是否部署成功
``` bash
composer network ping --card admin@tutorial-network
```

## 生成REST服务器
1、进入tutorial-network目录下，输入以下命令行：
``` bash
composer-rest-server
```
2、输入admin@tutorial-network作为card的名字

3、当被问到是否在生成的API中使用namespace时，选择never use namespaces

4、当被问到是否保护生成的API时，选择No

5、当被问到是否授权event publication时，选择Yes

5、当被问到是否授权TLS security时，选择No

以上生成的API将关联到部署的区块链和business网络。

当出现以下结果时，说明部署成功：
<img src="http://paprym8rl.bkt.clouddn.com/tutorial-network-setup.png">

登录浏览器查看API：
<img src="http://paprym8rl.bkt.clouddn.com/apiImage.png">

可以看到我们定义的Person、Commodity类型，以及三种交易(transaction)：Trade、TradeCommodity、GetIncome。
其中，Person和Commodity类型的对象都可以进行增删改查操作，如下图所示：

Person:
<img src="http://paprym8rl.bkt.clouddn.com/Person.png">
Commodity:
<img src="http://paprym8rl.bkt.clouddn.com/Commodity.png">

其中，POST是创建对象操作，GET是查找操作，PUT是更改操作，DELETE是删除操作。id为唯一标识对象的参数(例如personId, commodityId)。

下面我们使用POST创建3个Person对象：
<img src="http://paprym8rl.bkt.clouddn.com/PersonPost1.png">
<img src="http://paprym8rl.bkt.clouddn.com/PersonPost2.png">
<img src="http://paprym8rl.bkt.clouddn.com/PersonPost3.png">
其运行结果如下：
<img src="http://paprym8rl.bkt.clouddn.com/PersonPost1Response.png">
<img src="http://paprym8rl.bkt.clouddn.com/PersonPost2Response.png">
<img src="http://paprym8rl.bkt.clouddn.com/PersonPost3Response.png">
可见，3个Person对象已经成功创建，其personId分别为1、2、3。三个对象初始所有金额balance均被赋予100。
使用GET查看personId为1的对象：
<img src="http://paprym8rl.bkt.clouddn.com/PersonGet1.png">
其运行结果如下：
<img src="http://paprym8rl.bkt.clouddn.com/PersonGet1Response.png">
可见，personId为1的对象已经成功创建。同理可自行查看其它对象。

接下来我们使用POST创建1个Commodity对象：
<img src="http://paprym8rl.bkt.clouddn.com/CommodityPost1.png">
其运行结果如下：
<img src="http://paprym8rl.bkt.clouddn.com/CommodityPost1Response.png">
以上，我们创建了一个commodityId为1的商品，其所有者是personId为1的Person对象。

接下来创建一个工资收入GetIncome交易：
<img src="http://paprym8rl.bkt.clouddn.com/GetIncomePost.png">
这里我们定义personId为2的人得到收入income100。运行结果如下：
<img src="http://paprym8rl.bkt.clouddn.com/GetIncomeResponse.png">

使用GET查询personId为2的对象的信息：
<img src="http://paprym8rl.bkt.clouddn.com/PersonGet2.png">
运行结果如下：
<img src="http://paprym8rl.bkt.clouddn.com/PersonGet2Response.png">
由此可见，该对象之前的所有金额balance为100，现在所有金额balance变更为200。

接下来创建一个购买商品交易TradeCommodity：
<img src="http://paprym8rl.bkt.clouddn.com/TradeCommodityPost.png">
其运行结果如下：
<img src="http://paprym8rl.bkt.clouddn.com/TradeCommodityResponse.png">

为了验证购买商品交易结果，我们分别查看该商品对象的所有者信息以及之前所有者对象和交易后所有者对象的所有金额balance信息：

首先使用GET查看商品对象信息：
<img src="http://paprym8rl.bkt.clouddn.com/Commodity_checkOwner.png">
可见，其所有者已从交易之前personId为1的对象变更为personId为2的购买者对象。

接着分别查看商品对象交易前后所有者信息：

交易前所有者(personId为1)：
<img src="http://paprym8rl.bkt.clouddn.com/PersonId1_checkBalance.png">
交易后所有者(personId为2)：
<img src="http://paprym8rl.bkt.clouddn.com/PersonId2_checkBalance.png">
可见，交易前所有者的所有金额经过此次交易，增加了10，即交易商品的价格price；而交易后所有者(购买者)的所有金额经过此次交易，减少了10，即交易商品的价格price。交易成功。

接下来创建一个转账交易Trade：
<img src="http://paprym8rl.bkt.clouddn.com/TradePost.png">
其运行结果如下：
<img src="http://paprym8rl.bkt.clouddn.com/TradePostResponse.png">

为了验证转账交易结果，我们查看转账双方以及中间人的所有金额信息：

转出者信息(personId为2)：
<img src="http://paprym8rl.bkt.clouddn.com/PersonId2_checkTrade.png">
转入者信息(personId为3)：
<img src="http://paprym8rl.bkt.clouddn.com/PersonId3_checkTrade.png">
中间人信息(personId为1)：
<img src="http://paprym8rl.bkt.clouddn.com/PersonId1_checkTrade.png">
可见，转出者(personId为2)在转账交易前所有金额为190，经过转账交易转出100，交易后所有金额变更为90；中间人(personId为1)在转账交易前所有金额为110，经过转账交易，获得转账金额
（100）比例0.2的金额数目，交易后所有金额变更为130；转入者(personId为3)在转账交易前所有金额为100，经过转账交易，收入转账金额(100)除去给予中间人的部分所剩余的数目，交易后所有金额 变更为180。交易成功。
