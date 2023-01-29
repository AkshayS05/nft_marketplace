import react, { useState, useEffect } from "react";
import Web3Modal from 'web3modal';
import { ethers } from 'ethers';
import axios from "axios";

import { MarketAddress, MarketAddressABI } from "./constant";

export const NFTContext = react.createContext();

export const NFTProvider = ({ children }) => {

    const [currentAccount, setCurrentAccount] = useState('');

    const nftCurrency = 'ETH';

    // check if we are connected
    const checkIfWalletIsConnected = async () => {
        if (!window.ethereum) return alert('Please install MetaMask 🦊');
        
        const accounts = await window.ethereum.request({ method: 'eth_accounts' });
        
        if(accounts.length){
            setCurrentAccount(accounts[0]);
        }else{
            console.log('No accounts found');
        }
        
        console.log(accounts);
    };
    
    useEffect(() => {
        checkIfWalletIsConnected();
    }, []);
    
    // active function that will connect us
    const connectWallet= async()=> {
        if (!window.ethereum) return alert('Please install MetaMask 🦊');
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });

        setCurrentAccount(accounts[0]);
        window.location.reload();
    }

    return (
        <NFTContext.Provider value={{ nftCurrency, connectWallet, currentAccount }}>
            {children}
        </NFTContext.Provider>
    );

};