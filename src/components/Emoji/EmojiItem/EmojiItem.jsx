import clsx from 'clsx';
import styles from './EmojiItem.module.css';

export const EmojiItem = ({ emoji, count, children, className, onClick }) => {
  return (
    <div className={clsx(styles.emoji, className)} onClick={onClick}>
      {children ? children : emoji}
      {count !== undefined && <span className={styles.count}>{count}</span>}
    </div>
  );
};
