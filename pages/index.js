import dayjs from "dayjs"; // Date parsing
import Link from "next/link"; // Dynamic routing
import Layout from "../components/Layout"; // Component: layout
import { toast } from "react-toastify"; // Toast notifications
import Loader from "react-loader-spinner"; // Spinner
import { useEffect, useState, useLayoutEffect } from "react"; // State management
import styles from "../styles/pages/Home.module.scss"; // Page styles
import Image from 'next/image'
import art from "../public/art.gif"; //Homepage Artwork

export default function Home() {

  return (
    // Wrap page in layout
    <Layout>
      {/* Main */}
      <Main />
    </Layout>
  );
}

/**
 * Main
 * @returns {HTMLElement}
 */
function Main() {

  const [deadline, setdeadline] = useState("September, 25, 2021"); // Lottery deadline
  const [days, setdays] = useState(0); // days
  const [hours, sethours] = useState(0); // hours
  const [minutes, setminutes] = useState(0); // minutes
  const [seconds, setseconds] = useState(0); // seconds
  const [screenSize, setScreenSize] = useState(0);

  useEffect(() => {
     getTimeUntil(deadline);
  });

    useEffect(() => {
     setInterval(() => getTimeUntil(deadline), 1000);
  });

  useLayoutEffect(() => {
    function updateScreenSize() {
      setScreenSize(window.innerWidth);
    }
    window.addEventListener("resize", updateScreenSize);
    updateScreenSize();
    return () => window.removeEventListener("resize", updateScreenSize);
  }, []);

  function getTimeUntil(deadline) {
    const time = Date.parse(deadline) - Date.parse(new Date());
    if (time < 0) {
      setdays(0);
      sethours(0);
      setminutes(0);
      setseconds(0);
    } else {
      const seconds = Math.floor((time / 1000) % 60);
      const minutes = Math.floor((time / 1000 / 60) % 60);
      const hours = Math.floor((time / (1000 * 60 * 60)) % 24);
      const days = Math.floor(time / (1000 * 60 * 60 * 24));
      setdays(days);
      sethours(hours);
      setminutes(minutes);
      setseconds(seconds);
    }
  }

  return screenSize > 600 ? (
    <div>
    <div className={styles.main}>
      <div className={styles.main_art}>
        <Image src={art} alt="NFT Art" height="500" width="500" />
       </div>
       <div className={styles.main_content}>
        <h1>Generative NFT Lottery</h1>

        <h4>Mint super cool generative art NFT and get a chance to win 100 ETH !!!</h4>
         
         <p>Each NFT you buy will act as a lottery ticket. Once all 10k NFTs are sold 10 lucky winners will be selected at random & the prize pool is distributed to them automatically by the smart contract.</p>
          <div>
            <p><b>Winner 1 : 100 ETH (300k USD)</b></p>
            <p><b>Winner 2 : 10 ETH (30k USD) </b></p>
            <p><b>Winners 3 to 10 : 5 ETH (15k USD) each</b></p>
          </div> 
          <div className={styles.main_buttons}>
            <Link href="/mint">
              <button>
                Mint Now
              </button>
            </Link> 
            <Link href="/faq">
              <button>
                Know More
              </button>
            </Link>  
        </div>  
       </div>
     </div>
     <div className={styles.footer}>
       <a target="_blank" href="https://twitter.com/nftlotteryapp" rel="noreferrer">
         <span className={styles.f1}>Twitter</span>  
        </a>
       <a target="_blank" href="https://etherscan.io/address/0x241d6c1aa3355b2dd58148f8068fce2cedd6bd1b" rel="noreferrer">
         <span className={styles.f2}>Contract : 0x241d6</span>  
         </a>
         <a target="_blank" href="https://twitter.com/aparoksham" rel="noreferrer">
         <span className={styles.f3}>Built By: Eagle</span>
         </a>
         <span className={styles.f4}>Lottery Ends In : {days} d {hours} h {minutes} m {seconds} s</span>
       
     </div>
     </div>
  ) :

  //Screen sizes with width less than 600

    (
    <div>
    <div>
    <div className={styles.main}>
      <div className={styles.main_content1}>
        <h1>Generative NFT Lottery</h1>
      </div>
      <div className={styles.main_art}>
        <Image src={art} alt="NFT Art" height="500" width="500" />
       </div>
       <div className={styles.main_content2}>  
        <h4>Mint super cool generative art NFT and get a chance to win 100 ETH !!!</h4>         
         <p>Each NFT you buy will act as a lottery ticket. Once all 10k NFTs are sold 10 lucky winners will be selected at random & the prize pool is distributed to them automatically by the smart contract.</p>
          <div>
            <p><b>Winner 1 : 100 ETH (300k USD)</b></p>
            <p><b>Winner 2 : 10 ETH (30k USD) </b></p>
            <p><b>Winners 3 to 10 : 5 ETH (15k USD) each</b></p>
          </div> 
          <div className={styles.main_buttons}>
            <Link href="/mint">
              <button>
                Mint Now
              </button>
            </Link> 
            <Link href="/faq">
              <button>
                Know More
              </button>
            </Link>  
        </div>  
       </div>
       </div>
     </div>
     <div className={styles.footer}>
       <a target="_blank" href="https://twitter.com/nftlotteryapp" rel="noreferrer">
         <span className={styles.f1}>Twitter</span>  
        </a>
         <a target="_blank" href="https://etherscan.io/address/0x241d6c1aa3355b2dd58148f8068fce2cedd6bd1b" rel="noreferrer">
         <span className={styles.f3}>Contract: 0x241d6</span>
         </a>
     </div>
     </div>
  );
}