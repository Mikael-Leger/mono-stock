import Image from "next/image";
import styles from "./page.module.css";
import Product from "./components/product/product";

export default function Home() {
  return (
    <main className={styles.main}>
      <Product />
    </main>
  );
}
