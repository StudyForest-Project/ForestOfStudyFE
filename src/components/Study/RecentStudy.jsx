import styles from './RecentStudy.module.css';
import { study } from '../../seed/study.js';
import { StudyCard } from './StudyCard.jsx';

export const RecentStudy = () => (
  <section className={styles.section}>
    <h2 className={styles.title}>최근 조회한 스터디</h2>
    <div className={styles.grid}>
      {study.items.slice(0, 3).map((item) => (
        <StudyCard key={item.id} item={item} />
      ))}
    </div>
  </section>
);
