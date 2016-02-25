// Factory "morphs" into a Pudding class.
// The reasoning is that calling load in each context
// is cumbersome.

var contract_data = {
  abi: [{"constant":false,"inputs":[{"name":"databaseCode","type":"string"},{"name":"datasetCode","type":"string"},{"name":"date","type":"string"},{"name":"dataLabel","type":"string"},{"name":"value","type":"uint256"}],"name":"updateData","outputs":[{"name":"","type":"bool"}],"type":"function"},{"constant":false,"inputs":[{"name":"databaseCode","type":"string"},{"name":"datasetCode","type":"string"},{"name":"date","type":"string"},{"name":"dataLabel","type":"string"}],"name":"getData","outputs":[{"name":"","type":"uint256"}],"type":"function"},{"inputs":[],"type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"name":"database","type":"string"},{"indexed":false,"name":"dataset","type":"string"},{"indexed":false,"name":"date","type":"string"},{"indexed":false,"name":"dataLabel","type":"string"}],"name":"Request","type":"event"}],
  binary: "606060405260008054600160a060020a0319163317905561061c806100246000396000f3606060405260e060020a60003504638a21e3378114610026578063e09dbd6c1461014f575b005b60206004803580820135601f8101849004909302608090810160405260608481526104ff94602493919291840191819083828082843750506040805160208835808b0135601f8101839004830284018301909452838352979998604498929750919091019450909250829150840183828082843750506040805160209735808a0135601f81018a90048a0283018a019093528282529698976064979196506024919091019450909250829150840183828082843750506040805160209735808a0135601f81018a90048a0283018a0190935282825296989760849791965060249190910194509092508291508401838280828437509496505093359350505050600080543373ffffffffffffffffffffffffffffffffffffffff90811691161461051e57610002565b60206004803580820135601f8101849004909302608090810160405260608481526104ff94602493919291840191819083828082843750506040805160208835808b0135601f8101839004830284018301909452838352979998604498929750919091019450909250829150840183828082843750506040805160209735808a0135601f81018a90048a0283018a019093528282529698976064979196506024919091019450909250829150840183828082843750506040805160209735808a0135601f81018a90048a0283018a01909352828252969897608497919650602491909101945090925082915084018382808284375094965050505050505060006000600160005060008787604051808380519060200190808383829060006004602084601f0104600f02600301f1509050018280519060200190808383829060006004602084601f0104600f02600301f150905001925050506040518091039020815260200190815260200160002060005084604051808280519060200190808383829060006004602084601f0104600f02600301f150905001915050908152602001604051809103902060005060000160005083604051808280519060200190808383829060006004602084601f0104600f02600301f15090500191505090815260200160405180910390206000505490508060001415610511577f4971dcf6af0ef796a6a847fa3b2a9a11e794a4eeabb4d841b37ebaadc9f085378686868660405180806020018060200180602001806020018581038552898181518152602001915080519060200190808383829060006004602084601f0104600f02600301f150905090810190601f1680156103dc5780820380516001836020036101000a031916815260200191505b508581038452888181518152602001915080519060200190808383829060006004602084601f0104600f02600301f150905090810190601f1680156104355780820380516001836020036101000a031916815260200191505b508581038352878181518152602001915080519060200190808383829060006004602084601f0104600f02600301f150905090810190601f16801561048e5780820380516001836020036101000a031916815260200191505b508581038252868181518152602001915080519060200190808383829060006004602084601f0104600f02600301f150905090810190601f1680156104e75780820380516001836020036101000a031916815260200191505b509850505050505050505060405180910390a1610515565b60408051918252519081900360200190f35b8091505b50949350505050565b81600160005060008888604051808380519060200190808383829060006004602084601f0104600f02600301f1509050018280519060200190808383829060006004602084601f0104600f02600301f150905001925050506040518091039020815260200190815260200160002060005085604051808280519060200190808383829060006004602084601f0104600f02600301f150905001915050908152602001604051809103902060005060000160005084604051808280519060200190808383829060006004602084601f0104600f02600301f15090910193845250506040519182900360200190912091909155506001969550505050505056",
  unlinked_binary: "606060405260008054600160a060020a0319163317905561061c806100246000396000f3606060405260e060020a60003504638a21e3378114610026578063e09dbd6c1461014f575b005b60206004803580820135601f8101849004909302608090810160405260608481526104ff94602493919291840191819083828082843750506040805160208835808b0135601f8101839004830284018301909452838352979998604498929750919091019450909250829150840183828082843750506040805160209735808a0135601f81018a90048a0283018a019093528282529698976064979196506024919091019450909250829150840183828082843750506040805160209735808a0135601f81018a90048a0283018a0190935282825296989760849791965060249190910194509092508291508401838280828437509496505093359350505050600080543373ffffffffffffffffffffffffffffffffffffffff90811691161461051e57610002565b60206004803580820135601f8101849004909302608090810160405260608481526104ff94602493919291840191819083828082843750506040805160208835808b0135601f8101839004830284018301909452838352979998604498929750919091019450909250829150840183828082843750506040805160209735808a0135601f81018a90048a0283018a019093528282529698976064979196506024919091019450909250829150840183828082843750506040805160209735808a0135601f81018a90048a0283018a01909352828252969897608497919650602491909101945090925082915084018382808284375094965050505050505060006000600160005060008787604051808380519060200190808383829060006004602084601f0104600f02600301f1509050018280519060200190808383829060006004602084601f0104600f02600301f150905001925050506040518091039020815260200190815260200160002060005084604051808280519060200190808383829060006004602084601f0104600f02600301f150905001915050908152602001604051809103902060005060000160005083604051808280519060200190808383829060006004602084601f0104600f02600301f15090500191505090815260200160405180910390206000505490508060001415610511577f4971dcf6af0ef796a6a847fa3b2a9a11e794a4eeabb4d841b37ebaadc9f085378686868660405180806020018060200180602001806020018581038552898181518152602001915080519060200190808383829060006004602084601f0104600f02600301f150905090810190601f1680156103dc5780820380516001836020036101000a031916815260200191505b508581038452888181518152602001915080519060200190808383829060006004602084601f0104600f02600301f150905090810190601f1680156104355780820380516001836020036101000a031916815260200191505b508581038352878181518152602001915080519060200190808383829060006004602084601f0104600f02600301f150905090810190601f16801561048e5780820380516001836020036101000a031916815260200191505b508581038252868181518152602001915080519060200190808383829060006004602084601f0104600f02600301f150905090810190601f1680156104e75780820380516001836020036101000a031916815260200191505b509850505050505050505060405180910390a1610515565b60408051918252519081900360200190f35b8091505b50949350505050565b81600160005060008888604051808380519060200190808383829060006004602084601f0104600f02600301f1509050018280519060200190808383829060006004602084601f0104600f02600301f150905001925050506040518091039020815260200190815260200160002060005085604051808280519060200190808383829060006004602084601f0104600f02600301f150905001915050908152602001604051809103902060005060000160005084604051808280519060200190808383829060006004602084601f0104600f02600301f15090910193845250506040519182900360200190912091909155506001969550505050505056",
  address: "0xe102f059041e92a4630341f338957aefcf809fd6",
  generated_with: "2.0.4",
  contract_name: "QuandlOracle"
};

function Contract() {
  if (Contract.Pudding == null) {
    throw new Error("QuandlOracle error: Please call load() first before creating new instance of this contract.");
  }

  Contract.Pudding.apply(this, arguments);
};

Contract.load = function(Pudding) {
  Contract.Pudding = Pudding;

  Pudding.whisk(contract_data, Contract);

  // Return itself for backwards compatibility.
  return Contract;
}

Contract.new = function() {
  if (Contract.Pudding == null) {
    throw new Error("QuandlOracle error: Please call load() first before calling new().");
  }

  return Contract.Pudding.new.apply(Contract, arguments);
};

Contract.at = function() {
  if (Contract.Pudding == null) {
    throw new Error("QuandlOracle error: lease call load() first before calling at().");
  }

  return Contract.Pudding.at.apply(Contract, arguments);
};

Contract.deployed = function() {
  if (Contract.Pudding == null) {
    throw new Error("QuandlOracle error: Please call load() first before calling deployed().");
  }

  return Contract.Pudding.deployed.apply(Contract, arguments);
};

if (typeof module != "undefined" && typeof module.exports != "undefined") {
  module.exports = Contract;
} else {
  // There will only be one version of Pudding in the browser,
  // and we can use that.
  window.QuandlOracle = Contract;
}