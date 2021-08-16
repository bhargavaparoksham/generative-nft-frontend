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
  const [ethBalance, setEthBalance] = useState(null); //Eth Balance
  const [contractName, setContractName] = useState(null); // Contract Name
  const [mintValue, setMintValue] = useState(null); //Mint value
  const [mintCost, setMintCost] = useState(null); //Mint Cost
  const [mintCostFormatted, setMintCostFormatted] = useState(''); //Mint Cost
  const [mintValueFormatted, setMintValueFormatted] = useState(null); //Mint Cost
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
    setMintCost(sliderVal * mintValue);
    setMintCostFormatted((sliderVal * mintValueFormatted).toFixed(3));
  }, [sliderVal])



  async function updateConnection() {
    try {
      const ethBalance = await provider.getBalance(address);
      const ethBalanceFormatted = await ethers.utils.formatEther(ethBalance);
      setEthBalance(Math.round(ethBalanceFormatted * 1000)/1000);

      const contract = new ethers.Contract(
            contractAddress,
            generativeArtContractABI,
            signer
          );

      //console.log(contract);
      const contractName = await contract.name();
      setContractName(contractName);

      const mintValue = await contract.mintPrice();
      const mintValueFormatted = await ethers.utils.formatEther(mintValue);
      setMintValue(mintValue);
      setMintValueFormatted(mintValueFormatted);

      setMintCost(sliderVal * mintValue);
      setMintCostFormatted((sliderVal * mintValueFormatted).toFixed(3));

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

      const overrides = {
        value: (mintCost).toFixed(0),
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
        <div className="sizer">
          {/* Create game details */}
          <h3>Mint Generative NFTs</h3>
          <p> ETH balance: {ethBalance} </p>
          <p> Contract Name: {contractName} </p>
          <p> Sale Status: {saleStatus} </p>
          <p> Total Mint Cost: {mintCostFormatted} ETH </p>
          <p>
            Please select no of nft you would like to buy?
          </p>
          <div className="options">
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

          <button onClick={initiateMinting}>
              Mint NFT
          </button>

          {transactionHash != null && (
          <span>
            <p> Transaction Hash: {transactionHash} </p>
          </span>
        )}

      	</div>
    </div>  	

    </Layout>
  );
}


function ValueLabelComponent(props) {
  const { children, open, value } = props;

  return (
    <Tooltip open={open} enterTouchDelay={0} placement="top" title={`${value}`}>
      {children}
    </Tooltip>
  );
}