import React, { useState, useEffect, useContext } from "react";
import Image from "next/image";

//INTERNAL IMPORT
import { ICOContext } from "../context/ERC20ICO";
import Style from "../styles/index.module.css";
import banner from "../assets/home-banner.png";
import FunToken from "../assets/funtoken.png";
import User from "../components/User/User/User";
import Transfer from "../components/User/User/Transfer/Transfer";

const Home = () => {
  const [myAccount, setMyAccount] = useState("");
  const [ammount, setAmmount] = useState(0);
  const {
    ERC20FunToken,
    transferToken,
    checkIfWalletConnected,
    tokenHolderData,
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
  } = useContext(ICOContext);

  useEffect(() => {
    checkIfWalletConnected();
    tokenHolderData();
    ERC20FunToken();
  }, []);

  return (
    <div className={Style.home}>
      <div className={Style.heroSection}>
        <div className={Style.heroSection_left}>
          <h1>Comsats Coin</h1>
          <p>
          The world is becoming increasingly digital, and as a result, traditional modes of payment are quickly becoming outdated. Considering this, the proposed project aims to launch a new cryptocurrency, "COMSATS Coins," for use within the COMSATS Institute of Information Technology (CIIT) campus. The introduction of COMSATS Coins will provide a more convenient and efficient way for students, faculty, and staff to conduct transactions on campus, without the need for physical cash or bank cards
          </p>

          <div className={Style.heroSection_left_btn}>
            <button className={Style.btn}>Whitepaper</button>
            <button className={Style.btn}>product intro</button>
          </div>
        </div>
        <div className={Style.heroSection_right}>
         
         
          
          
        </div>
      </div>
      <Transfer
        NoOfToken={NoOfToken}
        TokenName={TokenName}
        TokenStandard={TokenStandard}
        TokenSymbol={TokenSymbol}
        TokenOwnerBal={TokenOwnerBal}
        transferToken={transferToken}
      />
      <User holderArray={holderArray} />
    </div>
  );
};

export default Home;
