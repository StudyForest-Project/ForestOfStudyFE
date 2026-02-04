import clsx from 'clsx';
import styles from './CurrentTime.module.css';

export const CurrentTime = ({ value, className }) => {
  if (!value) return null;

  const datePart = value.slice(0, 10);

  /* 시간 포맷 */
  const timePart = new Date(value).toLocaleString('ko-KR', {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  });

  return (
    <div className={clsx(styles.currentTime, className)}>
      <span className={styles.label}>현재 시간</span>
      <time className={styles.timeBadge} dateTime={value}>
        {`${datePart} ${timePart}`}
      </time>
    </div>
  );
};
