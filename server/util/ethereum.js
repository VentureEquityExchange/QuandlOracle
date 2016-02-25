const Promise = require('bluebird');
const net = require('net');
const path = require('path');
const fs = require('fs');
const Web3 = require('web3');

export let web3 = Promise.promisifyAll(new Web3());
export let gethSocket = '/root/.ethereum/geth.ipc';

setTimeout(() => {
    web3.setProvider(new web3.providers.IpcProvider(gethSocket, net));
}, 2000)
// Geth Socket Connection

function gethIPC(payload, next){
	if(payload == null){
		console.log('no payload');
		next('no payload', null);
	};

	var client = net.connect({path: gethSocket}, () => {
		client.end(JSON.stringify(payload));
	})


	client.on('connection', (d) => {
		console.log(d)
	});

	client.on('data', (data) => {
		var response = "";
		response += data.toString();
		var res = JSON.parse(response);
		next(null, res)
	});

	client.on('end', () => {
      // console.log('Socket Received payload');
  });

	client.on('error', (data) => {
		next(data, null);
	});

	process.setMaxListeners(Infinity);

	process.on('SIGINT', () => {
		console.log("Caught interrupt signal");

		client.end();
		process.exit();
	});
};



export function listAccounts() {
	return new Promise((resolve, reject) => {
		let payload = {jsonrpc: '2.0',method: 'personal_listAccounts',params: [],id: 1};
		gethIPC(payload, (error, data) => {
			if(error){reject(error);}
			resolve(data.result);
		});
	})
}

export function newAccount(password) {
	return new Promise((resolve, reject) => {
		let payload = {jsonrpc: '2.0',method: 'personal_newAccount',params: [password],id: 1};
		gethIPC(payload, (error, data) => {
			if(error){reject(error);}
			if(data.error){reject(data.error);}
			resolve(data.result);
		});
	})
}

export function deleteAccount(address, password) {
	return new Promise((resolve, reject) => {
		let payload = {jsonrpc: '2.0',method: 'personal_deleteAccount',params: [address, password],id: 1};
		gethIPC(payload, (error, data) => {
			if(error){reject(error);}
			if(data.error){reject(data.error);}
			resolve(data.result);
		});
	})
}

export function unlockAccount(address, password) {
	return new Promise((resolve, reject) => {
		let duration = 360;
    let payload = {jsonrpc: '2.0',method: 'personal_unlockAccount',params: [address, password, duration],id: 1};
		gethIPC(payload, (error, data) => {
			if(error){reject(error);}
			if(data.error){reject(data.error);}
			resolve(data.result);
		});
	})
}

export function txPoolStatus() {
	return new Promise((resolve, reject) => {
		let duration = 120;
        let payload = {jsonrpc: '2.0',method: 'personal_unlockAccount',params: [address, password, duration],id: 1};
				gethIPC(payload, (error, data) => {
					if(error){reject(error);}
					if(data.error){reject(data.error);}
					resolve(data.result);
				});
	})
}

export function datadir() {
	return new Promise((resolve, reject) => {
		let payload = {jsonrpc: '2.0',method: 'admin_datadir',params: [],id: 1};
		gethIPC(payload, (error, data) => {
			if(error){reject(error);}
			if(data.error){reject(data.error);}
			resolve(data.result);
		});
	})
}

export function syncing() {
	return new Promise((resolve, reject) => {
		let payload = {jsonrpc: '2.0',method: 'eth_syncing',params: [],id: 1};
		gethIPC(payload, (error, data) => {
			if(error){reject(error);}
			// if(data.error){reject(data.error);}
			resolve(data);
		});
	})
}

export function verbosity(level) {
	return new Promise((resolve, reject) => {
		let payload = {jsonrpc: '2.0',method: 'admin_verbosity',params: [level],id: 1};
		gethIPC(payload, (error, data) => {
			if(error){reject(error);}
			if(data.error){reject(data.error);}
			resolve(data.result);
		});
	})
}

export function nodeInfo() {
	return new Promise((resolve, reject) => {
		let payload = {jsonrpc: '2.0',method: 'admin_nodeInfo',params: [],id: 1};
		gethIPC(payload, (error, data) => {
			if(error){reject(error);}
			if(data.error){reject(data.error);}
			resolve(data.result);
		});
	})
}

