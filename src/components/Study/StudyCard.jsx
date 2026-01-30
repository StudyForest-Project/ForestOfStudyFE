import styles from './StudyCard.module.css';
import ic_point from '../../assets/icons/ic_point.svg';
import { useNavigate } from 'react-router';

export const StudyCard = ({ item }) => {
  const nav = useNavigate();
  const backgroundImage = item.backgroundImage;
  const bgStyle = {
    background: backgroundImage.startsWith('#')
      ? backgroundImage
      : `url(${backgroundImage})`,
  };

  const getDays = (createdAt) =>
    `${Math.floor((new Date() - new Date(createdAt)) / (1000 * 60 * 60 * 24))}일째 진행 중`;

  const handleCardClick = () => {
    nav(`/study/${item.id}`);
  };

  return (
    <div className={styles.studyCard} style={bgStyle} onClick={handleCardClick}>
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
        <p className={styles.days}>{getDays(item?.createdAt)}</p>
        <p className={styles.description}>{item?.description}</p>
        <div className={styles.emojiContainer}>
          {item?.emojis?.slice(0, 3).map((emoji, count) => (
            <div key={count} className={styles.emoji}>
              {emoji.emoji}
              <span className={styles.count}>{emoji.count}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
