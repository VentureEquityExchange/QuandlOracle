const config = {
  mongoURL: process.env.MONGO_URL || 'mongodb://localhost:27017/mern-starter',
  port: process.env.PORT || 8000,
  ContractFolder : (__dirname+'/contracts'),
  EthPass : 'test', // in production you should save this password somewheres else;
  quandlToken : "mQqjXhZaCM9Wbs7zJBcP"
};

export default config;
