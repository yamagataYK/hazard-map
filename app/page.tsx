import Image from "next/image";
import styles from "./page.module.css";
import Map from "../components/Map";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <p className={styles.title}>
        自身が発生しました
      </p>
      <p className={styles.subtitle}>危険区域について</p>
      <Link href="/map">
        <button type="button" className={styles.Btn}>見る</button>
      </Link>
    </>
  );
}

