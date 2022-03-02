const ethers = require("ethers")
//是否安装钱包
export function hasEthereum () {
  return typeof window !== 'undefined' && typeof window.ethereum !== 'undefined'
}

//调起钱包授权
export async function requestAccount() {
  await window.ethereum.request({method: 'eth_requestAccounts'})
}

//钱包账户监控
export function useWalletWatch(logOut, userAddress, isLogin) {
  if (!hasEthereum()) return;
  //监控钱包账户
  window.ethereum?.on("accountsChanged", async function (accounts) {
    if (accounts && accounts[0]) {
      console.log(accounts);
      //切换账户
      if(userAddress && userAddress !== accounts[0]){
        //取消登录状态，重新登录
        logOut();
      }
    } else {
      //未登录
      console.log("未登录")
      if(userAddress){
        logOut();
      }
    }
  });
  //监控钱包链
  window.ethereum?.on('chainChanged', (chainId) => {
    console.log(chainId)
    if(chainId !== "0x1"){
      //非主链，重新登录
      if(isLogin){
        logOut();
      }
    }
  });
}

//调起钱包签名
export function signatureLogin(address, message, callback) {
  var from = address;
  var params = [message, from];
  var method = 'personal_sign';
  window.ethereum.sendAsync(
    {
      method,
      params,
      from,
    },
    function (err, result) {
      if (err) return console.dir(err);
      if (result.error) {
        alert(result.error.message);
      }
      if (result.error) return console.error('ERROR', result);
      callback && callback(address, result.result)
    }
  );
}

//获取当前钱包信息（链ID和addresss）
export async function getWalletData() {
  try{
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const chainId = provider.provider.chainId;
    const signer = provider.getSigner()
    const address = await signer.getAddress()
    return {
      chainId,
      address
    };
  }catch(err) {
    console.log(err)
    return {
      chainId: "",
      address: ""
    }
  }
}

//登录并签名授权
export async function web3Login(options) {
  //没有钱包时处理
  if(!hasEthereum()){
    options.onErrorWithEthereum && options.onErrorWithEthereum();
    return;
  }
  try{
    await requestAccount();
    let { address } = await getWalletData();
    if(address){
      let message = await options.getMessage();
      await signatureLogin(address, message, options.onSuccessLogin)
    }
  }catch(err) {
    console.log(err);
  }
}