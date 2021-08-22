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
    	 	<h2> Generative Lottery FAQ </h2>
        <h4> What is Generative NFT lottery? </h4>
        <p>Generative NFT lottery is an NFT based lottery where each NFT you buy will act as a lottery ticket. Once all 10k NFTs are sold 10 lucky winners will be selected at random & the prize pool is distributed to them automatically.</p>
    	  <h4> How are winners selected? </h4>
        <p>Winners are randomly selected using chainlink&apos;s VRF (Verifiable Random Function).</p>
        <h4> What is generative art? </h4>
        <p>Generative art refers to art that in whole or in part has been created with the use of an computer program.</p>
        <h4> What happens if all 10k NFTs are not sold even after 30 days? </h4>
        <p>If all NFTs are not sold then pooled money is distributed in proportion to the original prize distribution ratio.</p>

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