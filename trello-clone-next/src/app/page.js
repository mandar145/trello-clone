

import Image from "next/image";
import styles from "./page.module.css";
import Board from '../components/Board';
import NavBar from "../components/navbar";


export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
      <NavBar/>
        <Board></Board>
      </main>
    </div>
  );
}
