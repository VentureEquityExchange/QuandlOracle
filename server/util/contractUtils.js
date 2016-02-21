import Pudding from 'ether-pudding';
import PuddingGenerator from 'ether-pudding/generator';
import PuddingLoader from 'ether-pudding/loader';
import { unlockAccount, web3 } from './ethereum';
import solc from 'solc';
import Promise from 'bluebird';
import config from '../config';
const ContractFolder = config.ContractFolder;
const fs = Promise.promisifyAll(require('fs'));

export function LoadContracts(){
  return new Promise((resolve, reject) => {
    PuddingLoader.load(ContractFolder, Pudding, global, (error, names) => {
      if(error){reject(error)}
      resolve(names);
    });
  });
}

export function compile(contract){
    return new Promise((resolve, reject) => {
      fs.readFileAsync(ContractFolder+'/'+contract, 'utf8').then((source) => {
        let output = solc.compile(source, 1);
        resolve(output);
      }).catch((error) => {
        reject(error);
      });
    });
}

export function deploy(compiled){
  return new Promise((resolve, reject) => {

    web3.eth.getCoinbase((error, account) => {

      if(error){reject(error)}

      unlockAccount(account, config.EthPass).then((unlocked) => {
        let { QuandlOracle } = compiled.contracts;

        web3.eth.contract(JSON.parse(QuandlOracle.interface)).new({from: account, data: QuandlOracle.bytecode, gas : 3141592}, (error, deployed) => {
          if(error){reject(error)}
          if(!deployed.address){
            console.log(`Waiting for ${deployed.transactionHash} to be mined.`);
          } else {
            resolve(deployed);
          }
        });

      }).catch((error) => {
        reject(error);
      });
    });
  });
}

export function GenerateSolJS(contract){
  return new Promise((resolve, reject) => {
    PuddingGenerator.save(contract, ContractFolder);
    resolve(true);
  });
}


function DeployQuandlOracle(){
  let Contract = {};
  compile('QuandlOracle.sol').then((compiled) => {
    let { QuandlOracle } = compiled.contracts;

    Contract['QuandlOracle'] = {
      abi : JSON.parse(QuandlOracle.interface),
      binary : QuandlOracle.bytecode
    };

    return deploy(compiled);
  }).then((deployed) => {
    Contract['QuandlOracle'].address = deployed.address;

    return GenerateSolJS(Contract);
  }).then((bool) => {
    console.log(bool);

  }).catch((error) => {
    console.log(error);
  });
}

// DeployQuandlOracle();

LoadContracts().then((contracts) => {
  console.log(contracts);
  console.log(QuandlOracle);
}).catch((error) => {
  console.log(error);
});
