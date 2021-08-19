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
    	 	<h2> FAQ </h2>
    	</div>
	);
}