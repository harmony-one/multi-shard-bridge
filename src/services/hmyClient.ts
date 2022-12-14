import Web3 from 'web3';

export const getHmyBalance = address => {
  const web3URL = window.web3
    ? window.web3.currentProvider
    : process.env.HMY_NODE_URL;

  const hmyWeb3 = new Web3(web3URL);
  return hmyWeb3.eth.getBalance(address);
};
