# Web3 Login
基于小狐狸钱包提供基础通用的web3登录及相关函数
### hasEthereum
```js
  if(hasEthereum()){
    //如果在有钱包的环境
  }
```

### requestAccount
```js
  //调起钱包授权
  await requestAccount();
```

### useWalletWatch
```js
  //钱包状态监控

  //切换账户后的处理
  let logOut = () => {

  }
  let userAddress = ""; //当前登录的钱包地址;（最好响应式处理）
  let isLogin = true; //当前登录状态;（最好响应式处理）
  useWalletWatch(logOut, userAddress, isLogin);
```

### signatureLogin
```js
  //调用钱包签名

  let address = "";
  let message = "";
  //签名成功后的回调函数
  let callback = (address, signature) => {

  }
  await signatureLogin(address, message, callback);
```

### getWalletData
```js
  //获取钱包当前信息(地址和链ID)
  let { address, chainId } = await getWalletData();
```

### web3Login
```js
  //基础签名登录
  web3Login({
    //无钱包环境时回调
    onErrorWithEthereum: ()=> {
      
    },//可选参数
    //异步返回 需要签名的信息
    getMessage: () => {
      return new Promise(() => {
        
      });
    },//必填参数
    //成功签名后回调
    onSuccessLogin: (address, signature) => {

    }, //必填参数
  });
```