import react,{ useState, useEffect } from "react";
import Web3Modal from 'web3modal';
import { ethers } from 'ethers';
import axios from "axios";

import { MarketAddress, MarketAddressABI } from "./constant";

export const NFTContext= react.createContext();

export const NFTProvider= ({children})=>{
    const nftCurrency= 'ETH';

    return(
        <NFTContext.Provider value={{nftCurrency}}>
            {children}
        </NFTContext.Provider>
    );

};