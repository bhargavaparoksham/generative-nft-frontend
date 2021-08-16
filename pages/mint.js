import Layout from "../components/Layout"; // Layout wrapper
import { toast } from "react-toastify"; // Toast notifications
import { useRouter } from "next/router"; // Navigation
import styles from "../styles/pages/Mint.module.scss"; // Styles
import { generativeArtContractABI } from '../utils/abi.js';
import Slider from '@material-ui/core/Slider';
import { Tooltip } from '@material-ui/core';
import state from "../utils/state"; // Global state
import { ethers } from "ethers"; // Ethers
import { useState, useEffect } from "react"; // Local state management


export default function Mint() {

  const {onboard, unlock, provider, address, network} = state.useContainer();
  const [sliderVal, setSliderVal] = useState(1); // All Slider value
  const [ethBalance, setEthBalance] = useState(null); //Eth Balance


  useEffect(async () => {
   if (onboard != null && address == null) {
      await unlock();
   } 
  }, [onboard]);

  useEffect(async () => {
    updateConnection();
  }, [address]);



  async function updateConnection() {
    try {
      const bal = await provider.getBalance(address);
      const Balance = await ethers.utils.formatEther(bal);
      setEthBalance(Math.round(Balance * 1000)/1000);

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

          <button onClick={log}>
              Mint NFT
          </button>
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