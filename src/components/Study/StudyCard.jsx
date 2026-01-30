import styles from './StudyCard.module.css';
import ic_point from '@/assets/icons/ic_point.svg';

export function StudyCard({ item }) {
  const bgValue = item?.backgroundImage || '';
  const isColor = bgValue.startsWith('#');
  const bgStyle = {
    backgroundColor: isColor ? bgValue : '#f5f5f5',
    backgroundImage: !isColor && bgValue ? `url(${bgValue})` : 'none',
  };

  return (
    <div className={styles.studyCard} style={bgStyle}>
      {item?.images?.[0] && <img src={item.images[0]} alt={item?.title} />}
      <div className={styles.info}>
        <div className={styles.header}>
          <p className={styles.title}>
            {item.nickname}의 {item.title}
          </p>
          <span className={styles.points}>
            <img src={ic_point} alt="포인트" className={styles.pointIcon} />
            {item.totalPoint}P 획득
          </span>
        </div>
        <p className={styles.days}>7일째 진행 중</p>
        <p className={styles.description}>{item?.description}</p>
        <div className={styles.emojiContainer}>
          {item?.emojis?.map((emoji, idx) => (
            <div key={idx} className={styles.emoji}>
              {emoji.emoji}
              <span className={styles.count}>{emoji.count}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
