import Promise from 'bluebird';
import Quandl from 'quandl';
import Pudding from 'ether-pudding';
import PuddingLoader from 'ether-pudding/loader';
import config from '../config';
const ContractFolder = config.ContractFolder;
import { web3 } from './ethereum';

Pudding.setWeb3(web3);

let quandl = new Quandl({
  auth_token: config.quandlToken,
   api_version: 3,
});

export function quandlRequest(databaseCode, datasetCode, date, dataLabel) {
  return new Promise((resolve, reject) => {
    quandl.dataset({
      source : databaseCode,
      table : datasetCode
    }, {
      order : "asc",
      start_date : date
    }, (error, response) => {
      if(error){reject(error)}
      let { column_names, data } = JSON.parse(response).dataset;

      let value = data[0][column_names.indexOf(dataLabel)];

      resolve(value);
    });
  });
}
