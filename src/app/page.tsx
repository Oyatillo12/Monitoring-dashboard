import { SpiritsList } from "@/widgets/spirits-list/ui/SpiritsList";
import styles from "./page.module.scss";

export default function Home() {
  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <h1 className={styles.title}>Spirit Monitoring Dashboard</h1>
        <p className={styles.subtitle}>
          Monitor and capture spirits in real-time
        </p>
      </header>
      <main className={styles.main}>
        <SpiritsList />
      </main>
    </div>
  );
}
