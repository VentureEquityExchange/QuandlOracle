import { quandlRequest } from '../util/quandlRequest';
import Pudding from 'ether-pudding';
import { unlockAccount } from '../util/ethereum';



export function getData(req, res) {
    let { databaseCode, datasetCode, date, dataLabel } = req.body;
    let { abi, binary } = QuandlOracle;
    let QO = Pudding.whisk(abi, binary, {gasLimit : 3141592});

    quandlRequest(databaseCode, datasetCode, date, dataLabel).then((value) => {

      return QuandlOracle.updateData(databaseCode, datasetCode, date, dataLabel, value);

    }).then((data) => {
      res.send(data);
    }).catch((error) => {
      console.log(error);
    });
}
