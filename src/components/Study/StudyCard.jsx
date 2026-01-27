// StudyCards.jsx
import React from 'react';
import styles from './StudyCard.module.css';
import { study } from '../../seed/study.js';

const getBackgroundStyle = (bgImage) => {
  if (typeof bgImage === 'string' && bgImage.startsWith('#')) {
    const isLight = [
      '#F5F5F5',
      '#FFFFFF',
      '#FFE4E1',
      '#E0F7FA',
      '#EAF2E1',
    ].includes(bgImage);
    return {
      backgroundColor: bgImage,
      backgroundImage: 'none',
      '--bg-light': isLight ? 'true' : 'false', // CSS 변수로 전달
    };
  }
  return {
    backgroundImage: `url(${bgImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  };
};

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('ko-KR', {
    month: 'short',
    day: 'numeric',
  });
};

export function StudyCard({ data= study }) {
  return (
    <div className={styles.studyContainer}>
      <div className={styles.studyGrid}>
        {data.items.map((item) => (
          <div
            key={item.id}
            className={styles.studyCard}
            style={getBackgroundStyle(item.backgroundImage)}
          >
            <div className={styles.cardHeader}>
              <h3 className={styles.title}>{item.title}</h3>
              <span className={styles.nickname}>{item.nickname}</span>
            </div>

            <p className={styles.description}>{item.description}</p>

            <div className={styles.points}>
              <span className={styles.totalPoint}>
                {item.totalPoint.toLocaleString()}
              </span>
              <span className={styles.pointLabel}>P 획득</span>
            </div>

            <div className={styles.emojis}>
              {item.emojis.map((e, idx) => (
                <span key={idx} className={styles.emojiItem}>
                  {e.emoji}
                  <span className={styles.emojiCount}>{e.count}</span>
                </span>
              ))}
            </div>

            <div className={styles.createdAt}>{formatDate(item.createdAt)}</div>
          </div>
        ))}
      </div>

      {data.pageInfo?.nextCursor && (
        <button className={styles.loadMore}>더보기</button>
      )}
    </div>
  );
}
