import react, { useState, useEffect } from "react";
import Web3Modal from 'web3modal';
import { ethers } from 'ethers';
import axios from "axios";
import { create as ipfsHttpClient } from 'ipfs-http-client';
import { MarketAddress, MarketAddressABI } from "./constant";


const client = ipfsHttpClient('https://ipfs.infura.io:5001/api/v0');

const fetchContract = (signerOrProvider) => new ethers.Contract(MarketAddress, MarketAddressABI, signerOrProvider);

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

        };
        
        console.log({accounts});
    };
    
    useEffect(() => {
        checkIfWalletIsConnected();
        createSale('test', '0.025');
    }, []);
    
    // active function that will connect us
    const connectWallet = async() => {
        if (!window.ethereum) return alert('Please install MetaMask 🦊');

        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });

        setCurrentAccount(accounts[0]);
        
        window.location.reload();
    };

    const uploadToIPFS =  async ( file ) =>{
        try {
            const added = await client.add({ content: file});

            const url = `https://ipfs.infura.io/ipfs/${added.path}`;

            return url;

        } catch (error) {
            
            console.log('Error uploading file to ipfs', error);
        }
    };

    const createNFT= async (formInput,fileUrl, router) =>{
        const {name, description, price}= formInput;

        if(!name || !description || !price || !fileUrl) return;

        const data = JSON.stringify ({name, description, image: fileUrl});

        try {
            const added = await client.add(data);
            const url = `https://ipfs.infura.io/ipfs/${added.path}`;

            await createSale(url, price);
            router.push('/')
        } catch (error) {
            console.log('Error uploading file to ipfs', error);
        };
    };

    const createSale = async(url, formInputPrice)=>{
        // connect to the smart contract
        const web3Modal = new Web3Modal();
        const connection = await web3Modal.connect();
        const provider = new ethers.providers.Web3Provider(connection);
        const signer =  provider.getSigner();

        // converting for example 0.025 -> to blockchain readable amount
        const price = ethers.utils.parseUnits(formInputPrice, 'ether');

        const contract =  fetchContract(signer);

        const listingPrice = await contract.getListingPrice();

        const transaction  = await contract.createToken(url, price, { value: listingPrice.toString() });

        await transaction.wait();

    }
    return (
        <NFTContext.Provider value={{ nftCurrency, connectWallet, currentAccount, uploadToIPFS, createNFT }}>
            {children}
        </NFTContext.Provider>
    );

};