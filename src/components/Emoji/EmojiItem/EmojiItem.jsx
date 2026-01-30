import clsx from 'clsx';
import styles from './EmojiItem.module.css';

export const EmojiItem = ({ children, count, className, onClick }) => {
  const isShowCount = typeof count === 'number';

  return (
    <button
      type="button"
      className={clsx(styles.emoji, className)}
      onClick={onClick}
    >
      <span>{children}</span>
      {isShowCount && <span className={styles.count}>{count}</span>}
    </button>
  );
};
