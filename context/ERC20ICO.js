import React, { useState, useEffect, useContext } from "react";
import Web3Modal from "web3modal";
import { ethers } from "ethers";

//INTERNAL IMPORT
import {
  funTokenAddress,
  funTokenABI,
} from "./constant";

const fetchFunTokenContract = (signerOrProvider) =>
  new ethers.Contract(funTokenAddress, funTokenABI, signerOrProvider);



export const ICOContext = React.createContext();

export const ERC20ICONProvider = ({ children }) => {
  //----USER ACCOUNT
  const [holderArray, setHolderArray] = useState([]);
  const [account, setAccount] = useState("");
  const [accountBallanc, setAccountBallanc] = useState("");
  const [userId, setUserId] = useState("");

  const [NoOfToken, setNoOfToken] = useState("");
  const [TokenName, setTokenName] = useState("");
  const [TokenStandard, setTokenStandard] = useState("");
  const [TokenSymbol, setTokenSymbol] = useState("");
  const [TokenOwner, setTokenOwner] = useState("");
  const [TokenOwnerBal, setTokenOwnerBal] = useState("");
  const funToken = "ICO Name: COMSATS TOKEN";

  //-----SETTIONEOUT
  const [completed, setCompleted] = useState(false);

  //---------CONNECTING WALLET
   const checkIfWalletConnected=async()=>{
    try {
      if(!window.ethereum) return console.log("Install METAMASK");

      const accounts=await window.ethereum.request({
        method:"eth_accounts"
      })
      setAccount(accounts[0]);
      //create Connection to smart contract and fetch

      const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();
    const contract = fetchFunTokenContract(signer)




    //get all token Holder
const allTokenHolder=await contract.balanceOf(account[0]);
setAccountBallanc(allTokenHolder.toNumber());

const totalHolder=await contract._userId();






 } catch (error) {
      console.log("App is Not connected")
    }
   }
//ERC20
const ERC20FunToken=async()=>{
  try {

    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner(
      "0x470eC8a70c3B92E7F57Fd28332c188AA24F81552"
    );
    const contract = fetchFunTokenContract(signer)

    //Token Supply

    const supply=await contract.totalSupply()
    const totalSupply=supply.toNumber();

    //token Name

    const name=await contract.name();
    setTokenName(name);


    //token symbol
    const symbol=await contract.symbol();
    setTokenSymbol(symbol);

  // token standard

  const standard=await contract.standard();
  setTokenStandard(standard);

  const ownerOfContract = await contract.ownerOfContract();
  setTokenOwner(ownerOfContract);

  const balanceToken = await contract.balanceOf(
    "0x470eC8a70c3B92E7F57Fd28332c188AA24F81552"
  );
  setTokenOwnerBal(balanceToken.toNumber());




  } catch (error) {
    console.log("Error in ERC20")
    
  }
}
const transferToken = async (address, value) => {
  try {
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();
    const contract = fetchFunTokenContract(signer);

    const transfer = await contract.transfer(address, BigInt(value * 1));

    transfer.wait();

    // myLoader();
    window.location.reload();
  } catch (error) {
    console.log("something wrong while transfer token");
  }
};



 const tokenHolderData = async () => {
  try {
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();
    const contract = fetchFunTokenContract(signer);

    const allTokenHolder = await contract.getTokenHolder();
      allTokenHolder.map(async(el)=>{
const singleHolderData=await contract.getTokenHolderData(el);

     holderArray.push(singleHolderData);
     console.log(holderArray);

      })
   
    
  } catch (error) {
    console.log("Worng getting data");
  }
};

  return (
    <ICOContext.Provider
      value={{
        ERC20FunToken,
        transferToken,
        tokenHolderData,
        checkIfWalletConnected,
        funToken,
        NoOfToken,
        TokenName,
        TokenStandard,
        TokenSymbol,
        TokenOwner,
        holderArray,
        account,
        accountBallanc,
        TokenOwnerBal,
        userId,
        completed,
      }}
    >
      {children}
    </ICOContext.Provider>
  );
};
