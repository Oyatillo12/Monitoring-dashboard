import { Spirit } from "@/entities/spirit/model/types";
import styles from "./SpiritCard.module.scss";

interface SpiritCardProps {
  spirit: Spirit;
  children?: React.ReactNode;
}

export function SpiritCard({ spirit, children }: SpiritCardProps) {
  const threatLevelClass = `threatLevel_${spirit.threatLevel.toLowerCase()}`;

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <h3 className={styles.name}>{spirit.name}</h3>
        <span className={`${styles.threatLevel} ${styles[threatLevelClass]}`}>
          {spirit.threatLevel}
        </span>
      </div>
      <div className={styles.content}>
        <div className={styles.location}>
          <span className={styles.label}>Location:</span>
          <span className={styles.value}>{spirit.location}</span>
        </div>
        <div className={styles.status}>
          <span className={styles.label}>Status:</span>
          <span className={`${styles.statusBadge} ${styles[`status_${spirit.status.toLowerCase()}`]}`}>
            {spirit.status}
          </span>
        </div>
      </div>
      {children && <div className={styles.actions}>{children}</div>}
    </div>
  );
}

