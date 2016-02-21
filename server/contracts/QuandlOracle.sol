contract QuandlOracle {

  struct Data {
    mapping(string => uint) value;
  }

  address maintainedBy;

  mapping(bytes32 => mapping(string => Data)) quandl;

  event Request(string database, string dataset, string date, string dataLabel);

  function QuandlOracle(){
      maintainedBy = msg.sender;
  }

  function getData(string databaseCode, string datasetCode, string date, string dataLabel) public returns (uint){
      uint n = quandl[sha3(databaseCode, datasetCode)][date].value[dataLabel];
      if( n == 0){
        // make request for data if not available, return 0 to let the user know
        // the data is not available;
        Request(databaseCode, datasetCode, date, dataLabel);

        return 0;
      } else {
        return n;
      }
  }

  function updateData(string databaseCode, string datasetCode, string date, string dataLabel, uint value) public returns (bool){
      if(msg.sender != maintainedBy){
        throw;
      } else {
        quandl[sha3(databaseCode, datasetCode)][date].value[dataLabel] = value;
        return true;
      }
  }
}
