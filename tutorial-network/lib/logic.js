/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use strict';
/**
 * Write your transction processor functions here
 */

/**
 * Track the transfer from one person to another
 * @param {org.example.transferring.Trade} trade - the trade to be processed
 * @transaction
 */
async function transfer(trade) {
  trade.previousOwner.balance-=trade.amount;
  trade.newOwner.balance+=trade.amount*(1-trade.fee);
  trade.mediary.balance+=trade.amount*trade.fee;
  let participantRegistry = await getParticipantRegistry('org.example.transferring.Person');
  await participantRegistry.update(trade.previousOwner);
  await participantRegistry.update(trade.newOwner);
  await participantRegistry.update(trade.mediary);
}

/**
 * Trade the commodity from one person to another
 * @param {org.example.transferring.TradeCommodity} tradeCommodity - the trade to be processed
 * @transaction
 */
async function tradeCommodity(tradeCommodity) {
  let previousOwner = tradeCommodity.commodity.owner;
  previousOwner.balance += tradeCommodity.commodity.price;
  tradeCommodity.newOwner.balance -= tradeCommodity.commodity.price;
  tradeCommodity.commodity.owner = tradeCommodity.newOwner;
  let assetRegistry = await getAssetRegistry('org.example.transferring.Commodity');
  await assetRegistry.update(tradeCommodity.commodity);
  let participantRegistry = await getParticipantRegistry('org.example.transferring.Person');
  await participantRegistry.update(tradeCommodity.newOwner);
  await participantRegistry.update(previousOwner);
}

/**
 * Get income
 * @param {org.example.transferring.GetIncome} income - the income to be processed
 * @transaction
 */
async function getIncome(income) {
  income.person.balance += income.income;
  let participantRegistry = await getParticipantRegistry('org.example.transferring.Person');
  await participantRegistry.update(income.person);
}

