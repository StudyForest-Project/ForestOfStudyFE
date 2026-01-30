// import axios from 'axios';
import styles from './RecentStudy.module.css';
import { StudyCard } from './StudyCard.jsx';
// import { study } from '../../src/seed/study.js';

export const RecentStudy = () => {

  return (
    <section className={styles.section}>
      <h2 className={styles.title}>최근 조회한 스터디</h2>
      <div className={styles.grid}>
          <div className={styles.empty}>아직 조회한 스터디가 없어요</div>
      </div>
    </section>
  );
};
