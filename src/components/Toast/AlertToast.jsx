import clsx from 'clsx';
import styles from './AlertToast.module.css';

export const AlertToast = ({ message, variant = 'success' | 'warning' }) => {
  return (
    <div className={clsx(styles.toast, styles[variant])}>
      <span>
        {variant === 'success' && '🎉'}
        {variant === 'warning' && '🚨'}
      </span>
      <p className={styles.text}>{message}</p>
    </div>
  );
};