export function addPeer(nodeUrl) {
	return new Promise((resolve, reject) => {
		let payload = {jsonrpc: '2.0',method: 'admin_addPeer',params: [nodeUrl],id: 1};
		gethIPC(payload, (error, data) => {
			if(error){reject(error);}
			if(data.error){reject(data.error);}
			resolve(data.result);
		});
	})
}

export function peers() {
	return new Promise((resolve, reject) => {
		let payload = {jsonrpc: '2.0',method: 'admin_peers',params: [],id: 1};
		gethIPC(payload, (error, data) => {
			if(error){reject(error);}
			if(data.error){reject(data.error);}
			resolve(data.result);
		});
	})
}

export function startNatSpec() {
	return new Promise((resolve, reject) => {
		let payload = {jsonrpc: '2.0',method: 'admin_startNatSpec',params: [],id: 1};
		gethIPC(payload, (error, data) => {
			if(error){reject(error);}
			if(data.error){reject(data.error);}
			resolve(data.result);
		});
	})
}

export function getContractInfo(address) {
	return new Promise((resolve, reject) => {
		let payload = {jsonrpc: '2.0',method: 'admin_getContractInfo',params: [address],id: 1};
		gethIPC(payload, (error, data) => {
			if(error){reject(error);}
			if(data.error){reject(data.error);}
			resolve(data.result);
		});
	})
}

export function saveInfo(contractInfo, filename) {
	return new Promise((resolve, reject) => {
		let payload = {jsonrpc: '2.0',method: 'admin_saveInfo',params: [contractInfo, filename],id: 1};
		gethIPC(payload, (error, data) => {
			if(error){reject(error);}
			if(data.error){reject(data.error);}
			resolve(data.result);
		});
	})
}

export function register(address, contractaddress, contenthash) {
	return new Promise((resolve, reject) => {
		let payload = {jsonrpc: '2.0',method: 'admin_register',params: [address, contractaddress, contenthash],id: 1};
		gethIPC(payload, (error, data) => {
			if(error){reject(error);}
			if(data.error){reject(data.error);}
			resolve(data.result);
		});
	})
}

export function registerUrl(address, codehash, contenthash) {
	return new Promise((resolve, reject) => {
		let payload = {jsonrpc: '2.0',method: 'admin_registerUrl',params: [address, codehash, contenthash],id: 1};
		gethIPC(payload, (error, data) => {
			if(error){reject(error);}
			if(data.error){reject(data.error);}
			resolve(data.result);
		});
	})
}

export function minerStart(threadCount) {
	return new Promise((resolve, reject) => {
		let payload = {jsonrpc: '2.0',method: 'miner_start',params: [threadCount],id: 1};
		gethIPC(payload, (error, data) => {
			if(error){reject(error);}
			if(data.error){reject(data.error);}
			resolve(data.result);
		});
	})
}

export function minerStop(threadCount) {
	return new Promise((resolve, reject) => {
		let payload = {jsonrpc: '2.0',method: 'miner_stop',params: [threadCount],id: 1};
		gethIPC(payload, (error, data) => {
			if(error){reject(error);}
			if(data.error){reject(data.error);}
			resolve(data.result);
		});
	})
}

export function startAutoDag() {
	return new Promise((resolve, reject) => {
		let payload = {jsonrpc: '2.0',method: 'miner_startAutoDAG',params: [],id: 1};
		gethIPC(payload, (error, data) => {
			if(error){reject(error);}
			if(data.error){reject(data.error);}
			resolve(data.result);
		});
	})
}

export function stopAutoDAG() {
	return new Promise((resolve, reject) => {
		let payload = {jsonrpc: '2.0',method: 'miner_stopAutoDAG',params: [],id: 1};
		gethIPC(payload, (error, data) => {
			if(error){reject(error);}
			if(data.error){reject(data.error);}
			resolve(data.result);
		});
	})
}

