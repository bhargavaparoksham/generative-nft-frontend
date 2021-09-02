import Layout from "../components/Layout"; // Layout wrapper
import { useRouter } from "next/router"; // Navigation
import styles from "../styles/pages/Faq.module.scss"; // Page styles
import Link from "next/link"; // Dynamic routing
import { useEffect, useState } from "react"; // State management
import Image from 'next/image';


export default function Faq() {

  return (
    // Wrap page in layout
    <Layout>
    	{/* main */}
      <FaqMain />
    </Layout>
  );
}


function FaqMain(){
	return(
		<div className={styles.faq_main}>
    	 	<h2> Fairy Sparkles FAQ </h2>
        <h4>What are Fairy Sparkles?</h4>
        <p>
        Fairy Sparkles is a collection of 10,000 rare generative artworks that you can mint on the ethereum blockchain as an NFT. Legend has it that each fairy sparkles NFT purchased is believed to become your lucky charm and also give you a chance to win 100 ETH. The more fairy sparkles you own the luckier you get!
        </p>
    	  <h4>How can I win 100 ETH?</h4>
        <p>
        Fairy Sparkles has a custom built NFT smart contract where part of the money pooled from the NFT sale (i.e 150 ETH) is given back to 10 lucky fairy sparkles owners as a giveaway. Note that winners are randomly selected using Chainlink VRF & giveaway is done on chain by the smart contract itself once all the 10k NFTs are sold. The giveaway will be as below, <br/>
        <br/>
        Winner 1 : 100 ETH (300k USD)<br/>
        Winner 2 : 10 ETH (30k USD)<br/>
        Winners 3 to 10 : 5 ETH (15K USD) each.
        </p>
        <h4> What is generative art & why should I mint one? </h4>
        <p>
        Generative art refers to any beautiful art that has been created with the use of a computer program. Generative art NFTs has picked up a lot of momentum recently with the success of NFT projects like <u><a href="https://opensea.io/collection/art-blocks">Art blocks</a></u> where generative art works have been sold from anywhere between 0.5 ETH to 1000 ETH!
        </p>
        <h4>What is an NFT?</h4>
        <p>An NFT stands for &ldquo;Non-fungible token&rdquo; which is a unique, one of a kind digital item like an artwork or a digital collectible that users can buy, own, and trade on the ethereum blockchain. </p>
        <h4>Terms & Conditions</h4>
        <p>
        Fairy Sparkles is a collection of digital artworks (NFTs) running on the Ethereum network. This website is only an interface allowing participants to buy the digital artworks. Users are entirely responsible for the safety and management of their own private Ethereum wallets and validating all transactions and contracts generated by this website before approval. Furthermore, as the Fairy Sparkles smart contract runs on the Ethereum network, there is no ability to undo, reverse, or restore any transactions.
        <br/>
        <br/>
        This website and its connected services are provided &ldquo;as is&rdquo; and &ldquo;as available&rdquo; without warranty of any kind. By using this website you are accepting sole responsibility for any and all transactions involving Fairy Sparkles artworks.
        </p>

        <div className={styles.faq_footer}>
        <Link href="/mint">
              <button>
                Mint Now
              </button>
            </Link> 
        </div>

      </div>
	);
}