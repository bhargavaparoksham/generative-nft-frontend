import axios from "axios"; // Requests
import { useState } from "react"; // State management
import Layout from "../components/Layout"; // Layout wrapper
import { toast } from "react-toastify"; // Toast notifications
import { useRouter } from "next/router"; // Navigation
import styles from "../styles/pages/Mint.module.scss"; // Styles

export default function Mint() {

  return (
    // Wrap page in layout
    <Layout>
    <div className={styles.mint}>
        <div className="sizer">
          {/* Create game details */}
          <h3>Mint NFT</h3>
          <p>
            Please select no of nft you would like to buy?
          </p>
      	</div>
    </div>  	

    </Layout>
  );
}