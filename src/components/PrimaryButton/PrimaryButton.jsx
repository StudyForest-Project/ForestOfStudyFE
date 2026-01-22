import styles from './PrimaryButton.module.css';
export const PrimaryButton = ({
  children,
  type = 'button',
  onClick,
  className = '',
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`${styles.button} ${className}`}
    >
      <span className={styles.text}>{children}</span>
    </button>
  );
};
