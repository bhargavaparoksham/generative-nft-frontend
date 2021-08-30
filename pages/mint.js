import Layout from "../components/Layout"; // Layout wrapper
import { toast } from "react-toastify"; // Toast notifications
import { useRouter } from "next/router"; // Navigation
import styles from "../styles/pages/Mint.module.scss"; // Styles
import { contractAddress, generativeArtContractABI } from '../utils/abi.js';
import Slider from '@material-ui/core/Slider';
import { Tooltip } from '@material-ui/core';
import state from "../utils/state"; // Global state
import { ethers } from "ethers"; // Ethers
import { useState, useEffect } from "react"; // Local state management


export default function Mint() {

  const {onboard, unlock, provider, address, network, signer} = state.useContainer();
  const [sliderVal, setSliderVal] = useState(1); // All Slider value
  const [maxNFTs, setmaxNFTs] = useState(null); //Total No of NFTs
  const [nftsLeft, setNFTsLeft] = useState(null); // NFTs Left
  const [mintCost, setMintCost] = useState(null); //Mint Cost
  const [totalMintCost, setTotalMintCost] = useState(null); //Total Mint Cost
  const [mintCostFormatted, setMintCostFormatted] = useState(''); //Formatted Mint Cost
  const [totalMintCostFormatted, setTotalMintCostFormatted] = useState(null); //Formatted total Mint Cost
  const [saleStatus, setSaleStatus] = useState(''); // NFT Sale Status
  const [transactionHash, setTransactionHash] = useState(null); // Transaction Hash


  useEffect(async () => {
   if (onboard != null && address == null) {
      await unlock();
   } 
  }, [onboard]);

  useEffect(async () => {
    updateConnection();
  }, [unlock, address]);

  useEffect(async() => {
    setTotalMintCost(sliderVal * mintCost);
    setTotalMintCostFormatted((sliderVal * mintCostFormatted).toFixed(3));
  }, [sliderVal])


  useEffect(async() => {
    if(transactionHash != null) {
      window.alert("Minting is in progress. You can check your transaction status by clicking on 'Transactions'. Once transaction is successful, click on 'My NFTs' to check your minted NFTs. Note that minted NFTs can take upto 10 to 15 mins to reflect in your account.");
    }   
  }, [transactionHash])


  function initiateAlert() {
    window.alert("Minting is in progress. You can check your transaction status by clicking on 'Transactions'. Once transaction is successful, click on 'My NFTs' to check your minted NFTs. Note that minted NFTs can take upto 10 to 15 mins to reflect in your account.");
  }

  async function updateConnection() {
    try {

      const contract = new ethers.Contract(
            contractAddress,
            generativeArtContractABI,
            signer
          );

      //const bal = await provider.getBalance(address);
      //console.log(contract);
      const maxNFTs = await contract.nftMintLimit();
      setmaxNFTs(Math.round(maxNFTs * 1000)/1000);

      const nftsMinted = await contract.nftsMinted();
      const nftsLeft = maxNFTs - nftsMinted;
      setNFTsLeft(nftsLeft);

      const mintCost = await contract.mintPrice();
      const mintCostFormatted = await ethers.utils.formatEther(mintCost);
      setMintCost(mintCost);
      setMintCostFormatted(mintCostFormatted);

      setTotalMintCost(sliderVal * mintCost);
      setTotalMintCostFormatted((sliderVal * mintCostFormatted).toFixed(3));

      const status = await contract.saleIsActive();
      setSaleStatus((status == true ? 'Active' : 'Inactive'));

    } catch (error) {
        console.log(error);
    }
  }

  async function initiateMinting() {
    try {

      const contract = new ethers.Contract(
            contractAddress,
            generativeArtContractABI,
            signer
          );

      const gasPrice = await provider.getGasPrice();
      //console.log('Gas:'+gasPrice);

      const gasEstimate = await contract.estimateGas.mintNFT(sliderVal, {value: (totalMintCost).toFixed(0)});
      //console.log('Gas Estimate:'+estimation);

      const overrides = {
        value: (totalMintCost).toFixed(0),
        gasPrice: gasPrice,
        gasLimit: gasEstimate,
      };
      
      const transaction = await contract.mintNFT(sliderVal, overrides);
      //console.log(transaction);
      //console.log(transaction.hash);
      setTransactionHash(transaction.hash);

    } catch (error) {
      console.log(error);
    }
  }
  
  const options = [
    {
      value: 1,
      label: "1",
    },
    {
      value: 5,
      label: "5",
    },
    {
      value: 10,
      label: "10",
    },
    {
      value: 20,
      label: "20",
    },
  ];

  async function log(){
    console.log(sliderVal);
    console.log(ethBalance);
  }

  return (
    // Wrap page in layout
    <Layout>
      <div className={styles.mint}>
          {/* Create game details */}
          <p className={styles.t}>
          <a target="_blank" href={"https://etherscan.io/address/"+address} rel="noreferrer">
            <span className={styles.t1}>Transactions</span>
          </a>
          <a target="_blank" href={"https://opensea.io/"+address} rel="noreferrer">
            <span className={styles.t2}>My NFTs</span>
          </a>
          </p>
          <h3>Fairy Sparkles</h3>
          <p> Total number of NFTs : <b>{maxNFTs}</b> </p>
          <p> NFTs left : <b>{nftsLeft}</b> </p>
          <p> Minting cost per NFT : <b>{mintCostFormatted} ETH</b> </p>
          <p> Total minting cost : <b>{totalMintCostFormatted} ETH </b> </p>
          <p>
            How many NFTs do you want to buy : <b> {sliderVal} </b>
          </p>
          <div className={styles.options}>
            <Slider
              min={1} max ={20} step = {1}
              valueLabelDisplay="on"
              aria-labelledby="discrete-slider-custom"
              defaultValue={1}
              onChange={(event, val) => setSliderVal(val)}
              marks = {options}
              ValueLabelComponent={ValueLabelComponent}
            />
           </div>
          

          <div className={styles.b1}>
            <button onClick={initiateMinting}>
                Buy NFT
            </button>
          </div>
          {/*
          {transactionHash != null && (
          <span>
            <p> Transaction Hash: {transactionHash} </p>
          </span>
        )}
        */}
    </div>  	

    </Layout>
  );
}

//Value Label

function ValueLabelComponent(props) {
  const { children, open, value } = props;

  return (
    <Tooltip open={open} enterTouchDelay={0} placement="top" title={`${value}`}>
      {children}
    </Tooltip>
  );
}