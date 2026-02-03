import clsx from 'clsx';
import ic_point from '@/assets/icons/ic_point.svg';
import styles from './PointBadge.module.css';

export const PointBadge = ({ totalPoint, label = false, className }) => {
  if (totalPoint == null) return null;

  const badge = (
    <div className={styles.pointBadge}>
      <img src={ic_point} alt="포인트 아이콘" />
      <span className={styles.text}>{totalPoint.toLocaleString()}P 획득</span>
    </div>
  );

  if (!label) {
    return badge;
  }

  return (
    <div className={clsx(styles.container, className)}>
      {/* 상단 설명 텍스트가 필요한 경우에만 표시 */}
      {label && <p className={styles.label}>현재까지 획득한 포인트</p>}
      {badge}
    </div>
  );
};
