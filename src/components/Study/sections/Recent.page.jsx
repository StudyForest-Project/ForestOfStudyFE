import { RECENT_KEY, StudyCard } from '../StudyCard';
import styles from './StudyPage.module.css';

export const RecentPage = () => {
  const recentData = JSON.parse(localStorage.getItem(RECENT_KEY) || '[]');
  console.log(recentData);

  return (
    <section className={styles.container}>
      <h1 className={styles.title}>최근 조회한 스터디</h1>

      {recentData.length === 0 && <p className={styles.empty}>아직 조회한 스터디가 없어요</p>}

      {recentData.length !== 0 && (
        <div className={styles.recentList}>
          {recentData.map((item) => (
            <StudyCard key={item.id} item={item} />
          ))}
        </div>
      )}
    </section>
  );
};
