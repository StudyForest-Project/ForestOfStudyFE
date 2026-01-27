import { useState } from 'react';
import styles from './BrowseStudy.module.css';
import { study } from '../../seed/study.js';
import { StudyCard } from './StudyCard.jsx';

export const BrowseStudy = () => {
  const [count, setCount] = useState(6);
  const items = study.items.slice(0, count);
  const hasMore = count < study.items.length;

  return (
    <section className={styles.section}>
      <h2 className={styles.title}>스터디 둘러보기</h2>
      <div className={styles.searchToggle}>
        <p>검색창</p>
        <p>토글</p>
      </div>
      <div className={styles.grid}>
        {items.map((item) => (
          <StudyCard key={item.id} item={item} />
        ))}
      </div>
      {hasMore && (
        <button
          className={styles.moreBtn}
          onClick={() => setCount((c) => c + 3)}
        >
          더보기
        </button>
      )}
    </section>
  );
};
