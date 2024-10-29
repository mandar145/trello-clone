import Image from "next/image";
import styles from "./page.module.css";
import Board from '../components/Board';

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <h1>Trello Clone</h1>
        <Board></Board>
      </main>
    </div>
  );
}
