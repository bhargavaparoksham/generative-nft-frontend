import dayjs from "dayjs"; // Date parsing
import axios from "axios"; // Requests
import Link from "next/link"; // Dynamic routing
import ReactTable from "react-table-6"; // Table
import Layout from "../components/Layout"; // Component: layout
import { toast } from "react-toastify"; // Toast notifications
import Loader from "react-loader-spinner"; // Spinner
import { useEffect, useState } from "react"; // State management
import styles from "../styles/pages/Home.module.scss"; // Page styles
import Image from 'next/image'
import art from "../public/art.png"; //Homepage Artwork

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

  return (
    <div className={styles.home__main}>
      <div className="sizer">
        <h3>Generative Art</h3>
        <div className="main_art">
        <Image src={art} alt="NFT Art" height="400" width="400" />
        </div>

        {/* Auth button */}
        <div>
        <Link href="/mint">
          <button>
              Mint
          </button>
        </Link>
        </div>
      </div>
    </div>
  );
}