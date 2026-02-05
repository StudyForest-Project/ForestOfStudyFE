import styles from './StudyCard.module.css';
import ic_point from '../../assets/icons/ic_point.svg';
import { useNavigate } from 'react-router';

const TITLE_COLORS = ['#578246', '#C18E1B'];

export const RECENT_KEY = 'recentStudies';
const MAX = 3;

export const StudyCard = ({ item }) => {
  const navigate = useNavigate();

  const backgroundImage = item.backgroundImage;
  const MS_PER_DAY = 1000 * 60 * 60 * 24;
  const isColorBg = backgroundImage.startsWith('#');

  const titleColor = isColorBg
    ? TITLE_COLORS[
        [...item.id].reduce((sum, char) => sum + char.charCodeAt(0), 0) %
          TITLE_COLORS.length
      ]
    : undefined;

  const bgStyle = isColorBg
    ? { background: backgroundImage }
    : {
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(${backgroundImage})`,
      };

  const getDays = (createdAt) =>
    `${Math.floor((new Date() - new Date(createdAt)) / MS_PER_DAY)}일째 진행 중`;

  const handleCardClick = () => {
    // const stored = JSON.parse(localStorage.getItem(RECENT_KEY) || '[]');
    // const filtered = stored.filter((s) => s.id !== item.id);

    // const recentItem = [
    //   {
    //     id: item.id,
    //     nickname: item.nickname,
    //     title: item.title,
    //     totalPoint: item.totalPoint,
    //     createdAt: item.createdAt,
    //     description: item.description,
    //     emojis: item.emojis,
    //     backgroundImage: item.backgroundImage,
    //   },
    //   ...filtered,
    // ].slice(0, MAX);

    // localStorage.setItem(RECENT_KEY, JSON.stringify(recentItem));

    // 새 코드 (ID만 저장 - {"ids": [...]} 형식)
    const stored = JSON.parse(localStorage.getItem(RECENT_KEY) || '{"ids": []}');
    const filteredIds = (stored.ids || []).filter((id) => id !== item.id);
    const recentIds = { ids: [item.id, ...filteredIds].slice(0, MAX) };
    localStorage.setItem(RECENT_KEY, JSON.stringify(recentIds));
    navigate(`/studies/${item.id}`);
  };

  return (
    <div
      className={`${styles.studyCard} ${!backgroundImage.startsWith('#') ? styles.hasImage : ''}`}
      style={bgStyle}
      onClick={handleCardClick}
    >
      {item?.images?.[0] && <img src={item.images[0]} alt={item?.title} />}
      <div className={styles.info}>
        <div className={styles.header}>
          <p className={styles.title}>
            <span style={titleColor ? { color: titleColor } : undefined}>
              {item.nickname}
            </span>
            의 {item.title}
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