export function makeDAG(blockNumber, dir) {
	return new Promise((resolve, reject) => {
		let payload = {jsonrpc: '2.0',method: 'miner_makeDAG',params: [blockNumber, dir],id: 1};
		gethIPC(payload, (error, data) => {
			if(error){reject(error);}
			if(data.error){reject(data.error);}
			resolve(data.result);
		});
	})
}

export function hashrate() {
	return new Promise((resolve, reject) => {
		let payload = {jsonrpc: '2.0',method: 'miner_hashrate',params: [],id: 1};
		gethIPC(payload, (error, data) => {
			if(error){reject(error);}
			if(data.error){reject(data.error);}
			resolve(data.result);
		});
	})
}

export function setExtra() {
	return new Promise((resolve, reject) => {
		let payload = {jsonrpc: '2.0',method: 'miner_setExtra',params: ["VΞNTURΞ ΞQUITY ΞXCHANGΞ"],id: 1};
		gethIPC(payload, (error, data) => {
			if(error){reject(error);}
			if(data.error){reject(data.error);}
			resolve(data.result);
		});
	})
}

export function setGasPrice(gasPrice) {
	return new Promise((resolve, reject) => {
		let payload = {jsonrpc: '2.0',method: 'miner_setGasPrice',params: [gasPrice],id: 1};
		gethIPC(payload, (error, data) => {
			if(error){reject(error);}
			if(data.error){reject(data.error);}
			resolve(data.result);
		});
	})
}

export function setEtherbase(account) {
	return new Promise((resolve, reject) => {
		let payload = {jsonrpc: '2.0',method: 'miner_setEtherbase',params: [account],id: 1};
		gethIPC(payload, (error, data) => {
			if(error){reject(error);}
			if(data.error){reject(data.error);}
			resolve(data.result);
		});
	})
}

export function setHead(blockNumber) {
	return new Promise((resolve, reject) => {
		let payload = {jsonrpc: '2.0',method: 'debug_setHead',params: [blockNumber],id: 1};
		gethIPC(payload, (error, data) => {
			if(error){reject(error);}
			if(data.error){reject(data.error);}
			resolve(data.result);
		});
	})
}

export function seedHash(blockNumber) {
	return new Promise((resolve, reject) => {
		let payload = {jsonrpc: '2.0',method: 'debug_seedHash',params: [blockNumber],id: 1};
		gethIPC(payload, (error, data) => {
			if(error){reject(error);}
			if(data.error){reject(data.error);}
			resolve(data.result);
		});
	})
}

export function processBlock(blockNumber) {
	return new Promise((resolve, reject) => {
		let payload = {jsonrpc: '2.0',method: 'debug_processBlock',params: [blockNumber],id: 1};
		gethIPC(payload, (error, data) => {
			if(error){reject(error);}
			if(data.error){reject(data.error);}
			resolve(data.result);
		});
	})
}

export function printBlock(blockNumber) {
	return new Promise((resolve, reject) => {
		let payload = {jsonrpc: '2.0',method: 'debug_printBlock',params: [blockNumber],id: 1};
		gethIPC(payload, (error, data) => {
			if(error){reject(error);}
			if(data.error){reject(data.error);}
			resolve(data.result);
		});
	})
}

export function dumpBlock(blockNumber) {
	return new Promise((resolve, reject) => {
		let payload = {jsonrpc: '2.0',method: 'debug_dumpBlock',params: [blockNumber],id: 1};
		gethIPC(payload, (error, data) => {
			if(error){reject(error);}
			if(data.error){reject(data.error);}
			resolve(data.result);
		});
	})
}

export function metrics(raw) {
	return new Promise((resolve, reject) => {
		let payload = {jsonrpc: '2.0',method: 'debug_metrics',params: [raw],id: 1};
		gethIPC(payload, (error, data) => {
			if(error){reject(error);}
			if(data.error){reject(data.error);}
			resolve(data.result);
		});
	})
}

export function getTransactionByHash(txhash) {
	return new Promise((resolve, reject) => {
		let payload = {jsonrpc: '2.0',method: 'eth_getTransactionByHash',params: [txhash],id: 1};
		gethIPC(payload, (error, data) => {
			if(error){reject(error);}
			if(data.error){reject(data.error);}
			resolve(data.result);
		});
	});
}
